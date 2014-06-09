/**
 * @class Line
 *
 * Define method for lines and curves
 *
 * @property {Number} Permissible error in the calculations with Line
 *
 * @constructor Line
 *
 */

function Line() {
	this.ERROR = 0.00001
}

/**
* @method distance
* @static
*
* Calculate the distance between two lines or one line and point
*
* @param {Object} line1 First line for calculations
* @param {Object | Object} StraightLine || Vector shape2 Second param for calculations
*
* @return {Number} d Distance between lines or one line and point
*
* ###Example
*    |
*/
Line.distance = function(line1, shape2){
	// Si es un vector creo una linea paralela a la primera para hacer los calculos(lo hice asi por compatibilidad con lo anterior, prometo mejorarlo!!)
	if(shape2 instanceof Vector)
		shape2 = new StraightLine(shape2, new Vector( shape2.get_coord(0) + (1*(line1.director.get_coord(0))), shape2.get_coord(1) + (1*(line1.director.get_coord(1)))))

	var d = 0
	if(!Line.intersects$U(line1, shape2)){
		//if(shape2 instanceof Vector)
		//	shape2 = new StraightLine(shape2, 0,0)
		// Al ser paralelas la distancia entre rectas se convierte a una distancia entre un punto y una recta.
		//                         __   _     _
		//dist(P,r) = Area/Base = |RP x d| / |d|
		var RP = new Vector(line1.get_initial_point().get_coord(0) - shape2.get_initial_point().get_coord(0), line1.get_initial_point().get_coord(1) - shape2.get_initial_point().get_coord(1), 0)
		var d = new Vector(line1.get_initial_point().get_coord(0) - line1.get_final_point().get_coord(0), line1.get_initial_point().get_coord(1) - line1.get_final_point().get_coord(1), 0)
		var RP_module = RP.cross(d).module()
		var d_module = d.module()
		d = RP_module / d_module
	}
	return d
}

/**
* @method get_intersection
* @static
*
* Calculate the cut point two line
*
* @param {Object} line1 First line for calculations
* @param {Object} line2 Second line for calculations
*
* @return {Object} vector Cut point
* 
* ###Example
*    |
*/
Line.get_intersection = function(line1, line2){
	/* __     __   __       __    
	 * r0 + λ*vr = s0 + ß * vs
	 * 
	 * ... un porron de calculos despues ...
	 * 
	 * ß = (r1 - s1) + vr1*(s0-r0) / vs1 - vr1*(vs0/vr0)
	 *                      __       __
	 * punto_interseccion = s0 + ß * vs
	 */
	if(Line.intersects$U(line1, line2)){
		var r0 = line1.initial_point.get_coord(0)
		var r1 = line1.initial_point.get_coord(1)
		var vr0 = line1.director.get_coord(0)
		var vr1 = line1.director.get_coord(1)

		var s0 = line2.initial_point.get_coord(0)
		var s1 = line2.initial_point.get_coord(1)
		var vs0 = line2.director.get_coord(0)
		var vs1 = line2.director.get_coord(1)

		var ß = ((r1 - s1) + (vr1*(s0-r0))) / (vs1 - (vr1*(vs0/vr0)))

		var intersection = line2.initial_point.add(line2.director.scale(ß))
		alert(intersection.toSource())
		return intersection
	}

	// var x1 = line1.get_initial_point().get_coord(0) - 0.0001
	// var y1 = line1.get_initial_point().get_coord(1)
	// var x2 = line1.get_final_point().get_coord(0)
	// var y2 = line1.get_final_point().get_coord(1)
	
	// var A1 = (y2-y1)/(x2-x1)
	// var B1 =  line1.get_initial_point().get_coord(1) - (A1*line1.get_initial_point().get_coord(0))

	// var A2 = (line2.get_final_point().get_coord(1)-line2.get_initial_point().get_coord(1))/(line2.get_final_point().get_coord(0)-line2.get_initial_point().get_coord(0))
	// var B2 =  line2.get_initial_point().get_coord(1) - (A2*line2.get_initial_point().get_coord(0))


	// var Xc = (B2-B1)/(A1-A2)
	// var Yc = (A1*Xc) + B1

	// return new Vector(Xc, Yc)

}


/**
* @method intersects$U
* @static
*
* Check if two lines intersect
*
* @param {Object} line1 First line for calculations
* @param {Object} line2 Second line for calculations
*
* @return {Boolean}
*
* ###Example
*    |
*/
Line.intersects$U = function(line1, line2){
    if(line1.director.get_coord(0) / line1.director.get_coord(1) == line2.director.get_coord(0) / line2.director.get_coord(1))
        return false // Son paralelas    
    return true
}

/**
* @method intersects_segment$U
* @static
*
* Check if two segment intersect
*
* @param {Object} line1 First line for calculations
* @param {Object} line2 Second line for calculations
*
* @return {Boolean}
*
* ###Example
*    |
*/
Line.intersects_segment$U = function(line1, line2){
	var x1 = line1.get_initial_point().get_coord(0) 
	var y1 = line1.get_initial_point().get_coord(1)
	var x2 = line1.get_final_point().get_coord(0)
	var y2 = line1.get_final_point().get_coord(1)
	var x3 = line2.get_initial_point().get_coord(0)
	var y3 = line2.get_initial_point().get_coord(1)
	var x4 = line2.get_final_point().get_coord(0)
	var y4 = line2.get_final_point().get_coord(1)

    var s1_x = x2-x1
    var s1_y = y2-y1
    var s2_x = x4-x3
    var s2_y = y4-y3
 
    var s = (-s1_y*(x1-x3)+s1_x*(y1-y3))/(-s2_x*s1_y+s1_x*s2_y)
    var t = (s2_x*(y1-y3)-s2_y*(x1-x3))/(-s2_x*s1_y+s1_x*s2_y)

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1){
        var X = x1+(t*s1_x)
        var Y = y1+(t*s1_y)
        //alert(X+","+Y)
        return new Vector(X, Y)
    }
    return false

	// var x_s1_max = 0
	// var x_s1_min = 0
	// var x_s2_max = 0
	// var x_s2_min = 0
 
	// var y_s1_max = 0
	// var y_s1_min = 0
	// var y_s2_max = 0
	// var y_s2_min = 0

	// if(line1.get_initial_point().get_coord(0) > line1.get_final_point().get_coord(0)){
	// 	x_s1_max = line1.get_initial_point().get_coord(0)
	// 	x_s1_min = line1.get_final_point().get_coord(0)
	// }
	// else{
	// 	x_s1_min = line1.get_initial_point().get_coord(0)
	// 	x_s1_max = line1.get_final_point().get_coord(0)
	// }


	// if(line1.get_initial_point().get_coord(1) > line1.get_final_point().get_coord(1)){
	// 	y_s1_max = line1.get_initial_point().get_coord(1)
	// 	y_s1_min = line1.get_final_point().get_coord(1)
	// }
	// else{
	// 	y_s1_min = line1.get_initial_point().get_coord(1)
	// 	y_s1_max = line1.get_final_point().get_coord(1)
	// }

	// if(line2.get_initial_point().get_coord(0) > line2.get_final_point().get_coord(0)){
	// 	x_s2_max = line2.get_initial_point().get_coord(0)
	// 	x_s2_min = line2.get_final_point().get_coord(0)
	// }
	// else{
	// 	x_s2_min = line2.get_initial_point().get_coord(0)
	// 	x_s2_max = line2.get_final_point().get_coord(0)
	// }

	// if(line2.get_initial_point().get_coord(1) > line2.get_final_point().get_coord(1)){
	// 	y_s2_max = line2.get_initial_point().get_coord(1)
	// 	y_s2_min = line2.get_final_point().get_coord(1)
	// }
	// else{
	// 	y_s2_min = line2.get_initial_point().get_coord(1)
	// 	y_s2_max = line2.get_final_point().get_coord(1)
	// }

	// if(x_s1_max < x_s2_min)
	// 	return false
	// else if(x_s1_min > x_s2_max)
	// 	return false
	// else if(y_s1_max < y_s2_min)
	// 	return false
	// else if(y_s1_min > y_s2_max)
	// 	return false

	// return true
}

/**
* @method slope line
* @static
*
* Internal functions. Calculate the slope line
*
* @param {Object} line Line for calculations
*
* @return {Number} m The slope line
*
* ###Example
*    |
*/
function slope_line(line){
	var m = (line.get_final_point().get_coord(1) - line.initial_point.get_coord(1)) / (line.get_final_point().get_coord(0) - line.initial_point.get_coord(0))
	return m
}

/**
 *
 * @method get_initial_point
 * @virtual
 *
 * Gets the initial coordinates of the defined vector
 *
 * @param  {}
 *
 * @return {String} Returns an exception for this virtual function
 */
Line.prototype.get_initial_point = function() {
	throw "virtual function invocation: Please define get_initial_point():Vector"
}

/**
 *
 * @method get_final_point
 * @virtual
 *
 * Gets the final coordinates of the defined vector
 *
 * @param  {}
 *
 * @return {String} Returns an exception for this virtual function
 */
Line.prototype.get_final_point = function() {
	throw "virtual function invocation: Please define get_final_point():Vector"
}


/**
 *
 * @method at
 * @virtual
 *
 * Gets the coordinates of the defined vector at a given point represented by lambda
 *
 * @param  {}
 *
 * @return {String} Returns an exception for this virtual function
 */
Line.prototype.at = function() {
	throw "virtual function invocation: Please define at(lambda:Number):Vector"
}

/**
 *
 * @method get_arc_length
 * @virtual
 *
 * Calculates the length of an arc
 *
 * @param  {}
 *
 * @return {String} Returns an exception for this virtual function
 */
Line.prototype.get_arc_length = function() {
	//Note: lambda = lambda || 1
	throw "virtual function invocation: Please define get_arc_length([lambda:Number=1]):Number"
}

/**
 *
 * @method get_tangent
 * @virtual
 *
 * Calculates the coordinates of the tangent to the straight line according to lambda
 *
 * @param  {}
 *
 * @return {String} Returns an exception for this virtual function
 */
Line.prototype.get_tangent = function() {
	throw "virtual function invocation: Please define get_tangent(lambda:Number):Vector"
}

/**
 *
 * @method get_normal
 * @virtual
 *
 * Calculates the coordinates of the normal vector to the straight line according to lambda.
 *
 * @param  {}
 *
 * @return {String} Returns an exception for this virtual function
 */
Line.prototype.get_normal = function() {
	throw "virtual function invocation: Please define get_normal(lambda:Number):Vector"
}

/**
 *
 * @method get_perpendicular
 * @virtual
 *
 * Calculates the coordinates of the perpendicular vector to the straight line according to lambda.
 *
 * @param  {}
 *
 * @return {String} Returns an exception for this virtual function
 */
Line.prototype.get_perpendicular = function() {
	throw "virtual function invocation: Please define get_perpendicular([point:Vector | iterator:Number]):StraightLine"
}

/**
 *
 * @method belongs_to
 * @virtual
 *
 * Description
 *
 * @param  {}
 *
 * @return {String} Returns an exception for this virtual function
 */
Line.prototype.belongs_to = function() {
	throw "virtual function invocation: Please define belongs_to(point:Vector):Boolean"
}

/*
Line.prototype.intersects$U = function() {
	throw "virtual function invocation: Please define intersects(line:Line):Boolean"
}

Line.prototype.get_intersection = function() {
	throw "virtual function invocation: Please define get_intersection(line:Line):Vector"
}
*/
