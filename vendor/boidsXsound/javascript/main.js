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


  for(var i=0; i<6;i++){
    w.new_boid_of(Nanobot, function(config) {
      config.geo_data = {
                                          position: new Vector(Math.random()*50, Math.random()*100), // 210, 100
                                          velocity: new Vector(20,20),
                                          acceleration: new Vector(0, 0)}
         config.brain.activate('containment')
        //config.brain.activate('wander')

        config.brain.activate('alignment')
        config.brain.activate('separation')
        config.brain.activate('cohesion')
       })
  }
  w.start()
}
