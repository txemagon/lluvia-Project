Game.prototype = new Device
Game.prototype.constructor = Game
Game.prototype.super = Device

function Game() {
    Device.call(this, "game")
}

Game.prototype.attend_chosen_finished = function(date, mssg) {
    alert(mssg.event.chosen_finished.data.toSource())
    mssg.current++
}

