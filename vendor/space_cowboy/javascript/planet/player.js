Player.prototype = new Boid
Player.prototype.constructor = Player
Player.prototype.super = Boid

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
    this.lastPress = null
    this.pressing = []
    this.firing = []

	var f = document.querySelector("#fps");
}

function random(max){
    return ~~(Math.random()*max)
}

Player.prototype.draw = function(ctx) {
	repaint(ctx)
	star()
	this.move()
	this.paint(ctx)
    ctx.drawImage(this.shape, 0, 0, 75, 107, this.x, this.y, this.width, this.height)
}


document.addEventListener("keydown", function(evt){
	lastPress = evt.keyCode
	pressing[evt.keyCode] = true
}, false)

document.addEventListener("keyup", function(evt){
	pressing[evt.keyCode] = false
}, false)


/*
 * Move form player
 */

Player.prototype.move = function () {
    //moving the player
    if (pressing[KEY_RIGHT])
        this.x += this.speed + 1
    if (pressing[KEY_LEFT])
        this.x -= this.speed + 1

    //do not leave the canvas
    if (this.x > canvas.width - this.width) 
        this.x = canvas.width - this.width
    if (this.x < 0)
        this.x = 0

    //create shots
    if (pressing[KEY_SHOT]) {
        this.shots.push(new Rectangle_Player(this.x +38, this.y, 5, 5)) //x, y, width, height
        lastPress = null
    }

    //move shots
    for (var i=0, l=this.shots.length; i<l; i++) {
        this.shots[i].y -= 5 //shots speed  
        if (this.shots[i].y < 0) {
            this.shots.splice(i--, 1)
            l--
        }
    }

}


/*
 * paint the things
 */
Player.prototype.paint = function(ctx) {
    //draw stars
    for(i=0, l=stars.length; i<l; i++){
        var c = 255-Math.abs(100-stars[i].timer)
        ctx.fillStyle = 'rgb(' +c+ ',' +c+ ',' +c+ ')'
        ctx.fillRect(stars[i].x,stars[i].y, 1, 1)
    }

    //draw player
    ctx.drawImage(this.shape, 0, 0, 75, 107, this.x, this.y, this.width, this.height)
    
    //draw life, key and position
    ctx.font = "20px Orbitron"
    ctx.fillStyle = "#f00"
    //ctx.fillText("Last Press: " + lastPress, 5, 40)
    //ctx.fillText("Disparos: " + shots.length, 5, 80)
    ctx.fillText("Player Life: " + this.life, 5, 20)
    ctx.fillText("Player Position: " + this.x, 5, 40)
    ctx.fillText("Estrellas: " + stars.length, 5, 60)
    
    ctx.fillText("FPS: " + fps.getFPS(), 5, 100)

    //draw shots
    ctx.fillStyle="#f00"
     for (var i=0, l=this.shots.length; i<l; i++) {
        this.shots[i].fill(ctx);
        ctx.fillText("Disparo Y: " + this.shots[i].y, 5, 80)
    }
}

/*
 * Stars
 */
function star() {
	//create stars
    for(var i=0; i<1; i++)
        if (stars.length <= 300)
            stars.push(new Star(random(canvas.width), random(canvas.height), random(10)))

    //move stars
    for(var i=0, l=stars.length; i<l; i++){
        stars[i].y++
        if(stars[i].y > canvas.height)
            stars[i].y=0
        stars[i].timer += 5
        if(stars[i].timer > 10)
            stars[i].timer -= 10
    }
}

function Star(x,y,timer){
    this.x=(x==null)?0:x;
    this.y=(y==null)?0:y;
    this.timer = (timer == null)?0:timer
}


/*
 * FPS
 */
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

/**
 * @method  Rectangle_Player
 * @constructor
 * Creates
 * @param {[type]} x         [description]
 * @param {[type]} y         [description]
 * @param {[type]} width     [description]
 * @param {[type]} height    [description]
 */
function Rectangle_Player(x,y,width,height) {
    this.x = (x == null)?0:x
    this.y = (y == null)?0:y
    this.width = (width == null)?0:width
    this.height = (height == null)?this.width:height
}

Rectangle_Player.prototype.fill = function() {
    ctx.fillRect(this.x, this.y, this.width, this.height)
}

Rectangle_Player.prototype.fill = function(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height)
}

Rectangle_Player.prototype.intersects = function(rect) {
    if (rect != null) {
        return (this.player.shots.x < this.enemy.x + this.enemy.width &&
                this.player.shots.x + this.player.shots.width > this.Enemy.x &&
                this.player.shots.y > this.enemy.y + this.enemy.height &&
                this.player.shots.y + this.player.shots.height > this.enemy.y) 
    }
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