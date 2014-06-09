
StraightLine.prototype = new Line
StraightLine.prototype.constructor = StraightLine

function StraightLine(initial_point, final_point){
	Line.call(this,initial_point)
	this.final_point = final_point
}

StraightLine.prototype.get_initial_point =function(){

	throw "virtual function invocation: StraightLine#get_initial_point"

	return this.initial_point //vector
}

StraightLine.prototype.get_final_point =function(){

	throw "virtual function invocation: StraightLine#get_final_point"

	return this.final_point //vector
}

StraightLine.prototype.at =function(lambda){

	throw "virtual function invocation: StraightLine#at"

	var point = new Vector()
	
	point = this.initial_point + lambda * this.director_vector

	return point //vector
}

StraightLine.prototype.get_arc_length =function(lambda){

	throw "virtual function invocation: StraightLine#get_arc_lenght"

	if(!lambda)
		lambda = 1

	var arc_lenght = lambda * this.director_vector.module()	

	return arc_lenght //number
}

StraightLine.prototype.get_tangent = function(lamdda){

	throw "virtual function invocation: StraightLine#get_tangent"

	return this.director_vector.unit() //vector
}

StraightLine.prototype.get_normal = function(lambda){

	throw "virtual function invocation: StraightLine#get_normal"

	var normal = new Vector()

	normal = ((-1 * this.initial_point.Coord[1]), this.get_final_point().Coord[0])

	return  normal //vector
}

StraightLine.prototype.get_perpendicular =function(point, iterator){	

	throw "virtual function invocation: StraightLine#get_perpendicular"

	var perpendicular = new StraightLine()

	if(iterator){
		var point = this.at(iterator)
	}
		
	perpendicular.Coord[0] = point.Coord[0]
	perpendicular.Coord[1] = point.Coord[1] 

	perpendicular.vector_director[0] = point.get_normal[0]
	perpendicular.vector_director[1] = point.get_normal[1]

	return perpendicular //StraightLine
}

StraightLine.prototype.belongs_to$U =function(point){

	throw "virtual function invocation: StraightLine#belongs_to$U"

	var belongs_to_line = new Boolean()
	
	if ((this.distance(point,this.director_vector) * this.distance(point,this.director_vector)) < this.ERROR)
		 belongs_to_line = true
	else
		belongs_to_line = false

	return belongs_to_line //boolean
}

StraightLine.prototype.intersects$U = function(line) { 
    return Line.intersects$U(this, line)
}

StraightLine.prototype.get_intersection = function(line) { 
    return Line.get_intersection(this, line)
}
