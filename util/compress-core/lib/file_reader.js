/**
 * @class FileReader
 * Reads Files
 */

/**
 * @method constructor
 * Creates a FileReader over a file in the filesystem.
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
 * Reads a file
 *
 * @param {Boolean} force Forces rereading.
 */
FileReader.prototype.read = function(force) {
    if (!force && this.text != "")
        return this.text

    this.text = FileReader.fs.readFileSync(this.path, 'utf8')
    return this.text
}

module.exports = FileReader
