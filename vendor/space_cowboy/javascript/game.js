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
    mssg.current++ 
	var planet_number =  mssg.event.go_to_planet.data
	this.fire_event(this.new_message("sync", "show_planet", planet_number))
}

//States

Game.prototype.running_up = function(date){
        this.skill_menu = new PointDealer(
            "skill", {
                points: 5,
                damage: 0,
                resistance: 0,
                speed: 0
            })
        this.space = new Space("map")
        this.planet = new Planet("planet")

        //Methods
        this.skill_menu.add_port("chosen_finished", this)
        this.space.add_port("go_to_planet", this)
        this.add_port("show_space", this.space)
        this.add_port("show_planet", this.planet)

        //States
        this.add_port("show_skills", skill_menu)

        this.switch("running.choosing")
}
/*
Game.prototype.running_choosing_up = function() {
    this.fire_event(this.new_message("sync", "show_skills"))
}
*/

