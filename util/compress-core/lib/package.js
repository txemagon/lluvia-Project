var FileReader = require('./../lib/file_reader.js')
/**
 * @class Package
 * Hace cosas mu chulas que no se poner en ingles.
 * 
 */

function Package(filepath, path) {
    this.filepath = filepath
    this.path = path || "/"
}
/**
*/
Package.prototype.full_name = function() {
    return this.filepath + this.path + "/package.json"
}
Object.defineProperty(Package.prototype, "full_name", {
    value: Package.prototype.full_name,
    enumerable: false
})

Package.prototype.catalog = function(){
    try{
        this.new_file = new FileReader(this.full_name())
        this.object_file = JSON.parse(this.new_file.read())
        i = "provides"
        this[i] = object_file[i]

        if(this.object_file.provides)
            for(var i=0; i<this.object_file.provides.length; i++)
                new Package(this.path + this.object_file.provides[i])

    }catch(e){
        console.dir("Warnng: package.json was not found in " + this.path)
    }
}

module.exports = Package
