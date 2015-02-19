Space.prototype = new Device
Space.prototype.constructor = Space
Space.prototype.super = Device

var planets_map = null

Space.prototype.appear = function() {
	this.view.style.display = "visible"
}

Space.prototype.hide = function() {
	this.view.style.display = "none"
}

function Space(){
   	planets_map = document.getElementById("planetas")
   	planets_map.style.top = "-200px"
   	planets_map.style.left = "-500px"  

   	this.view = document.getElementById("map")

   	Device.call(this, null)
}

//Funcion que se ejecutara al pinchar en cada planeta
function goToPlanet() {
    this.new_gate("planet0", Gate, {
   		do_onclick: function(event, element) {
   			this.device.fire_event(this.device.new_message("sync", "go_to_planet", null))
   			this.device.hide()
   		}
   	})
}

//Funciones de movimiento del mapa
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
	if (actual > -700)
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
	if (actual < -400)
		planets_map.style.left = (actual + inc) + "px"
	else
		inc = 0
}

