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
    this.self_events = ["new_boid_of"]

    this.screen = []
    this.screen.push(document.getElementById("canvas_planet"))
    this.width = width || 100
    this.height = height || 100
    this.start_time = null
    this.aceleration_max = 30
    this.velocity_max = 200
    this.boids = 0
    this.draw_bound = Planet.prototype.draw.bind(this)

    
    Device.call(this, view)
}

Planet.prototype.initialize = function(planet_number){
    this.enemy = this.new_boid_of(Enemy, Enemy.data[planet_number])
    this.player = new Player()

}

Planet.prototype.attend_show_planet = function(date, mssg) {
    mssg.current++
    this.appear()
    this.initialize(mssg.event.show_planet.data)
    this.switch("running.fight.playing")
}

//States
Planet.prototype.running_up = function() {
    this.draw()
}

<<<<<<< HEAD
    if (enemy.life == 0) 
        this.switch("running_fight_win")
    else {
        if(player.life == 0)
            this.switch("running_fight_lose")
    }   
=======
Planet.prototype.running_fight_playing_up = function(date) {
    alert("Start the battle ")
/*
    if (this.enemy.life == 0) 
        this.switch("running.fight.win")
    else 
        if(this.player.life == 0)
            this.switch("running.fight.lose")
*/
>>>>>>> 7c45c2adcadad0a620154d37c65495919558cc72
}

Planet.prototype.running_fight_win = function() {
    alert("You won")
}

Planet.prototype.running_fight_lose = function() {
    restart()
}


//Methods for create the world
Planet.prototype.has_born = function (){
    for (var i=0; i<arguments.length; i++){
        arguments[i].my_world = this
        this.register(arguments[i])
        //logger.innerHTML += this.newMessage("sync", "new_boid", arguments[i]).event.toSource() + "<br/>"
        this.fire_event(this.new_message("sync", "new_boid", arguments[i]))
    }
}

Planet.prototype.draw = function(){
    var that = this
    var ctx = this.screen[0].getContext("2d")
    ctx.clearRect(0,0,400,400)
    this.get_boids().each( function(el) {
      el.draw(ctx)
    })
    requestAnimationFrame(this.draw_bound)
}

Planet.prototype.new_boid = function(config, block){
    var b = typeof(block) === "undefined" ? new Boid(config) : new Boid(config, block)

    this.boids++
    b.id = this.boids
    this.has_born(b)
    return b
}

Planet.prototype.new_boid_of = function(class_name, config){
    var b = new class_name(config)
    if (this[class_name])
        this[class_name]++
    else
        this[class_name] = 1
    this.boids.total++
    this.has_born(b)
    return b
}

Planet.prototype.get_boids = function(){
  return this.get(Boid)
}

//when the player lose, restart the game
function restart() {
    var answer = confirm("You lost.\n Do you want to fight again?")
    if (answer == true) 
        alert("Start again!")
    else
        alert("See you space cowboy...")
}


