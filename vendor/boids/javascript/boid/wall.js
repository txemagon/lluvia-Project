Wall.prototype = new Boid
Wall.prototype.constructor = Wall

function Wall(){
	this.width = 1000
	this.height = 400
	Boid.call(this, this.configuration())
	this.colour = "cyan"
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