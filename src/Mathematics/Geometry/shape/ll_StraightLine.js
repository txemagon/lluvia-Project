/**
 * @class       StraightLine
 * Define method for straight lines
 */

 StraightLine.prototype = new Line
 StraightLine.prototype.constructor = StraightLine
 StraightLine.super = Line

 function StraightLine(initial_point, final_point) {
 	var initial point = initial_point
 	var final_point = final_point
 	var that = this
 	var director = new Vector(0, 0)

 	director = final_point.subs(initial_point)

 }

 StraightLine.prototype.get_initial_point = function(){

 	return initial_point
 }

 StraightLine.prototype.get_final_point = function(){

 	return director
 }

  StraightLine.prototype.at = function(lambda){
  	var selected_point

  	selected_point = initial_point.subs( director.add(lambda) )

 	return selected_point
 }

 StraightLine.prototype.get_tangent = function(lambda){
 	var lambda = lambda || 0.1
 	var tangent = director.unit()

 	return tangent
 }

 StraightLine.prototype.get_normal = function(lambda){
 	var lambda = lambda || 0.1
 	var t = get_tangent()
 	var normal = new Vector(0, 0)

 	return normal
 }