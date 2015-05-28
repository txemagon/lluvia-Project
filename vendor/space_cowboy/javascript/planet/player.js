Player.prototype = new Boid
Player.prototype.constructor = Player

var stars = []

/**
 * @method  Player
 * @param {[type]} config      [description]
 */

function Player(config){
	Boid.apply(this, arguments)
	var that = this

	canvas = document.getElementById("canvas_planet")
    ctx = canvas.getContext("2d")

	this.shape = new Image()
	this.shape.src = "images/ships/player/player_sprite1.png"

	this.life = 10
	this.damage = game.points.damage
	this.resistance = game.points.resistance
	this.speed = game.points.speed
	this.x = 450
	this.y = 460
	this.width = 90
	this.height = 107
	this.shots = []

	var f = document.querySelector("#fps");
}

function random(max){
    return ~~(Math.random()*max)
}



Player.prototype.draw = function(ctx) {
	repaint(ctx)
	//attack()
	Planet.prototype.move()
	paint(ctx)
}

document.addEventListener("keydown", function(evt){
	lastPress = evt.keyCode
	pressing[evt.keyCode] = true
}, false)

document.addEventListener("keyup", function(evt){
	pressing[evt.keyCode] = false
}, false)


Rectangle.prototype.fill = function() {
    ctx.fillRect(this.x, this.y, this.width, this.height)
}

Rectangle.prototype.fill = function(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height)
}





//function that measures fps
var fps = {
	startTime : 0,
	frameNumber : 0,
	getFPS : function(){
		this.frameNumber++;
		var d = new Date().getTime(),
			currentTime = ( d - this.startTime ) / 1000,
			result = Math.floor( ( this.frameNumber / currentTime ) );

		if( currentTime > 1 ){
			this.startTime = new Date().getTime();
			this.frameNumber = 0;
		}
		return result;

	}	
};


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