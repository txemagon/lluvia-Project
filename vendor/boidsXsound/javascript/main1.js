
function main(){ 
  var w = new World("screener")

  var boid_list = new WorldInterface("text_lcd")
  w.addPort("new_boid", boid_list)
  
  var boid_editor = new BoidEditor("boid_properties")
  boid_list.addPort("focus_boid", boid_editor)
  
  for(var i=0; i<10; i++)
    w.new_boid_of(Nanobot, function(config) {
      config.geo_data = {
                          position: new Vector(Math.random()*550,Math.random()*400),
                          //velocity: new Vector(20, 20 * Math.PI / 180, "pol"),
                          velocity: new Vector((Math.random()*10)-5, (Math.random()*10)-5),
                          acceleration: new Vector(0, 0)}
       config.brain.activate('wander')


    })

  w.start()
}
