Player.prototype = new Boid
Player.prototype.constructor = Player

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
	var shots 
	this.shots = []
}

function move() {
	//moving
	
	if (pressing[KEY_RIGHT])
		this.x += this.speed + 1
	if (pressing[KEY_LEFT])
		this.x -= this.speed + 1

	//do not leave the canvas
	if (this.x > canvas.width - this.width) 
		this.x = canvas.width - this.width
	if (this.x < 0)
		this.x = 0

	//create the shots
	if (lastPress == KEY_SPACE) {
		shots.push(new Rectangle (this.x + 38, this.y + 10, 5, 10))
		lastPress = null

	}

	//moving the shots
	for (var i=0, l=shots.length; i<l; i++) {
		shots[i].y -= 5 //shots speed  
		if (shots[i].y < 0) {
			shots.splice(i--, 1)
			l--
		}

	}

}

function paint(ctx) {
	//draw player
    ctx.drawImage(this.shape, 0, 0, 75, 107, this.x, this.y, this.width, this.height)
	//draw life, key and position
	ctx.font = "20px Arial"
	ctx.fillStyle = "#f00"
	ctx.fillText("Player Life: " + this.life, 5, 20)
	ctx.fillText("Last Press: " + lastPress, 5, 40)
	ctx.fillText("Player Position: " + this.x, 5, 60)
    ctx.fillText("Disparos: " + shots.length, 5, 80);

	//draw shots
	ctx.fillStyle="#f00";
	 for (var i=0, l=shots.length; i<l; i++) {
    	shots[i].fill(ctx);
    }
}

Player.prototype.draw = function(ctx) {
	repaint(ctx)
	attack()
	move()
	paint(ctx)
	
}

document.addEventListener("keydown", function(evt){
	lastPress = evt.keyCode;
	pressing[evt.keyCode] = true;
}, false);

document.addEventListener("keyup", function(evt){
	pressing[evt.keyCode] = false;
}, false);

//paint shots
function Rectangle(x,y,width,height) {
	this.x = (x == null)?0:x;
	this.y = (y == null)?0:y;
	this.width = (width == null)?0:width;
	this.height = (height == null)?this.width:height;
}

Rectangle.prototype.fill = function() {
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

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