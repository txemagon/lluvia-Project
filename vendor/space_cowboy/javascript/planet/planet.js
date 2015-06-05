   Planet.prototype = new Device
Planet.prototype.constructor = Planet
Planet.prototype.super = Device

/*
 * Global Variables
 */
var KEY_LEFT  = 37
var KEY_RIGHT = 39
var KEY_SHOT  = 87 //w
var pressing  = []
var lastPress = null


/**
 * @method  Planet
 * @constructor
 * Creates
 * @param {[type]} view      [description]
 * @param {[type]} screen    [description]
 * @param {[type]} width     [description]
 * @param {[type]} height    [description]
 */

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

Planet.prototype.initialize = function(planet_number) {
    this.player = this.new_boid_of(Player, Player) 
    this.enemy = this.new_boid_of(Enemy, Enemy.data[planet_number])
    //this.enemy.brain.activate('seek', this.player)
    /*
    this.enemy.brain.activate('seek')
    this.enemy.brain.get_behavior('seek').set_target(this.player)
    */
}

Planet.prototype.attend_show_planet = function(date, mssg) {
    var planet_number = mssg.event.show_planet.data
    sweetAlert("Traveling...", "to planet: " + planet_number)
    mssg.current++
    this.appear()
    this.initialize(mssg.event.show_planet.data)
    //this.switch("running.fight")
}

//States
Planet.prototype.running_up = function(date) {
    this.draw()  
}


/*
    if (this.enemy.life == 0) 
        this.switch("running.fight.win")
    else 
        if(this.player.life == 0)
            this.switch("running.fight.lose")


Planet.prototype.running_fight_win_up = function(date) {
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

Planet.prototype.running_fight_lose_up = function(date) {
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
*/

/*
Planet.prototype.colison = function() {
    //Enemy shots
    while (this.player.life != 0){
        this.enemy.shots.push(new Rectangle (this.enemy.x, this.enemy.y, 5, 10))
        for (var i=0, l=this.shots.length; i<l; i++) {
            this.shots[i].y -= 5 //shots speed
            if (this.shots[i].y < 0){
                this.shots.splice(i--, 1)
                l--
            }
        }
    }
    
    //shots intersects enemy
    for (var j=0, ll=this.player.shots.length; j<ll; j++) {
        if (this.player.shots[j].intersects(this.enemy)) {
            this.player.shots.splice(j--, 1)
            ll--
            alert("tocado")
            this.enemy.life -= this.damage
        }
    }
}
*/


/*
 * Methods for create the world
 */
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
    this.enemy.move(this.player.x, this.player.life)
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

function repaint(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

/*
 * Change the screen to full mode
 */
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


