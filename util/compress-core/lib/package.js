var FileReader = require('./../lib/file_reader.js')
var Path = require('path')

/**
 * @class Package
 *
 * Description
 * 
 * ###Example
 *    |
 *
 * @param {String} filepath [description]
 * @param {String} path [description]
 *
 * @return {} [description] 
 */
function Package(filepath, path) {

    Object.defineProperty(this, "filepath", {
         value: filepath,
         enumerable: false
    })

    this._path

    Object.defineProperty(this, "path", {
        get: function(){ return this._path },
        set: function(path){
            this._path = path 
            if (this._path[this._path.length - 1] != "/")
                this._path += "/"
            this._path = this._path.replace(/\/+/g, "/")
        }
    })

    this.path = path  
}

/**
 * 
 */
Package.list = []

/**
*/
Package.prototype.catalog = function(already){
    var dependencies = ["provides", "offers", "requires"]
    this.save_first_package(this)
    var already_there = already || []

    function is_already_there$U(path){
    for(var i=0; i<already_there.length; i++)
        if(already_there[i] == path)
            return true
        return false
    }

    try{

        Object.defineProperty(this, "new_file", {
            value: new FileReader(this.full_name()),
            enumerable: false
        })

        var object_file = JSON.parse(this.new_file.read())

        for(var i in object_file)
            if (i != "path")
                this[i] = object_file[i]
            else{
                if (this._path[0] != "/")
                    this.path = this.path +  object_file[i]
                else
                    this.path = object_file[i]
            }

        for(var i=0; i<dependencies.length; i++)
            if(object_file[dependencies[i]]){
                for(var a=0; a<object_file[dependencies[i]].length; a++){
                    if(!is_already_there$U(Path.join(this.filepath, this.path, this[dependencies[i]][a]))){
                        already_there.push(Path.join(this.filepath, this.path, this[dependencies[i]][a]))    
                        var new_pk = new Package(this.filepath, this.path + this[dependencies[i]][a])
                        new_pk.catalog(already_there)
                        this[dependencies[i]][a] = new_pk
                    }
                }
            }
    
    }catch(e) {
        console.dir("Warning: package.json was not found in " + this.full_name("/" + object_file.provides[i]) )
    }
}

Object.defineProperty(Package.prototype, "catalog", {
    value: Package.prototype.catalog,
    enumerable: false
})

/**
*/
Package.prototype.through = function(block, config){ 
    var config = config || {}
    config.last_package = config.last_package || this
    config.prune = config.prune || []
    config.already_there = config.already_there || []

    var dependencies = ["requires", "this", "provides", "offers"]
    var actual_package = config.last_package
    //var prune = config.prune
    //var already_there = config.already_there

    function prune_dependencies(array_prune){
        for(var i=0; i<dependencies.length; i++){
            for(var a=0; a<array_prune.length; a++){
                if(dependencies[i] == array_prune[a]){
                    dependencies.splice(i, 1)
                }
            }
        }    
    }

    function is_already_there$U(path){
        for(var i=0; i<config.already_there.length; i++)
            if(config.already_there[i] == path)
                return true
            return false
    }

    prune_dependencies(config.prune)

    for(var i=0; i<dependencies.length; i++){
        if(dependencies[i] == "this"){
            if(!is_already_there$U(this.full_name())){
                config.already_there.push(this.full_name())
                this.through(block, {last_package: this, prune: config.prune, already_there: config.already_there})
                block(this)
            }
        }
        else if(actual_package[dependencies[i]]){
            for(var a=0; a<actual_package[dependencies[i]].length; a++){
                if(!is_already_there$U(actual_package[dependencies[i]][a].full_name())){
                    config.already_there.push(actual_package[dependencies[i]][a].full_name())
                    actual_package[dependencies[i]][a].through(block, {last_package: actual_package[dependencies[i]][a], prune: config.prune, already_there: config.already_there})
                    block(actual_package[dependencies[i]][a])
                }
            }
        }
    }
}

/**
*/
Package.prototype.save_first_package = function(package){
    if(Package.list.length == 0){
        Package.list.push(package)
    }
}

Object.defineProperty(Package.prototype, "add_list_package", {
    value: Package.prototype.add_list_package,
    enumerable: false
})

/**
*/
Package.prototype.find_package = function(name_package){
    var result_pk

    this.through(function(pk){
            if(pk.package == name_package)
                result_pk = pk
        })

    return result_pk
}


/**
*/
Package.prototype.is_in$U = function(name_package) {
    var exist = false

    this.through(function(pk){
            if(pk.package == name_package)
                exist = true
        })

    return exist
}

Object.defineProperty(Package.prototype, "is_in$U", {
    value: Package.prototype.is_in$U,
    enumerable: false
})

/**
*/
Package.prototype.get_path = function(name_package) {
    var name_package = name_package || this.package
    var path = ""

    this.through(function(pk){
            if(pk.package == name_package)
                path = pk.full_name()
        })

    return path
}

Object.defineProperty(Package.prototype, "get_path", {
    value: Package.prototype.get_path,
    enumerable: false
})

/**
*/
Package.prototype.full_name = function(subpath) {
    subpath = subpath || ""
    return Path.join(this.filepath, this.path, subpath, "package.json")
}

Object.defineProperty(Package.prototype, "full_name", {
    value: Package.prototype.full_name,
    enumerable: false
})


/**
*/
Package.prototype.get_files = function(){
    var files = []

    for(var i=0; i<this.files.length; i++)
        files.push(Path.join(this.filepath, this.path, this.files[i].name))

    return files
}

/**
*/
Package.get_files = function(packages){
    var files = []

    if(packages instanceof Package){
        files = packages.get_files()
    }

    if(packages instanceof Array){
        for(var i in packages){
            var actual_files = packages[i].get_files()
            for(var a in actual_files)
                files.push(actual_files[a])
        }
    }

    return files
}

/**
 */
Package.cat = function(package_catalog){
    var string_package_catalog = ""
        
        for(var i in package_catalog)
            string_package_catalog += package_catalog[i].toString() + "\n"

    return string_package_catalog
}

/**
*/
Package.prototype.inspect = function(level) {
    var text = ""
    var level = level || 1
    var array_packages = []

    function tabulation(level){
        var tab = ""
        for(var i=0; i<level; i++)
            tab += "\t"
        return tab
    }

    text += "\n" + tabulation(level-1) + "   {"

    for(var i in this)
        if(this[i] instanceof Array){
            text +="\n" + tabulation(level) + i + ": [" 
            for(var a=0; a<this[i].length; a++){
                if(this[i][a].name)
                    text += "\n" + tabulation(level+1) + "{\"name\": \"" + this[i][a].name + "\", \"description\": \"" + this[i][a].description + "\"}"
                if(this[i][a] instanceof Package){
                    text += this[i][a].inspect(level+2)
                }
                if(a != this[i].length-1)
                    text += ","
            }
            text += "],"
        }
        else if(this[i] != this._path)
            text += "\n" + tabulation(level) + i + ": " + JSON.stringify(this[i]) + ","
    
        text += "\n" + tabulation(level-1) +" }\n" 

    return text
};

Object.defineProperty(Package.prototype, "inspect", {
    value: Package.prototype.inspect,
    enumerable: false
})

module.exports = Package

