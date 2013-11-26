/**
 * @class JavascriptSource
 *
 * Reads a Javascript Source code f.ile as text
 * 
 * @param {String} file_name Full url of the source file
 */
function JavascriptSource (file_name) {
	
	this.file_name = file_name
	this.source = JavascriptSource.read(file_name)
	this.lines = this.source.split("\n")
	JavascriptSource.read_files[file_name] = this
}

/**
 * Fetch one line of code as it was typed
 * 
 * @param  {Number} line_number in the source file
 * @return {String}             The text in that line.
 */
JavascriptSource.prototype.line = function(line_number){ 
	return this.lines[line_number-1]
}

/**
 * Get the Array of lines starting at a particular line number.
 * 
 * @param  {Number} start Starting line
 * @param  {Number} end   Ending line
 * @return {Array}        The source code starting at _line_number_
 */
JavascriptSource.prototype.lines_from = function(start, end){
	start = start || 0
	end   = end   || this.lines.length
	return this.lines.slice(start, end)
}

/**
 * Get all the lines, as text, starting at a particular line number.
 * @param  {Number} line_number Starting line
 * @param  {Number} end_line    Ending line
 * @return {String}       The source code starting at _line_number_
 */
JavascriptSource.prototype.code_from = function(line_number, end_line){
	return this.lines_from.apply(this, arguments).join("\n")
}

/**
 * Already read files.
 * @property {Object} Hash with already read files.
 * @static
 */
JavascriptSource.read_files = {}

/**
 * AJAX reading of a file
 * @param  {String} file_name 
 * @return {String}           Text of given file
 */
JavascriptSource.read = function(file_name){
	if (JavascriptSource.read_files[file_name])
		return JavascriptSource.read_files[file_name]

	var request = new XMLHttpRequest();
	request.open("GET", file_name, false);
	try{
	   request.send(null);
	} catch (err){
		throw "NetError. Imposible to reach file " + file_name
	}
	var returnValue = request.responseText;

	return returnValue;
}