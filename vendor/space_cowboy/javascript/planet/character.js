Character.prototype = new Boid
Character.prototype.constructor = Character

function Character(){
	Boid.apply(this, arguments)
}