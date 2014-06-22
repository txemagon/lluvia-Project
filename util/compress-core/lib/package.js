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
}

/**
*/
Package.prototype.list_package = []

Object.defineProperty(Package.prototype, "list_package", {
    value: Package.prototype.list_package,
    enumerable: false
})

/**
*/
Package.prototype.add_list_package = function(package, dependency){
    var unique = true
    var pk = {package: package, dependency: dependency}

    if(this.list_package.length == 0)
        this.list_package.push(pk)

    for(var i=0; i<this.list_package.length; i++){
        if(this.list_package[i].package.full_name() == package.full_name())
            unique = false
    }

    if(unique)
        this.list_package.push(pk)
}

Object.defineProperty(Package.prototype, "add_list_package", {
    value: Package.prototype.add_list_package,
    enumerable: false
})

/**
*/
Package.prototype.is_in$U = function(name_package) {
    for(var i=0; i<this.list_package.length; i++){
        if(this.list_package[i].package.package == name_package)
            return true
    }
    return false
}

/**
*/
Package.prototype.type_dependency = function(name_package) {
    for(var i=0; i<this.list_package.length; i++){
        if(this.list_package[i].package.package == name_package)
            return this.list_package[i].dependency
    }
}

Object.defineProperty(Package.prototype, "is_in$U", {
    value: Package.prototype.is_in$U,
    enumerable: false
})

/**
*/
Package.prototype.get_path = function(package) {
    for(var i=0; i<this.list_package.length; i++){
        if(this.list_package[i].package == package)
            return Path.join(this.filepath, this.path, package)
    }
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
Package.prototype.catalog = function(dependency){
    var dependencies = ["provides", "offers", "requires"]
    var actual_dependency = dependency || ""

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

        this.add_list_package(this, actual_dependency)

        for(var i=0; i<dependencies.length; i++)
            if(object_file[dependencies[i]]){
                for(var a=0; a<object_file[dependencies[i]].length; a++){
                    var new_pk = new Package(this.filepath, this.path + this[dependencies[i]][a])
                    new_pk.catalog(dependencies[i])
                    this[dependencies[i]][a] = new_pk
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
Package.prototype.all_files = function(){
    var text = ""

    for(var i in this.list_package){
        var array_files = this.list_package[i].package.files
        for(var a in array_files)
            text += Path.join(this.list_package[i].package.filepath, this.list_package[i].package.path, array_files[a].name) + "\n"
    }

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

