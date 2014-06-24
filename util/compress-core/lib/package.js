var FileReader = require('./../lib/file_reader.js')
var Path = require('path')
/**
 * @class Package
 * 
 * 
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
    this.dependencies = ["provides", "offers", "requires"]
}

/**
*/
Package.list = []

Object.defineProperty(Package.prototype, "list_package", {
    value: Package.prototype.list_package,
    enumerable: false
})

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
    var actual_package = actual_package || Package.list[0]

    if(actual_package.package == name_package)
        return true
    else
        for(var i=0; i<this.dependencies.length; i++)
            if(actual_package[this.dependencies[i]])
                for(var a=0; a<actual_package[this.dependencies[i]].length; a++)
                    if(actual_package[this.dependencies[i]][a].is_in$U(name_package, actual_package[this.dependencies[i]][a]))
                        return actual_package[this.dependencies[i]][a]
}


/**
*/
Package.prototype.is_in$U = function(name_package, actual_package) {
    var actual_package = actual_package || Package.list[0]

    if(actual_package.package == name_package)
        return true
    else
        for(var i=0; i<this.dependencies.length; i++)
            if(actual_package[this.dependencies[i]])
                for(var a=0; a<actual_package[this.dependencies[i]].length; a++)
                    if(actual_package[this.dependencies[i]][a].is_in$U(name_package, actual_package[this.dependencies[i]][a]))
                        return true

    return false
}

/**
*/
Package.prototype.type_dependency = function(name_package) {
    for(var i=0; i<Package.list.length; i++){
        if(Package.list[i].package.package == name_package)
            return Package.list[i].dependency
    }
}

Object.defineProperty(Package.prototype, "is_in$U", {
    value: Package.prototype.is_in$U,
    enumerable: false
})

/**
*/
Package.prototype.get_path = function(name_package) {
    var actual_pk = this.find_package(name_package)
    
    //return Path.resolve(actual_pk.filepath, name_package)    
    return Path.join(actual_pk.filepath, actual_pk.path, name_package)
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


Package.prototype.list_path = []

Package.prototype.is_path$U = function(path){
    for(var i=0; i<this.list_path.length; i++)
        if(this.list_path[i] == path)
            return true
        return false
}

/**
*/
Package.prototype.catalog = function(dependency){
    var dependencies = ["provides", "offers", "requires"]
    var actual_dependency = dependency || ""
    this.save_first_package(this)

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
                    if(!this.is_path$U(Path.join(this.filepath, this.path, this[dependencies[i]][a]))){
                        this.list_path.push(Path.join(this.filepath, this.path, this[dependencies[i]][a]))    
                        var new_pk = new Package(this.filepath, this.path + this[dependencies[i]][a])
                        new_pk.catalog(dependencies[i])
                        this[dependencies[i]][a] = new_pk
                    }
                }
            }
    
    }catch(e) {
        console.dir("Warning: package.json was not found in " + this.full_name("/" + object_file.provides[i]) )
    }
    
    this.list_path = []
}

Object.defineProperty(Package.prototype, "catalog", {
    value: Package.prototype.catalog,
    enumerable: false
})

/**
*/
Package.prototype.through = function(block, already){
    var that = this
    var dependencies = ["requires", "this", "provides", "offers"]
    var already_there = already || []
    
    var actual_package = block
    
    function is_already_there$U(path){
        for(var i=0; i<already_there.length; i++)
            if(already_there[i] == path)
                return true
            return false
    }

    for(var i=0; i<dependencies.length; i++){
        if(dependencies[i] == "this"){
            console.dir("------------------------ INICIO ---------------------")
            for(var e=0; e<dependencies.length; e++)
                if(dependencies[e] != "this"){
                    //console.dir(this[dependencies[e]])
                    console.dir(this[dependencies[e]])
                    //if(is_already_there$U(Path.join(this.filepath, this.path, this[dependencies[i]][e])))
                    //    already_there.push(Path.join(this.filepath, this.path, this[dependencies[i]][e]))

                }

            console.dir("------------------------ FIN ---------------------")
        }
        else if(actual_package[dependencies[i]])
            for(var e=0; e<actual_package[dependencies[i]].length; e++){
                //console.dir(actual_package[dependencies[i]][e])
            }
    }
}


/**
*/
Package.prototype.get_files = function(){
    var text = ""

    var actual_package = Package.list[0]

        for(var i=0; i<this.dependencies.length; i++)
            if(actual_package[this.dependencies[i]])
                for(var a=0; a<actual_package[this.dependencies[i]].length; a++)
                    for(var e=0; e<actual_package[this.dependencies[i]][a].files.length; e++)
                        text += Path.join(actual_package[this.dependencies[i]][a].filepath, actual_package[this.dependencies[i]][a].path, actual_package[this.dependencies[i]][a].files[e].name) + "\n"
    
    return text
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

