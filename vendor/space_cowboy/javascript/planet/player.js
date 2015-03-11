Player.prototype = new Boid
Player.prototype.constructor = Player

//Numero de las teclas
var KEY_ENTER=13;
var KEY_SPACE=32;
var KEY_LEFT=37;
var KEY_RIGHT=39;

function Player(config){
	Boid.apply(this, arguments)
	var that = this
	var pressing = []
	var lastPress = null

	this.life = 10
	this.damage = game.points.damage
	this.resistance = game.points.resistance
	this.speed = game.points.speed
	this.img = "..images/ships/player/player_sprite1.png"

/*
	if (planet.enemy.data[4].life == 0)
		this.img = "..images/ships/player/player_sprite2.png"

	if (planet.enemy.data[9].life == 0)
		this.img = "..images/ships/player/player_sprite3.png"

	if (planet.enemy.data[13].life == 0)
		this.img = "..images/ships/player/player_sprite4.png"

	if (planet.enemy.data[18].life == 0)
		this.img = "..images/ships/player/player_sprite5.png"
	*/
}

Player.prototype.draw = function(ctx) {
	ctx.beginPath()
	ctx.arc(500, 550, 20, 0, 2 * Math.PI, false)
	ctx.fillStyle = 'green';
	ctx.fill()

	//Movimiento
	if (pressing[KEY_RIGHT])
		this.x += 10
	if (pressing[KEY_LEFT])
		this.x -= 10

	
}

document.addEventListener("keydown",function(evt) {
		lastPress = evt.keyCode
		pressing[evt.keyCode] = true
	}, false)

	document.addEventListener("keyup",function(evt) {
		pressing[evt.keyCode] = false
	}, false)
