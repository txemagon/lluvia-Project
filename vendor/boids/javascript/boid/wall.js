Wall.prototype = new Boid
Wall.prototype.constructor = Wall

function Wall(){
	this.width = 100000
	this.height = 400000
	Boid.call(this, this.configuration())
	this.colour = "white"
}

Wall.prototype.configuration = function(){
    return{
        geo_data:{
           position: new Vector(0,0),
           velocity: new Vector(0,0),
           acceleration: new Vector(0,0)
        }
   }
}