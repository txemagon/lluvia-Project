Player.prototype = new Boid
Player.prototype.constructor = Player

function Player(){
	Character.apply(this, arguments)
}