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
    this.path = path || "/"
}

Package.prototype.list_package = []

/**
*/
Package.prototype.full_name = function(subpath) {
    subpath = subpath || ""
    return this.filepath + this.path + subpath + "/package.json"
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
        this.list_package.push(object_file)       

        for(var i=0; i<dependencies.length; i++)
            if(object_file[dependencies[i]])
                for(var a=0; a<object_file[dependencies[i]].length; a++){
                    var new_pk = new Package(this.filepath, this.path + "/" + object_file[dependencies[i]][a])
                    new_pk.catalog()
                }      

    }catch(e) {
        //console.dir("Warning: package.json was not found in " + this.full_name("/" + object_file.provides[i]) )
        console.dir(e)
    }
}

Package.prototype.inspect = function() {
    var text = ""
    
    for(var i=0; i<this.list_package.length; i++){
        text += JSON.stringify(this.list_package[i]) + ' \n '
    }

    return text
};

module.exports = Package
