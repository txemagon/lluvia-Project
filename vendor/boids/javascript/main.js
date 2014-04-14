alert("Welcome")
logger = document.getElementById("logger")

function main(){
  var w = new World()
  var boid_list = new WorldInterface("boid_list_content")
  w.addPort("new_boid", boid_list)

  var boid_editor = new BoidEditor("boid_properties")
  boid_list.addPort("focus_boid", boid_editor)

  /* Example 1 of Boid creation */
   w.new_boid( { colour: "green",
                 geo_data:  {
                               position: new Vector(220, 230),
                               velocity: new Vector(0, 0),
                               acceleration: new Vector(0, 0)
                            }
   })



    /* Example: wander behavior */
  var wanderer = []
  for(var i = 0; i<10; i++)
    wanderer.push( w.new_boid( function (config) {
      config.color = "purple"
      config.brain.activate("wander")
      return config
    }))

   /* Example: seek behavior */
   var seeker = []
    var t = w.new_boid( function(config) {
                           /* Here you can interact with the outer scope */
                           config.colour   = "red"
                           config.geo_data = {
                              position: new Vector(200, 200),
                              velocity: new Vector(0, 0),
                              acceleration: new Vector(0, 0)
                           }
                           return config
    })


    var ba = w.new_boid( {colour: "yellow"}, function(config) {
                           /* Here you can interact with the outer scope */
                           /* You can also access the already created brain */
                           alert("hey")
                           config.geo_data = {
                              position: new Vector(100, 100),
                              velocity: new Vector(0, 0),
                              acceleration: new Vector(0, 0)
                           }
                           return config
    })

//   var first = t
//   seeker.push(t)
//
//   for(var i=0; i<5; i++)
//     seeker.push( t = w.new_seeker(t) )
//
//   first.brain.activate('seek')
//   first.brain.get_behavior('seek').set_target(t)
//
//
//   /*  Example: flee behavior */
//   var fleer = []
//   for (var i=0; i<8; i++) {
//     var f
//     fleer.push( f = w.new_flee(wanderer[i % wanderer.length], "green") )
//     // f.brain.activate('seek')
//     // first.brain.get_behavior('seek').set_target(first)
//   }
//
//   /*  Example: pursue behaviour*/
//   var b1 = w.new_wanderer()
//   var b2 = w.new_pursuer(b1, "yellow")

  w.start()
}
