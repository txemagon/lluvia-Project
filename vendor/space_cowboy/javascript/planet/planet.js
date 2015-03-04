Planet.prototype = new Device
Planet.prototype.constructor = Planet
Planet.prototype.super = Device

//Numero de las teclas
var KEY_ENTER=13;
var KEY_SPACE=32;
var KEY_LEFT=37;
var KEY_RIGHT=39;

function Planet(view, screen, width, height) {
    planet = document.getElementById("planet")
    var that = this
    this.self_events = ["new_boid"]

    this.screen = []
    this.width = width || 100
    this.height = height || 100
    this.start_time = null
    this.aceleration_max = 30
    this.velocity_max = 200
    this.boids = 0
    
    /*
    if (typeof(screen) === "string")
        screen = document.getElementById(screen)
    if (!screen)
        screen = document.querySelector('canvas')
    if (!(screen instanceof HTMLElemnt))
        return
    var context = screen.getContext('2d')
    if (screen && context)
        this.screen.push( { screen: screen, context: context})
    */
    Device.call(this, view)
/*
    function initialize(){
        //World.call(that, view)
        that.ctx = that.view.getContext("2D")
    }
    if (arguments.length)
        initialize()
*/
}

Planet.prototype.initialize = function(planet_number){
    this.enemy = new Enemy(planet_number)
    this.Player = new Player()
}

Planet.prototype.attend_show_planet = function(date, mssg) {
    this.appear()
    this.initialize(mssg.event.show_planet.data)
    this.switch("running_fight")
}


//States

Planet.prototype.running_fight_up = function() {
    alert("Start the battle ")
}

Planet.prototype.running_fight_win = function() {
    alert("You won")
}

Planet.prototype.running_fight_lose = function() {
    restart()
}


function restart() {
    var answer = confirm("You lost.\n Do you want to fight again?")
    if (answer == true) {
        alert("Start again!")
    }
    else
        alert("See you space cowboy...")
}

if (enemy.life = 0) 
    this.switch("running_fight_win")
else {
    if(player.life = 0)
        this.switch("running_fight_lose")
}