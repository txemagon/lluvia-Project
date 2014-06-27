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

/**
 * @method cat
 * @static
 * Reads a file or a bunch of files.
 *
 * ### Example
 *
 *     Filereader.read("/home/john/file.js")
 *     Filereader.read(["~/a.js", "~john/b.js"])
 *     
 * @param  {String | Array} files Name of the files to be read. (Absolute or relative)
 * @return {String}       Files contentents concatenated
 */
FileReader.cat = function(files) {

}

module.exports = FileReader
