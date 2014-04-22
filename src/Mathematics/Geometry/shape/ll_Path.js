/**
* @Class Path
* 
* @param {Array} lines Array of lines that form the path
*/

Path.prototype = new Array
extend(Path, Line)
Path.prototype.constructor = Path

function Path(lines){
	this.summary = []
	this.total_length = 0
}

/**
 * @method push
 * Adds a new Line to the Path. Updates internal parameters (as length).
 *
 */
Path.prototype.push = function(){
	for (var i=0; i<arguments.length; i++){

	  if (!(arguments[i] instanceof Line))
		  throw "Path Error. Only lines can be pushed to paths. " + arguments[i].toSource()

	  var new_length = arguments[i].get_arc_length()
	  this.total_length += new_length
	  this.summary[this.length] = { 
		  arc_length: new_length,
		  range: {
			  lambda0: this.length ? this.summary[this.length-1].range.lambda1 : 0,
			  lambda1: new_length / this.total_length
		  } 
	  }

	  Array.prototype.push.call(this, arguments[i])
	}
}

/**
 * @method lambda_to_line
 * Given a lambda for the path returns de number of line and the lambda of that line
 */
Path.prototype.lambda_to_line = function(path_lambda){

	if (path_lambda < 0 || path_lambda > 1)
		throw "Invalid lambda: " + path_lambda + ". Must be in [0,1]."

	var locator = {
		line: 0,
	    lambda: 0	
	}

	for (var i=0; i<this.length; i++)
	  if (this.summary[i].range.lambda1 < path_lambda)
		  locator.line = i

	  locator.lambda = ( path_lambda - this.summary[locator[line]].range.lambda0 ) / (this.summary[locator[line]].range.lambda1 - this.summary[locator[line]].range.lambda0)

	return locator
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
Path.prototype.at = function(lambda){
	lambda = lambda || 1
	var local = lambda_to_line(lambda)

	return this[local.line].at(local.lambda)
}


