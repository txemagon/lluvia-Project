logger = document.getElementById("logger")
  
function main(){ 
  var w = new World()
  var boid_list = new WorldInterface("boid_list_content")
  w.addPort("new_boid", boid_list)

  var boid_editor = new BoidEditor("boid_properties")
  boid_list.addPort("focus_boid", boid_editor)
  var t = w.new_boid("red", { position: new Vector(220, 230), 
                           velocity: new Vector(0, 0), 
                           acceleration: new Vector(0, 0) } )
  
  var first = t                           
  for(var i=0; i<10; i++)
    t = w.new_seeker(t)
  first.brain.activate('seek')
  first.brain.get_behavior('seek').set_target(t)
  

  w.start()
}
