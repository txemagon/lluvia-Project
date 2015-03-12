Player.prototype = new Boid
Player.prototype.constructor = Player

/**
 * keys number
 */
var KEY_ENTER=13;
var KEY_SPACE=32;
var KEY_LEFT=37;
var KEY_RIGHT=39;

var pressing = {}
var lastPress = null

function Player(config){
	Boid.apply(this, arguments)
	var that = this
	this.shape = new Image()
	this.shape.src = "images/ships/player/player_sprite1.png"

	this.life = 10
	this.damage = game.points.damage
	this.resistance = game.points.resistance
	this.speed = game.points.speed
	this.x = 450
	this.y = 460
}

Player.prototype.draw = function(ctx) {

	ctx.drawImage(this.shape, 0, 0, 75, 107, this.x, this.y, 90, 107)
	ctx.font = "20px Arial"
	ctx.fillStyle = "#f00"
	ctx.fillText("Player Life: " + this.life, 5, 20)
	ctx.fillText("Last Press: " + lastPress, 5, 40)
	ctx.fillText("Player Position: " + this.x, 5, 60)

}

function move() {

	//Movimiento
	if (pressing[KEY_RIGHT])
		this.x += 10
	if (pressing[KEY_LEFT])
		this.x -= 10

	if (this.x > canvas_planet.width)
		this.x = 0
	if (this.x < 0)
		this.x = canvas_planet.width
}

document.addEventListener("keydown", function(evt) {
	lastPress = evt.keyCode
	pressing[evt.keyCode] = true
}, false)

document.addEventListener("keyup", function(evt) {
	pressing[evt.keyCode] = false
}, false)


/*
Player.prototype.level_up = function() {
	this.game.switch("running_up")
    this.game.points += 1

	if (planet.enemy.data[4].life == 0){
		alert("You kill the first boss and your ship has been improved")
		this.img = "..images/ships/player/player_sprite2.png"
	}

	if (planet.enemy.data[9].life == 0){
		alert("You kill the second boss and your ship has been improved")
		this.img = "..images/ships/player/player_sprite3.png"
	}

	if (planet.enemy.data[13].life == 0){
		alert("You killed the third boss and your ship has been improved")
		this.img = "..images/ships/player/player_sprite4.png"
	}

	if (planet.enemy.data[18].life == 0){
		alert("You kill the fourth boss and your ship has been improved")
		this.img = "..images/ships/player/player_sprite5.png"	
	}
}
*/