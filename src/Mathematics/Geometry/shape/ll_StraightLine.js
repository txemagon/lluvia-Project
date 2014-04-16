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
 	this.director = new Vector( final_point.subs( new Vector(initial_point) ) )

 }

 StraightLine.prototype.get_initial_point = function(){

 	return initial_point
 }

 StraightLine.prototype.get_final_point = function(){

 	return new Vector( this.initial_point.add(this.director))
 }

  StraightLine.prototype.at = function(lambda){

  	var x = this.director.get_coord(0) * lambda
  	var y = this.director.get_coord(1) * lambda  	

 	return director(x, y).subs( initial_point )
 }

 StraightLine.prototype.get_tangent = function(lambda){
 	var lambda = lambda || 0.1 

 	return director.unit()
 }

 StraightLine.prototype.get_normal = function(lambda){
 	var lambda = lambda || 0.1
 	var t = this.get_tangent()

 	var x = this.t.get_coord(0)
 	var y = this.t.get_coord(1)
 
 	return director(-y, x)

 }