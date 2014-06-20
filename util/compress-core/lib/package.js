var FileReader = require('./../lib/file_reader.js')
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
    this.is_load$U = false 

   
}

Package.prototype.list_package = []

/**
*/
Package.prototype.add_list_package = function(package){
    var unique = true

    if(this.list_package.length == 0)
        this.list_package.push(package)

    for(var i=0; i<this.list_package.length; i++)
        if(this.list_package[i].full_name() == package.full_name())
            unique = false

    if(unique)
        this.list_package.push(package)
}

/**
*/
Package.prototype.is_in$U = function(package) {
    for(var i=0; i<this.list_package.length; i++){
        if(this.list_package[i].package == package)
            return true
    }
    return false
}

/**
*/
Package.prototype.get_path = function(package) {
    for(var i=0; i<this.list_package.length; i++){
        if(this.list_package[i].package == package)
            return this.filepath + this._path + package
    }
}

/**
*/
Package.prototype.full_name = function(subpath) {
    subpath = subpath || ""
    return (this.filepath + this.path + subpath + "/package.json").replace(/\/+/g, "/")
}

Object.defineProperty(Package.prototype, "full_name", {
    value: Package.prototype.full_name,
    enumerable: false
})

/**
*/
Package.prototype.catalog = function(){
    var dependencies = ["provides", "offers", "requires"]

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

        this.add_list_package(this)

        for(var i=0; i<dependencies.length; i++)
            if(object_file[dependencies[i]]){
                for(var a=0; a<object_file[dependencies[i]].length; a++){
                    var new_pk = new Package(this.filepath, this.path + this[dependencies[i]][a])
                    new_pk.catalog()
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

