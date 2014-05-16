var escala = 1
logger = document.getElementById("logger")

var c = null, cxt = null;

function main(){ 
  var w = new World("screener")

  var boid_list = new WorldInterface("text_lcd")
  w.addPort("new_boid", boid_list)
  
  var boid_editor = new BoidEditor("boid_properties")
  boid_list.addPort("focus_boid", boid_editor)
  

  var face_boids = new FaceDevice("boid_properties")
  boid_list.addPort("face_boid_animation", face_boids)

  c=document.getElementById("face");
  cxt=c.getContext("2d");
var speaker = w.new_boid_of(Speaker, function(config){ config.geo_data = {
                                        position: new Vector(200, 200),
                                        velocity: new Vector(0, 0),
                                        acceleration: new Vector(0, 0)
                                      }})

var speaker2 = w.new_boid_of(Speaker, function(config){ config.geo_data = {
                                        position: new Vector(200, 200),
                                        velocity: new Vector(0, 0),
                                        acceleration: new Vector(0, 0)
                                      }})

/*
     var seeker = []
    var t = w.new_boid_of(Nanobot, function(config) {
                           
                           config.colour   = "red"
                           config.geo_data = {
                              position: new Vector(200, 200),
                              velocity: new Vector(0, 0),
                              acceleration: new Vector(0, 0)
                           }
                           return config
    })

   var first = t
   seeker.push(t)

   for(var i=0; i<5; i++)
     seeker.push( t = w.new_boid_of(Nanobot, function(config) {
       config.brain.activate('seek', t)
     }) )

   first.brain.activate('seek', t)
*/

/*
  var t = w.new_boid_of(Nanobot, function(config) {
       config.brain.activate('seek', speaker)
     })
*/
for(var i=0;i<10; i++)
  w.new_boid_of(Nanobot, function(config) {
       config.brain.activate('wander')
     })


  w.start()
}