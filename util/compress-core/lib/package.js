var FileReader = require('./../lib/file_reader.js')
/**
 * @class Package
 * Hace cosas mu chulas que no se poner en ingles.
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
        //console.dir(e)
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

    text += "\n" + tabulation(level-1) + " {"

    for(var i in this)
        if(this[i] instanceof Array){
            text +="\n" + tabulation(level) + i + ": [" 
            for(var a=0; a<this[i].length; a++){
                if(this[i][a].name){
                    text += "\n" + tabulation(level+1) + "{\"name\": \"" + this[i][a].name + "\", \"description\": " + this[i][a].description + "}"
                }
                else
                    text += "\"" + this[i][a].package + "\""
                if(this[i][a] instanceof Package)
                    array_packages.push(this[i][a])
                if(a != this[i].length-1)
                    text += ","
            }
            text += "]"
        }
        else if(this[i] != this._path)
            text += "\n" + tabulation(level) + i + ": " + JSON.stringify(this[i])
    
    text += "\n" + tabulation(level-1) +" } \n"

    for(var i=0; i<array_packages.length; i++)
        text += array_packages[i].inspect(level+1)

    return text
};

Object.defineProperty(Package.prototype, "inspect", {
    value: Package.prototype.inspect,
    enumerable: false
})

module.exports = Package

