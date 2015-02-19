Game.prototype = new Device
Game.prototype.constructor = Game
Game.prototype.super = Device

function Game() {
    this.self_events = ["show_skills"]
    Device.call(this, "game")
}

Game.prototype.attend_chosen_finished = function(date, mssg) {
    alert(mssg.event.chosen_finished.data.toSource())
    mssg.current++
}

Game.prototype.attend_go_to_planet = function(date, mssg) {
    alert(mssg.event.go_to_planet.data.toSource())
    mssg.current++
}


Game.prototype.running_choosing_up = function() {
    this.fire_event(this.new_message("sync", "show_skills"))
}