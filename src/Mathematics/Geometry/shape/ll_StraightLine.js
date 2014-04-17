/**
 * @class       StraightLine
 * Define method for straight lines
 */

 StraightLine.prototype = new Line
 StraightLine.prototype.constructor = StraightLine
 StraightLine.super = Line

 function StraightLine(initial_point, final_point) {
 	this.initial_point = initial_point
 	var that = this
 	this.director = new Vector( final_point.subs( new Vector(this.initial_point) ) )

 }

/**
 * 
 * @method get_initial_point
 * @static
 *
 * Gets the initial coordinates of the defined vector
 *
 * @param  {} 
 * 
 * @return {Vector} Returns the initial coordinates of the direction Vector  
 */
 StraightLine.prototype.get_initial_point = function(){

 	return this.initial_point
 }

/**
 * 
 * @method get_final_point
 * @static
 *
 * Gets a new Vector with the final coordinates of the defined vector
 *
 * @param  {} 
 * 
 * @return {Vector} Returns the final coordinates of the direction Vector  
 */
 StraightLine.prototype.get_final_point = function(){

 	return new Vector( this.initial_point.add(this.director) )
 }

/**
 * 
 * @method at
 * @static
 *
 * Gets the coordinates of the defined vector at a given point represented by lambda
 *
 * @param  {Number} lamba Number type double between 0 and 1
 * 
 * @return {Vector} Returns the coordinates calculated according to variable lambda
 */
 StraightLine.prototype.at = function(lambda){

  	return this.initial_point.add( this.director.scale(lambda) )
 }

/**
 * 
 * @method get_tangent
 * @static
 *
 * Calculates the coordinates of the tangent to the straight line according to lambda
 *
 * @param  {Number} lamba [Optional] Number type double between 0 and 1 
 * 
 * @return {Vector} Returns a tangent Vector to the given one
 */
 StraightLine.prototype.get_tangent = function(lambda){

 	return this.director.unit()
 }

/**
 * 
 * @method get_normal
 * @static
 *
 * Calculates the coordinates of the normal Vector of the given one
 *
 * @param  {Number} lamba [Optional] Number type double between 0 and 1 
 * 
 * @return {Vector} Returns the perpendicular Vector of the given one
 */
 StraightLine.prototype.get_normal = function(lambda){

 	var t = this.get_tangent()

 	var x = t.get_coord(0)
 	var y = t.get_coord(1)
 
 	return new Vector(-y, x)

 }