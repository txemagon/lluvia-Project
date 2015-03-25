Space.prototype = new Device
Space.prototype.constructor = Space
Space.prototype.super = Device

var planets_map = null
var space_stars = []

function Space(view){
	canvas_space = document.getElementById("canvas_space")
	ctx_space = canvas_space.getContext("2d")

   	planets_map = document.getElementById("planetas")
   	planets_map.style.top = "-200px"
   	planets_map.style.left = "-500px"  

   	this.self_events = ["go_to_planet", "up"]

   	Device.call(this, view)

    for (var i=0; i<21; i++)
    this.new_gate("planet" + i, Gate, {
   		do_onclick: function(i){ return function(event, element) {
   			this.device.fire_event(this.device.new_message("sync", "go_to_planet", i))
   			this.device.hide()
   		}}(i)
   	})

	init()
}

Space.prototype.attend_show_space = function(date, mssg) {
	this.appear()
}

function random(max){
    return ~~(Math.random()*max)
}

function init() {
	//create stars
	for(var i=0; i<1; i++)
        space_stars.push(new Star(random(canvas_space.width), random(canvas_space.height), random(10)))
    repaint_space(ctx_space)
    paint_stars(ctx_space)
}

function repaint_space(ctx_space) {
    ctx_space.fillStyle = '#000';
    ctx_space.fillRect(0,0,canvas_space.width, canvas_space.height);
}

function paint_stars(ctx_space) {
	//draw stars
    for(i=0, l=space_stars.length; i<l; i++){
        var c = 255-Math.abs(100-space_stars[i].timer)
        ctx_space.fillStyle = 'rgb(' +c+ ',' +c+ ',' +c+ ')'
        ctx_space.fillRect(space_stars[i].x,space_stars[i].y, 1, 1)
    }
}

function Star(x, y, timer) {
    this.x = (x==null)?0:x
    this.y = (y==null)?0:y
    this.timer = (timer == null)?0:timer
}

//moving map
function up() {
	var inc = 10
	var actual = parseInt(planets_map.style.top)
	if (actual < 0)
		planets_map.style.top = (actual + inc) + "px"
	else
		inc = 0   
}

function right() {
	var inc = 10
	var actual = parseInt(planets_map.style.left)
	if (actual > -900)
		planets_map.style.left = (actual - inc) + "px"
	else
		inc = 0
}

function down() {
	var inc = 10
	var actual = parseInt(planets_map.style.top) 
	if (actual > -400)
		planets_map.style.top = (actual - inc) + "px"
	else
		inc = 0 
}

function left() {
	var inc = 10
	var actual = parseInt(planets_map.style.left)
	if (actual < -300)
		planets_map.style.left = (actual + inc) + "px"
	else
		inc = 0
}

