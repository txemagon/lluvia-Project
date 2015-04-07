Planet.prototype = new Device
Planet.prototype.constructor = Planet
Planet.prototype.super = Device

//keys 
var KEY_ENTER = 13
var KEY_SPACE = 32
var KEY_LEFT  = 37
var KEY_RIGHT = 39
var KEY_SHOT  = 87 //w
var pressing  = []
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
    sweetAlert("Traveling...", "to planet: " + planet_number.toSource())
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
    //sweetAlert("Start the battle", "Attack!")
   
/*
    if (this.enemy.life == 0) 
        this.switch("running.fight.win")
    else 
        if(this.player.life == 0)
            this.switch("running.fight.lose")
*/
}

Planet.prototype.running_fight_win = function(date) {
    sweetAlert({
    title: "You won!",
    text: "Level up! Go to upload your skills",
    type: "success",
    showCancelButton: true,
    confirmButtonText: "Go",
    cancelButtonText: "No",
    closeOnConfirm: false,
    closeOnCancel: false
},
    function(isConfirm) {
        if (isConfirm) {
            swal("You have " + (game.points.points.toSource()) + " skill points.", "Spend all your skill points!");
           //level_up() 
        }
        else {
            swal("Traveling...", "Choose a planet");
        }
    });
}

Planet.prototype.running_fight_lose = function(date) {
    //when the player lose, restart the game
sweetAlert({
  title: "You lost!",
  text: "Do you want to play again?",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes",
  cancelButtonText: "No",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm){
  if (isConfirm) {
    swal("Figth!", "The battle start again", "success");
  } else {
    swal("Surrender", "See you space cowboy...", "error");
  }
});
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

//change the screen to full mode
function resize() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // metodo alternativo
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {               // metodos actuales
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }

  }
    
}
