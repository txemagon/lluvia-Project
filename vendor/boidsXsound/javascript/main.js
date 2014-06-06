
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
*/
var speaker = w.new_boid_of(Speaker, function(config){ config.geo_data = {
                                        position: new Vector(275, 200),
                                        velocity: new Vector(0.0001, 0.0001), //==> Si es 0 peta!!!
                                        acceleration: new Vector(0, 0)
                                      }})
  /*
*/
  /*

var speaker2 = w.new_boid_of(Speaker, function(config){ config.geo_data = {
                                        position: new Vector(400, 200),
                                        velocity: new Vector(0, 0),
                                        acceleration: new Vector(0, 0)
                                      }})
*/
  // Lineas del canvas
  var l1 = new StraightLine(new Vector(0,0), new Vector(550,0))
  var l2 = new StraightLine(new Vector(550,0), new Vector(550,400))
  var l3 = new StraightLine(new Vector(550, 400), new Vector(0,400))
  var l4 = new StraightLine(new Vector(0,400), new Vector(0,0))
/*

  // Primer triangulo
  var a1 = new StraightLine(new Vector(175,75), new Vector(75,75))
  var a2 = new StraightLine(new Vector(75,175), new Vector(175,75))
  var a3 = new StraightLine(new Vector(75,75), new Vector(75,175))

  var b1 = new StraightLine(new Vector(175,325), new Vector(75,225))
  var b2 = new StraightLine(new Vector(75,325), new Vector(175,325))
  var b3 = new StraightLine(new Vector(75,225), new Vector(75,325))

  var c1 = new StraightLine(new Vector(475, 75), new Vector(375, 75))
  var c2 = new StraightLine(new Vector(475, 175), new Vector(475,75))
  var c3 = new StraightLine(new Vector(375, 75), new Vector(475,175))

  var d1 = new StraightLine(new Vector(475,325), new Vector(475,225))
  var d2 = new StraightLine(new Vector(375,325), new Vector(475,325))
  var d3 = new StraightLine(new Vector(475,225), new Vector(375,325))

  var r1 = new StraightLine(new Vector(275,125), new Vector(225,200))
  var r2 = new StraightLine(new Vector(225,200), new Vector(275,275))
  var r3 = new StraightLine(new Vector(275,275), new Vector(325,200)) 
  var r4 = new StraightLine(new Vector(325,200), new Vector(275,125))

 w.path.push(l1,l2,l3,l4, a1,a2,a3, b1,b2,b3, c1,c2,c3, d1,d2,d3, r1,r2,r3,r4)
*/

var a1 = new StraightLine(new Vector(328,147), new Vector(275,125))
var a2 = new StraightLine(new Vector(350,200), new Vector(328,147))
var a3 = new StraightLine(new Vector(328,253), new Vector(350,200))
var a4 = new StraightLine(new Vector(275,275), new Vector(328,253))
var a5 = new StraightLine(new Vector(222,253), new Vector(275,275))
var a6 = new StraightLine(new Vector(200,200), new Vector(222,253))
var a7 = new StraightLine(new Vector(222,147), new Vector(200,200))
var a8 = new StraightLine(new Vector(275,125), new Vector(222,147))

w.path.push(l1, l2, l3, l4)//, a1,a2,a3,a4,a5,a6,a7,a8)

/*
  for(var i=0; i<20;i++){
    w.new_boid_of(Nanobot, function(config) {
      config.geo_data = {
                          position: new Vector(Math.random()*250, Math.random()*100), // 210, 100
                          velocity: new Vector(Math.random()*10-10, Math.random()*10-10),
                          acceleration: new Vector(0, 0)}

      config.brain.activate('containment')
      //config.brain.activate('wander')

      config.brain.activate('alignment')
      config.brain.activate('separation')
      config.brain.activate('cohesion')

      config.force_limits.thrust = 250
      config.force_limits.steering = 20
      config.mass = 20
      config.vel_max = 40
    })
  }
// Pruebas angulo de vision
  for(var i=0; i<15; i++)
    w.new_boid_of(Nanobot, function(config) {
      config.geo_data = {
                          position: new Vector(Math.random()*550,Math.random()*400),
                          //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                          velocity: new Vector(-0.001, 0),
                          acceleration: new Vector(0, 0)}

      //config.brain.activate('containment')
      config.brain.activate('wander')

      //nfig.brain.activate('alignment')
      //config.brain.activate('separation')
      //config.brain.activate('cohesion')


    })
*/
/*
    w.new_boid_of(Nanobot, function(config) {
      config.geo_data = {
                          position: new Vector(400,50),
                          velocity: new Vector(-40, 0),
                          acceleration: new Vector(0, 0)}
                          config.vision.angle = 5 * Math.PI / 180
    })
*/

  for(var i=0; i<10; i++)
    w.new_boid_of(Nanobot, function(config) {
      config.geo_data = {
                          position: new Vector(Math.random()*550,Math.random()*400),
                          //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                          velocity: new Vector(0.1, 0.1),
                          acceleration: new Vector(0, 0)}
      config.vision.angle = 120 * Math.PI / 180  
      config.vision.radius = 150
      config.vel_max = 40
      config.vel_min = 5
      config.cruising_speed = 20

      //config.force_limits.steering = 500
      //config.brain.activate('containment')
      //config.brain.activate('wander')
      config.brain.activate('alignment')
      config.brain.activate('separation')
      config.brain.activate('cohesion')
    })

  /*
  init_setup()
  playSound()
*/
  w.start()
}
