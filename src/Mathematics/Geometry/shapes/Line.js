/*function Shape(initial_point, final_point){
	Shape.apply(this, arguments)
}

Line.prototype = new Shape
Line.prototype.constructor=Line
Line.prototype.super = Shape

function Line(){
	
	this.initial_point =[0, 0]
	this.final_point =[1, 1]

}*/

function Shape(){
}

Line.prototype = new Shape
Line.prototype.constructor=Line

function Line(){

	Shape.call(this)

	this.ERROR = 0.00001

	this.initial_point = new Vector()
	//this.final_point = new Vector()
	this.direction_vector =new Vector()
	
}

Line.distance =function(line1, line2){

	return 1
}

Line.intersects$U =function(line1, line2){

	return true //boolean
}

Line.get_intersection =function(line1, line2){

	return new Vector(0,0,0) //vector
}

Line.prototype.get_initial_point =function(){

	throw "virtual function invocation: Line#get_initial_point"

	return this.initial_point //vector
}

Line.prototype.get_final_point =function(){

	throw "virtual function invocation: Line#get_final_point"

	//this.initial_point + this.direction_vector
	return this.initial_point.add(this.direction_vector) //vector
}

Line.prototype.at =function(lambda){

	throw "virtual function invocation: Line#at"

	var point = new Vector()
	
	point = this.initial_point + lambda * this.director_vector

	return point //vector
}

Line.prototype.get_arc_length =function(lambda){

	throw "virtual function invocation: Line#get_arc_lenght"

	if(!lambda)
		lambda = 1

	var arc_lenght= lambda * this.director_vector.module()	

	return arc_lenght //number
}

Line.prototype.get_tangent =function(lambda){

	throw "virtual function invocation: Line#get_tangent"
	
	return this.director_vector.unit //vector
}

Line.prototype.get_normal =function(lambda){

	throw "virtual function invocation: Line#get_normal"

	var normal = new Vector()

	normal = ((-1 * this.initial_point.Coord[1]), this.get_final_point().Coord[0])

	return  normal //vector

}

Line.prototype.get_perpendicular =function(point, iterator){
	

	throw "virtual function invocation: Line#get_perpendicular"
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

Line.prototype.belongs_to$U =function(point){

	throw "virtual function invocation: Line#belongs_to$U"

	var belongs_to_line = new Boolean()
	
	if ((this.distance(point,this.director_vector) * this.distance(point,this.director_vector)) < this.ERROR)
		 belongs_to_line = true
	else
		belongs_to_line = false

	return belongs_to_line //boolean
}

Line.prototype.intersects$U =function(line){

	throw "virtual function invocation: Line#intersects$U"

	return true //boolean
}

Line.prototype.get_intersection =function(line){

	throw "virtual function invocation: Line#get_intersection"

	return new Vector(0,0,0) //vector
}

