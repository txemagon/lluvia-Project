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
  /*
var speaker = w.new_boid_of(Speaker, function(config){ config.geo_data = {
                                        position: new Vector(200, 200),
                                        velocity: new Vector(0, 0),
                                        acceleration: new Vector(0, 0)
                                      }})

var speaker2 = w.new_boid_of(Speaker, function(config){ config.geo_data = {
                                        position: new Vector(400, 200),
                                        velocity: new Vector(0, 0),
                                        acceleration: new Vector(0, 0)
                                      }})
*/
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
  var l1 = new StraightLine(new Vector(0,0), new Vector(550,0))
  var l2 = new StraightLine(new Vector(550,0), new Vector(550,400))
  var l3 = new StraightLine(new Vector(0,400), new Vector(550,400))
  var l4 = new StraightLine(new Vector(0,400), new Vector(0,0))
  
  w.path.push(l1,l2,l3,l4)


for(var i=0; i<6;i++){
  w.new_boid_of(Nanobot, function(config) {
    config.geo_data = {
                                        position: new Vector(Math.floor(Math.random()*400), Math.floor(Math.random()*400)),
                                        velocity: new Vector(30,0),
                                        acceleration: new Vector(0, 0)}
       config.brain.activate('containment')
       config.brain.activate('wander')
     })
}


/*
for(var i=0;i<10; i++)
  w.new_boid_of(Nanobot, function(config){ config.geo_data = {
                                        position: new Vector(Math.floor(Math.random()*400), Math.floor(Math.random()*400)),
                                        velocity: new Vector(0, 0),
                                        acceleration: new Vector(0, 0)
                                      }})
*/

  w.start()
}