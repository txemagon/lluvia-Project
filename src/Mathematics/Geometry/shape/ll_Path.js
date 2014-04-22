/**
* @Class Path
* 
* @param {Array} lines Array of lines that form the path
*/

Path.prototype = new Array
extend(Path, Line)
Path.prototype.constructor = Path

function Path(lines){
	this.lines = lines
	this.lengths = []
	this.total_length = 0
	this.count
}

/**
 * @method calculate_line_length
 * @static
 *
 * Calculates the length of each of the lines that form the path
 *
 * @param  {} 
 * 
 * @return {} 
 */
Path.prototype.calculate_line_length = function(){
	for(var i=0; i<this.length; i++){
		this.push(this.lines[i].get_arc_length())
		count++
	}
}

/**
 * @method calculate_path_length
 * @static
 *
 * Calculates the length of the path
 *
 * @param  {} 
 * 
 * @return {}    
 */
Path.prototype.calculate_path_length = function(){
	for(var i=0; i<this.length; i++)
		this.total_length += this.lengths[i]
}

/**
 * @method calculate_path_lambda
 * @static
 *
 *  Calculates the general lambda of the path and how it is divided
 *
 * @param  {} 
 * 
 * @return {}    
 */
Path.prototype.calculate_path_lambda = function(){
	 
}

/**
 * @method at
 * @static
 *
 *  Calculates the point of the path defined by lamba
 *
 * @param  {} 
 * 
 * @return {}    
 */
Path.prototype.at = function(){
	
}


