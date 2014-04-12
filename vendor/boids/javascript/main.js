alert("Welcome")
logger = document.getElementById("logger")

function main(){
  var w = new World()
  var boid_list = new WorldInterface("boid_list_content")
  w.addPort("new_boid", boid_list)

  var boid_editor = new BoidEditor("boid_properties")
  boid_list.addPort("focus_boid", boid_editor)

    /* Example: wander behavior */
  var wanderer = []
  for(var i = 0; i<3; i++)
    wanderer.push( w.new_wanderer("purple") )

  /* Example: seek behavior */
  var seeker = []
  var t = w.new_boid("red", { position: new Vector(220, 230),
                           velocity: new Vector(0, 0),
                           acceleration: new Vector(0, 0) } )
  var first = t
  seeker.push(t)

  for(var i=0; i<5; i++)
    seeker.push( t = w.new_seeker(t) )

  first.brain.activate('seek')
  first.brain.get_behavior('seek').set_target(t)


  /*  Example: flee behavior */
  var fleer = []
  for (var i=0; i<8; i++) {
    var f
    fleer.push( f = w.new_flee(wanderer[i % wanderer.length], "green") )
    // f.brain.activate('seek')
    // first.brain.get_behavior('seek').set_target(first)
  }

  /*  Example: pursue behaviour*/
  var b1 = w.new_wanderer()
  var b2 = w.new_pursuer(b1)

  w.start()
}
