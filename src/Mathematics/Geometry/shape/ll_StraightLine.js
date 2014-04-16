/**
 * @class       StraightLine
 * Define method for straight lines
 */

 StraightLine.prototype = new Line
 StraightLine.prototype.constructor = StraightLine
 StraightLine.super = Line

 function StraightLine(initial_point, final_point) {
 	this.initial point = initial_point
 	var that = this
 	this.director = new Vector( final_point.subs( new Vector(this.initial_point) ) )

 }

 StraightLine.prototype.get_initial_point = function(){

 	return this.initial_point
 }

 StraightLine.prototype.get_final_point = function(){

 	return new Vector( this.initial_point.add(this.director) )
 }

 StraightLine.prototype.at = function(lambda){

  	return intial_point.add( this.director.scale(lamda) )
 }

 StraightLine.prototype.get_tangent = function(lambda){

 	return this.director.unit()
 }

 StraightLine.prototype.get_normal = function(lambda){

 	var t = this.get_tangent()

 	var x = t.get_coord(0)
 	var y = t.get_coord(1)
 
 	return new Vector(-y, x)

 }