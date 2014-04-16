function Shape(initial_point, final_point){
	Shape.apply(this, arguments)
}

Line.prototype = new Shape
Line.prototype.constructor=Line
Line.prototype.super = Shape

function Line(){
	
	this.initial_point =[0, 0]
	this.final_point =[1, 1]

}

