Planet.prototype = new Device
Planet.prototype.constructor = Planet
Planet.prototype.super = Device

//keys 
var KEY_ENTER=13;
var KEY_SPACE=32;
var KEY_LEFT=37;
var KEY_RIGHT=39;
var pressing = []
var lastPress = null

function Planet(view, screen, width, height) {
    planet = document.getElementById("planet")
    var that = this
    this.self_events = ["new_boid"]

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
    this.player = this.new_boid_of(Player, Player) 
    this.enemy = this.new_boid_of(Enemy, Enemy.data[planet_number])
}

Planet.prototype.attend_show_planet = function(date, mssg) {
    var planet_number = mssg.event.show_planet.data
    alert("Planet number: " + planet_number.toSource())
    mssg.current++
    this.appear()
    this.initialize(mssg.event.show_planet.data)
    this.switch("running.fight.playing")
}

//States
Planet.prototype.running_up = function() {
    this.draw()
}

Planet.prototype.running_fight_playing_up = function(date) {
    alert("Start the battle ")
    

/*
    if (this.enemy.life == 0) 
        this.switch("running.fight.win")
    else 
        if(this.player.life == 0)
            this.switch("running.fight.lose")
*/
}

Planet.prototype.running_fight_win = function() {
    alert("You won")
    //level_up()
    
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

Planet.prototype.new_boid_of = function(the_class, config){
    var class_name = the_class.name
    var b = new the_class(config)
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

//methods for define behavior
function repaint(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function attack() {
    if (this.player.shots.y == this.enemy.y) {
        this.enemy.life -= this.player.damage
        if (this.enemy.life == 0)
            alert("You win")
    }



}


//when the player lose, restart the game
function restart() {
    var answer = confirm("You lost.\n Do you want to fight again?")
    if (answer == true) 
        alert("Start again!")
    else
        alert("See you space cowboy...")
    
}
