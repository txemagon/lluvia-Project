Game.prototype = new Device
Game.prototype.constructor = Game
Game.prototype.super = Device

function Game() {
    this.self_events = ["show_skills", "show_space", "show_planet"]
    Device.call(this, "game")
    this.points
}

//Methods
Game.prototype.attend_chosen_finished = function(date, mssg) {
	var points = mssg.event.chosen_finished.data
	this.points = points
    alert(points.toSource())
    this.fire_event(this.new_message("sync", "show_space"))
    mssg.current++
}

Game.prototype.attend_go_to_planet = function(date, mssg) {
	alert("travelling to planet number " + mssg.event.go_to_planet.data)
	this.fire_event(this.new_message("sync", "show_planet"))
	mssg.current++ 
}

//States
Game.prototype.running_choosing_up = function() {
    this.fire_event(this.new_message("sync", "show_skills"))
}

Device.prototype.appear = function() {
    this.view.style.display = "block"
}

Device.prototype.hide = function() {
    this.view.style.display = "none"
}

