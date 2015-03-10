Player.prototype = new Boid
Player.prototype.constructor = Player

function Player(config){
	Boid.apply(this, arguments)
	var that = this

	this.life = 10
	this.damage = game.points.damage
	this.resistance = game.points.resistance
	this.speed = game.points.speed
	this.img = "..images/ships/player/player_sprite1.png"

	if (planet.enemy.data[4].life == 0)
		this.img = "..images/ships/player/player_sprite2.png"

	if (planet.enemy.data[9].life == 0)
		this.img = "..images/ships/player/player_sprite3.png"

	if (planet.enemy.data[13].life == 0)
		this.img = "..images/ships/player/player_sprite4.png"

	if (planet.enemy.data[18].life == 0)
		this.img = "..images/ships/player/player_sprite5.png"
}

Player.prototype.draw = function(ctx) {
	alert("soy player")
}

