/**
 * @class FileReader
 * Reads Files. Class methods are devised for local filesystems.
 */

/**
 * @method constructor
 * Creates a FileReader over a file in the filesystem.
 * Filereaders objects are pointing to files (mainly in a foreign server). Loading 
 * is deferred due to latency issues.
 *  
 * @param {String} path Path to the file.
 */
function FileReader(path){

    this.path = path
    this.text = ""
}

FileReader.fs = require('fs')

/**
 * @method read
 * Performs the read operation actually.
 *
 * @param {Boolean} force Forces rereading.
 */
FileReader.prototype.read = function(force) {
    if (!force && this.text != "")
        return this.text

    this.text = FileReader.fs.readFileSync(this.path, 'utf8')
    return this.text
}

//TODO: que tambien acepte string

/**
 * @method cat
 * @static
 * Reads a file or a bunch of files.
 *
 * ### Example
 *
 *     Filereader.cat("/home/john/file.js")
 *     Filereader.cat(["~/a.js", "~john/b.js"])
 *     
 * @param  {String | Array} files Name of the files to be read. (Absolute or relative)
 * @return {String}  text Files contentents concatenated
 */
FileReader.cat = function(files) {
    var text = ""

    for(var i=0; i<files.length; i++){
    	try{
            text += FileReader.fs.readFileSync(files[i], 'utf8')
            text += "\n"
        }
        catch(e){console.dir("Warning:  no such file " + files[i])}
    }
    
    return text
}

/**
 * @method create_file
 * @static
 * create a file.
 *
 * ### Example
 *
 *     var verse = "Con diez cañones por banda..."
 *     Filereader.create_file("espronceda.txt", verse)
 *     
 * @param  {String} name Name of the file.
 * @return {String} text File content.
 */
FileReader.create_file = function(name, text){
    FileReader.fs.writeFileSync(name, text)
}

module.exports = FileReader
