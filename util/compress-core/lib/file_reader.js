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
    var text = ""

    for(var i=0; i<files.length; i++){
    	try{
            text += FileReader.fs.readFileSync(files[i], 'utf8')
        }
        catch(e){console.dir("Warning:  no such file " + files[i])}
    }

    return text
}

FileReader.create_file = function(text){
    FileReader.fs.writeFileSync("packages_lluvia.js", text)
}

/**
*/

//TODO:
// - Que quite los comentarios
// - Que quite las lineas en blanco
// - Que lo junte todo en una linea quitando los saltos de linea??

FileReader.compress = function(text) {
    var compress_text = text
    function erase_comment(text){
        var init = text.indexOf("/*")
        var end = text.indexOf("*/")
        if(init >= end ){
            var com = text.substring(end, end+2)
            text = text.replace(com, "ºº") 
            end = text.indexOf("*/")
            var replace = text.indexOf("ºº")
            com = text.substring(replace, replace+2)
        }
        if(com)
            text = text.replace(com, "*/")
    
        var comment = text.substring(init, end+2)

        compress_text = text.replace(comment, "")
        
        return compress_text 
    }
    
    for(var i=0; i<3000; i++)
        compress_text = erase_comment(compress_text)
    

    return compress_text
}
    // function search_substring(text, substring){
    //     var position_matches = 0
    //     var substring_length = substring.length
        
    //     for(var i=0; i<text.length; i++){
    //         var a = 0
    //         while(text[i + a] == substring[a]){
    //             a++
    //             if(a == substring_length)
    //                 return position_matches = i
    //         }
    //     }

    //     return position_matches
    // }

module.exports = FileReader
