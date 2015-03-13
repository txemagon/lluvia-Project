Space.prototype = new Device
Space.prototype.constructor = Space
Space.prototype.super = Device

var planets_map = null

function Space(view){
   	planets_map = document.getElementById("planetas")
   	planets_map.style.top = "-200px"
   	planets_map.style.left = "-500px"  

   	this.self_events = ["go_to_planet"]

   	Device.call(this, view)

    for (var i=0; i<19; i++)
    this.new_gate("planet" + i, Gate, {
   		do_onclick: function(i){ return function(event, element) {
   			this.device.fire_event(this.device.new_message("sync", "go_to_planet", i))
   			this.device.hide()
   		}}(i)
   	})
}

Space.prototype.attend_show_space = function(date, mssg) {
	this.appear()
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

