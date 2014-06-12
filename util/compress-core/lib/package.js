var FileReader = require('./../lib/file_reader.js')
/**
 * @class Package
 * Hace cosas mu chulas que no se poner en ingles.
 * 
 */

function Package(path) {
    this.path = path
    this.catalog()
}


Package.prototype.catalog = function(){
    this.new_file = new FileReader(this.path)
    this.object_file = JSON.parse(this.new_file.read())
    console.dir(this.object_file)

    if(this.object_file.provides)
        for(var i=0; i<this.object_file.provides.length; i++){
    	    this.new_path = this.path.split("package.json").join("")
            new Package(this.new_path + this.object_file.provides[i] + "/package.json")
        }
}

module.exports = Package
