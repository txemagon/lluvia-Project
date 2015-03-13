var w = null

function main() {



    //w = new World('screener', WebGl, cartoon, 1000, 400)
    w = new World('screener', CanvasDevice, cartoon2_canvas, 1000, 400)
    //w.screen[0].add_camera(500/200, 45, 0.1, 1000000, 469.73015451325904, 198.40596475899403, 505.6617632533937, {x:500, y:200, z:0})
   // w.new_screen('screener2', CanvasDevice, cartoon_canvas)
   
    
    //w.new_screen('screener3', CanvasDevice, cartoon2_canvas)
    //  var boid_list = new WorldInterface("boid_list_content")
    //  w.add_port("new_boid", boid_list)

    //  var boid_editor = new BoidEditor("boid_properties")
    //  boid_list.add_port("focus_boid", boid_editor)

    /* Example 1 of Boid creation */
    // var fixed_target = w.new_boid({
    //     name: "fixed",
    //     colour: "green",
    //     geo_data: {
    //         position: new Vector(220, 230),
    //         velocity: new Vector(0, 0),
    //         acceleration: new Vector(0, 0)
    //     }
    // })



    // w.new_boid({
    //     name: "seeker",
    //     colour: "yellow"
    // }, function(config) {
    //     /* Here you can interact with the outer scope */
    //     /* You can also access the already created brain */
    //     config.geo_data = {
    //         position: new Vector(100, 100),
    //         velocity: new Vector(10, 10),
    //         acceleration: new Vector(0, 0)
    //     }
    //     config.brain.activate("seek>arrival", fixed_target)
    //     return config
    // })


    /* Example: wander behavior */
    /*  var wanderer = []
  for(var i = 0; i<10; i++)
    wanderer.push( w.new_boid( function (config) {
    config.color = "purple"
    config.brain.activate("wander")
    return config
  }))
*/

    var imm = w.new_immobile(function(config) {
        /* Here you can interact with the outer scope */
        config.colour = "lightskyblue"
        config.geo_data = {
            position: new Vector(-10000, 0)
        }
        config.width = 100000
        config.height = 400000
        return config
    })

    var mov = w.new_mobile(function(config) {
        /* Here you can interact with the outer scope */
        config.colour = "magenta"
        config.geo_data = {
            position: new Vector(100, 100),
            velocity: new Vector(100, 1),
            acceleration: new Vector(0, 0)
        }
        return config
    })

    var mov = w.new_mobile(function(config) {
        /* Here you can interact with the outer scope */
        config.colour = "lime"
        config.geo_data = {
            position: new Vector(100, 100),
            velocity: new Vector(0, 0),
            acceleration: new Vector(0, 0)
        }
        return config
    })
    var mov = w.new_mobile(function(config) {
        /* Here you can interact with the outer scope */
        config.colour = "lime"
        config.geo_data = {
            position: new Vector(150, 150),
            velocity: new Vector(0, 0),
            acceleration: new Vector(0, 0)
        }
        return config
    })

    /* Example: seek behavior */
    var seeker = []
    var t = w.new_boid(function(config) {
        /* Here you can interact with the outer scope */
        config.colour = "red"
        config.geo_data = {
            position: new Vector(200, 200),
            velocity: new Vector(1, 1),
            acceleration: new Vector(0, 0)
        }
        return config
    })

    var first = t
    seeker.push(t)

    for (var i = 0; i < 10; i++)
        seeker.push(t = w.new_boid(function(config) {
            config.brain.activate('seek', t)
        }))

    first.brain.activate('seek', t)


    /*  Example: flee behavior */
    /*  var fleer = []
  for (var i=0; i<8; i++) {
    var f
    fleer.push( f = w.new_boid( function(config) {
      config.color = "silver"
      config.vel_max = 10
      config.brain.activate("flee", wanderer[i % wanderer.length] )
    } ))
  }

  /*  Example: pursue behaviour*/
    var b2 = w.new_boid(function(config) {
        config.colour = "lime"
        config.vel_max = 80
        config.force_limits.thrust = 40
        config.force_limits.steering = 80
        config.geo_data.position = new Vector(0, 0)
        config.brain.activate("pursue", first)
    })

    /*  Example: foresee < seek == pursue behaviour*/
    var b3 = w.new_boid(function(config) {
        config.colour = "fuchsia"
        config.vel_max = 80
        config.force_limits.thrust = 40
        config.force_limits.steering = 80
        config.geo_data.position = new Vector(200, 0)
        config.brain.activate("foresee<seek", first)
    })  

    /*  Example: foresee < seek > arrival */
    var b4 = w.new_boid(function(config) {
        config.colour = "maroon"
        config.vel_max = 180
        config.force_limits.thrust = 40
        config.force_limits.steering = 80
        config.geo_data.position = new Vector(200, 0)
        config.brain.activate("foresee<seek>arrival", first)
    })

    /* Example: Class as target */
    var yeoman = []
    for (var i = 0; i < 10; i++)
        yeoman.push(w.new_boid(function(config) {
            config.colour = "brown"
            config.brain.activate("wander")
            // config.brain.activate("flee", WanderBehavior)
        }))

    var sheeps = []
    for (var i = 0; i < 100; i++)
        sheeps.push(w.new_boid(function(config) {
            config.colour = "lemonchiffon"
            config.brain.activate("flee", WanderBehavior)
            config.geo_data.velocity = new Vector(1, 1)
        }))
    w.start()
    //w.new_screen('screener2', CanvasDevice, cartoon2_canvas)
}

var KEY = {C:67}
addEventListener("keydown", function(e){
    if(e.keyCode == KEY.C)
        w.screen[0].change_camera()
}, false)
