Planet.prototype = new Device
Planet.prototype.constructor = Planet
Planet.prototype.super = Device

//Numero de las teclas
var KEY_ENTER=13;
var KEY_SPACE=32;
var KEY_LEFT=37;
var KEY_RIGHT=39;

function Planet(view) {
    var that = this
    this.self_events = ["new_boid"]

    this.start_time = null
    this.aceleration_max = 30
    this.velocity_max = 200
    this.boids = 0

    function initialize(){
        //World.call(that, view)
        that.ctx = that.view.getContext("2D")
    }
    if (arguments.length)
        initialize()


Planet.prototype.initialize = function(planet_number){
    this.enemy = new Enemy(planet_number)
}

Planet.prototype.attend_show_planet = function(date, mssg) {
    this.appear()
    this.initialize(mssg.event.show_planet.data)
}

//States

/*
Planet.prototype.running_pause = function() {
    alert("PAUSE")
}

Planet.prototype.running_fight = function() {
    alert("Start the battle ")
}

Planet.prototype.running_fight_win = function() {
    alert("You won")
}

Planet.prototype.running_fight_lose = function() {
    alert("You lost.\n Do you want to fight again?")
}
*/