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
        console.dir(object_file)
        //i = "provides"
        //this[i] = this.object_file[i]

        if(object_file[ dependencies[0] ])
            for(var i=0; i<object_file.provides.length; i++){
                var testP = new Package(this.filepath, this.path + "/" + object_file.provides[i])

                testP.catalog()        
            }

    }catch(e) {
        console.dir("Warning: package.json was not found in " + this.full_name("/" + object_file.provides[i]) )
        //console.dir(e)
    }
}

Package.prototype.toString = function() {
    var text = ""

    return text
};

module.exports = Package
