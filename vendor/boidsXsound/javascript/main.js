
function main(){ 
  var w = new World("screener")

  var boid_list = new WorldInterface("text_lcd")
  w.addPort("new_boid", boid_list)
  
  var boid_editor = new BoidEditor("boid_properties")
  boid_list.addPort("focus_boid", boid_editor)
  
/*
  var face_boids = new FaceDevice("boid_properties")
  boid_list.addPort("face_boid_animation", face_boids)
  c=document.getElementById("face");
  cxt=c.getContext("2d");
*/

//Lineas del canvas
var l1 = new StraightLine(new Vector(0,0), new Vector(550,0))
var l2 = new StraightLine(new Vector(550,0), new Vector(550,400))
var l3 = new StraightLine(new Vector(550, 400), new Vector(0,400))
var l4 = new StraightLine(new Vector(0,400), new Vector(0,0))

//Lineas del circulo
var a1 = new StraightLine(new Vector(328,147), new Vector(275,125))
var a2 = new StraightLine(new Vector(350,200), new Vector(328,147))
var a3 = new StraightLine(new Vector(328,253), new Vector(350,200))
var a4 = new StraightLine(new Vector(275,275), new Vector(328,253))
var a5 = new StraightLine(new Vector(222,253), new Vector(275,275))
var a6 = new StraightLine(new Vector(200,200), new Vector(222,253))
var a7 = new StraightLine(new Vector(222,147), new Vector(200,200))
var a8 = new StraightLine(new Vector(275,125), new Vector(222,147))

switch(escenario){
  case 1:
    for(var i=0; i<40; i++)
      w.new_boid_of(Nanobot, function(config) {
        config.geo_data = {
                            position: new Vector(Math.random()*550,Math.random()*400),
                            //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                            velocity: new Vector(0.1, 0.1),
                            acceleration: new Vector(0, 0)}

         config.brain.activate('wander')
      })
    w.start()
  break

  case 2:
    var wander = w.new_boid_of(Nanobot, function(config) {
        config.geo_data = {
                            position: new Vector(Math.random()*550,Math.random()*400),
                            //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                            velocity: new Vector(0.1, 0.1),
                            acceleration: new Vector(0, 0)}
         config.brain.activate('wander')
      })
    wander.example = true
    wander.level_emotion = 0

    for(var i=0; i<10; i++)
      w.new_boid_of(Nanobot, function(config) {
        config.geo_data = {
                            position: new Vector(Math.random()*550,Math.random()*400),
                            //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                            velocity: new Vector(0.1, 0.1),
                            acceleration: new Vector(0, 0)}

         config.brain.activate('seek', wander)
      })

    for(var i=0; i<10; i++){
      var a = w.new_boid_of(Nanobot, function(config) {
        config.geo_data = {
                            position: new Vector(Math.random()*550,Math.random()*400),
                            //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                            velocity: new Vector(0.1, 0.1),
                            acceleration: new Vector(0, 0)}

         config.brain.activate('flee', wander)
      })
         a.example = true
         a.level_emotion = 100
    } 
    w.start()
  break

  case 3 : 
    var wander = w.new_boid_of(Nanobot, function(config) {
        config.geo_data = {
                            position: new Vector(275,200),
                            //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                            velocity: new Vector(0.1, 0.1),
                            acceleration: new Vector(0, 0)}
         config.brain.activate('wander')
      })
    wander.example = true
    wander.level_emotion = 0

    for(var i=0; i<10; i++)
      w.new_boid_of(Nanobot, function(config) {
        config.geo_data = {
                            position: new Vector(Math.random()*550,Math.random()*400),
                            //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                            velocity: new Vector(0.1, 0.1),
                            acceleration: new Vector(0, 0)}
        config.brain.activate('pursue', wander)
      })
    break

  case 4:
    w.path.push(l1, l2, l3, l4)
    for(var i=0; i<20; i++){
      var a = w.new_boid_of(Nanobot, function(config) {
        config.geo_data = {
                            position: new Vector(Math.random()*550,Math.random()*400),
                            //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                            velocity: new Vector(0.1, 0.1),
                            acceleration: new Vector(0, 0)}
        config.vel_max = 30
        config.brain.activate('wander')
        config.brain.activate('containment')
      })
         a.example = true
         a.level_emotion = 0
    } 
    w.start()
    break  

    case 5:
    w.path.push(a1,a2,a3,a4,a5,a6,a7,a8)
    for(var i=0; i<20; i++){
      var a = w.new_boid_of(Nanobot, function(config) {
        config.geo_data = {
                            position: new Vector(Math.random()*150,Math.random()*100),
                            //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                            velocity: new Vector(10, 10),
                            acceleration: new Vector(0, 0)}
        config.vel_max = 30
        config.brain.activate('containment')
      })
         a.example = true
         a.level_emotion = 0
    }
    w.start()
    break  

  case 0:

    var speaker = w.new_boid_of(Speaker, function(config){ config.geo_data = {
                                        position: new Vector(275, 200),
                                        velocity: new Vector(0.0001, 0.0001), //==> Si es 0 peta!!!
                                        acceleration: new Vector(0, 0)
                                      }
                                    config.cruising_speed = 0
                            })

    for(var i=0; i<15; i++)
    w.new_boid_of(Nanobot, function(config) {
      config.geo_data = {
                          position: new Vector(Math.random()*550,Math.random()*400),
                          //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                          velocity: new Vector((Math.random()*10)-5, (Math.random()*10)-5),
                          acceleration: new Vector(0, 0)}
      config.vision.angle = 30 * Math.PI / 180
      config.vision.radius = 150
      config.vel_max = 40
      config.vel_min = 5
      config.cruising_speed = 20

       config.brain.activate('alignment')
       config.brain.activate('separation')
       config.brain.activate('cohesion')


    })
  break
  }
}
