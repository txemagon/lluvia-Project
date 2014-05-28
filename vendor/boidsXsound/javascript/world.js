/**
 * Boid's world
 *
 * @author Txema
 * @version 1.00 Aug, 2011
 */


/**
 * @class World
 *
 * Creates a World for handling boids.
 *
 * @constructor World
 * @param  {screen} World screen
 * @return {World}
*/

//Steps to build a new world from class device
World.prototype = new Device
World.prototype.constructor = World
World.prototype.super = Device

function World(screen, width, height){

  /*function World sets the default parameter for the world unless given*/

  var that = this
  this.self_events = ["focus_boid", "new_boid"]

  this.screen = []
  this.width   = width  || 100 //meters
  this.height  = height || 100
  this.start_time = null
  this.acceleration_max = 30
  this.velocity_max = 200
  this.boids = 0
  this.path = []
  this.array_boids = []

  /* We have a HTMLElement, a string holding the id, or the page has a canvas */

  if (typeof(screen) === "string")
    screen = document.getElementById(screen)
  if (!screen)
    screen = document.querySelector('canvas')
  if ( !(screen instanceof HTMLElement))
      return
  var context  = screen.getContext('2d');
  if ( screen && context)
    this.screen.push( { screen: screen, context: context } )

    Device.call(that, null, null)
}

/**
 * @method set_dashboard
 *
 * Sets a new World interface into the dashboard.
 *
 * @param  {(String | String[])...} name Name of the view to create a WorldInterface.
 *
 *
 * ###Example
 *      // Set dashboard for a world
 *      green_world = new World();
 *      green_world.set_dashboard('');
 *
 */
World.prototype.set_dashboard = function(name){
    this.dashboard = new WorldInterface(name, this)
}

/**
 * @method width
 *
 * Sets the width of the world
 *
 * @param  {}
 *
 *
 * ###Example
 *      // Set the width
 *
 *
 *
 */
World.prototype.width = function(){
  if (arguments.length == 0)
    return this.width
  this.width = arguments[0]
}

/**
 * @method height
 *
 * Sets the height of the world
 *
 * @param  {}
 *
 *
 * ###Example
 *      // Set the height
 *
 *
 *
 */
World.prototype.height = function(){
  if (arguments.length == 0)
    return this.height
  this.height = arguments[0]
}

/**
 * @method screen_width
 *
 * Sets the width of the canvas
 *
 * @param  {(String | String[])...} screen Name of the canvas.
 *
 *
 * ###Example
 *      // Set screen_width
 *
 *
 *
 */
World.prototype.screen_width = function(screen){
  var i
  this.assert_screen()
  if ( typeof(screen) === "undefined")
   return  this.screen[0].screen.width
  if (typeof(screen) === "string" )
    screen = document.getElementById(screen)
  for(i=0; i<this.screen.length; i++)
    if (this.screen[i].screen == screen)
      break;
  if (i < this.screen.length)
    return this.screen[i].screen.width
  throw "Screen not found"
}

/**
 * @method assert_screen
 *
 * Checks if there are any screens
 *
 * @param  {}
 *
 *
 * ###Example
 *      // Check for screen
 *
 *
 *
 */
World.prototype.assert_screen = function(){
  if ( !this.screen.length )
    throw "No screens yet"
}

/**
 * @method screen_height
 *
 * Sets the height of the canvas.
 *
 * @param  {(String | String[])...} screen Name of the screen.
 *
 *
 * ###Example
 *      // Set dashboard for a world
 *
 *
 *
 */
World.prototype.screen_height = function(screen){
  var i
  this.assert_screen()
  if ( typeof(screen) === "undefined")
   return  this.screen[0].screen.height
  if (typeof(screen) === "string" )
    screen = document.getElementById(screen)
  for(i=0; i<this.screen.length; i++)
    if (this.screen[i].screen == screen)
      break;
  if (i < this.screen.length)
    return this.screen[i].screen.height
  throw "Screen not found"
}

/**
 * @method has_born
 *
 * Brings a new Boid into the world.
 *
 * See Device#newMessage
 *
 * @fires new_boid
 *
 * @param  {}
 *
 *
 * ###Example
 *      // Bring Boid
 *
 *
 *
 */
World.prototype.has_born = function (){
  for (var i=0; i<arguments.length; i++){
    arguments[i].my_world = this
    this.register(arguments[i])
    //logger.innerHTML += this.newMessage("sync", "new_boid", arguments[i]).event.toSource() + "<br/>"
    this.fireEvent(this.newMessage("sync", "new_boid", arguments[i]))
    this.array_boids.push(arguments[i])
   }
}

/**
 * @method get_boids
 *
 * Creates an array with all the Boids
 *
 * @param  {}
 *
 *
 * ###Example
 *      // Create array of Boids
 *
 *
 *
 */
World.prototype.get_boids = function(){
  var boids = []
  boids = this.threads.select_if( function(el){
                                    return (el.object instanceof Boid)
                                })
  return boids.collect( function(el){ return el.object; })
}

/**
 * @method each_boid
 *
 * Sets a new World interface into the dashboard.
 *
 * @param  {(String | String[])...} name Name of the view to create a WorldInterface.
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.each_boid = function(){
  var that = this

  this.get_boids().each(function(el){
      World.prototype.each_boid.yield(el)
      })
}

/**
 * @method start
 *
 * Starts the new World
 *
 * @param  {}
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.start = function(){
  var that = this
  this.start_time = new Date()
  this.get_boids().each( function(el) {
    el.start(that.start_time)
  })
}

/**
 * @method draw
 *
 * Draw the canvas into the page
 *
 * @param  {}
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.draw = function(){
  var that = this
  var ctx = this.screen[0].context
  ctx.clearRect(0,0,550,400)
  ctx.beginPath()
 /*
 // Cuadrado1  
  ctx.moveTo(75,75)
  ctx.lineTo(175,75)
  ctx.lineTo(75,175)
  ctx.lineTo(75,75)

  // Cuadrado2
  ctx.moveTo(75,225)
  ctx.lineTo(175,325)
  ctx.lineTo(75,325)
  ctx.lineTo(75,225)

  // Cuadrado3
  ctx.moveTo(375, 75)
  ctx.lineTo(475, 75)
  ctx.lineTo(475,175)
  ctx.lineTo(375, 75)
  
  // Cuadrado4
  ctx.moveTo(475,225)
  ctx.lineTo(475,325)
  ctx.lineTo(375,325)
  ctx.lineTo(475,225)


ctx.moveTo(275,125)
//ctx.lineTo(275,325)
ctx.lineTo(225,200)
ctx.lineTo(275,275)
ctx.lineTo(325,200)
ctx.lineTo(275,125)
*/

/*
ctx.moveTo(275,125)
ctx.lineTo(350,200)
ctx.lineTo(275,275)
ctx.lineTo(200,200)
ctx.lineTo(275,125)
ctx.moveTo(275,125)
ctx.lineTo(350,200)
ctx.lineTo(275,275)
ctx.lineTo(200,200)
ctx.lineTo(275,125)

ctx.moveTo(222,147)
ctx.lineTo(328,147)
ctx.lineTo(328,253)
ctx.lineTo(222,253)
ctx.lineTo(222,147)
*/
/*
ctx.moveTo(275,125)
ctx.lineTo(328,147)
ctx.lineTo(350,200)
ctx.lineTo(328,253)
ctx.lineTo(275,275)
ctx.lineTo(222,253)
ctx.lineTo(200,200)
ctx.lineTo(222,147)
ctx.lineTo(275,125)
*/
  ctx.closePath()
  ctx.stroke()
/*
ctx.moveTo(347,200)
ctx.arc(275,200 ,71 , 0, Math.PI*2, false)
ctx.stroke()
*/
  this.get_boids().each( function(el) {
    el.draw(ctx)
  })
}

/**
 * @method step
 *
 *
 *
 * @param  {DateTime} current_time Time ...
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.step = function(current_time){
  var that = this
  current_time = current_time || this.now || new Date()
  this.each_boid(function(boid){
    boid.update_physics(current_time)
  })
}

/**
 * @method is_one_second_from_begining
 *
 * Sets the start time of the world one second after the function is called
 *
 * @param  {}
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.is_one_second_from_begining = function(){
  this.start()
  var current_time = new Date( this.start_time.toString() )
  current_time.setSeconds( this.start_time.getSeconds() + 1 )
  current_time.setMilliseconds( this.start_time.getMilliseconds())

  this.step(current_time)
}

/**
 * @method show_boids
 *
 * Gets the Boids that currently exist in the world
 *
 * @param  {}
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.show_boids = function(){

  var logger = document.getElementById("logger")
  logger.innerHTML = ""
  var boids = 0
  this.each_boid(function(boid){
    boids++
    logger.innerHTML += "<h3>Boid " + boids + "</h3>"
    logger.innerHTML += "Pos: " + boid.position() + "<br/>"
    logger.innerHTML += "Vel: " + boid.velocity() + "<br/>"
    logger.innerHTML += "Acc: " + boid.acceleration() + "<br/>"
    logger.innerHTML += "<br/>"
  })
}

/**
 * @method running_steady
 *
 *
 *
 * @param  {DateTime} processors_time Time of the processor
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.running_steady = function(processors_time){
  //this.show_boids()
  var that = this
  this.now = processors_time || new Date()
  /* Boid#run is called from the child runner */
  //this.eventDispatcher.shift()
  this.visible_for_each() 
  this.draw()
}

/**
 * @method visible_for
 *
 * Creates an array with the Boids that the referred Boid can see
 *
 * @param  {Vector} position Position of the Boid
 * @param  {Vector} vision Vision of the Boid taken as center
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
 /*
World.prototype.visible_for = function(position, heading, vision){
 var that = this

 vision = vision.radius * vision.radius
 var visible = []
 this.each_boid(function (boid){
  var x1 = position.get_coord(0)
  var y1 = position.get_coord(1)
  var dx = boid.geo_data.position.get_coord(0) - x1
  var dy = boid.geo_data.position.get_coord(1) - y1
  if (dx * dx + dy * dy < vision )
   visible.push(boid)
 })
 return visible
}
*/
World.prototype.visible_for = function(position, heading, vision_object){
    var that = this
    var radius = vision_object.radius
    var vision =  radius * radius
    var visible = []
    var x1 = position.get_coord(0)
    var y1 = position.get_coord(1)
    this.each_boid(function (boid){
        var dx = boid.geo_data.position.get_coord(0) - x1
        var dy = boid.geo_data.position.get_coord(1) - y1
          //alert(heading.angle(new Vector(dx, dy) < vision_object.angle)
        if ( dx * dx + dy * dy < vision && Math.abs(heading.angle(new Vector(dx, dy))) < vision_object.angle ) 
            visible.push(boid)
    })
    
    return visible
}

World.prototype.visible_for_each = function(){
  for(var i=0; i<this.array_boids.length; i++){
    var vision =  this.array_boids[i].vision.radius * this.array_boids[i].vision.radius
    var visible = []
    for(var a=0; a<this.array_boids.length; a++){
        var dx = this.array_boids[a].geo_data.position.get_coord(0) - this.array_boids[i].geo_data.position.get_coord(0)
        var dy = this.array_boids[a].geo_data.position.get_coord(1) - this.array_boids[i].geo_data.position.get_coord(1)
        if ( dx * dx + dy * dy < vision && Math.abs(this.array_boids[i].heading().angle(new Vector(dx, dy))) < this.array_boids[i].vision.angle ) 
            visible.push(this.array_boids[a])
    }
    
    this.array_boids[i].visible_object = visible
  }
}

/**
 * @method audible_for
 *
 * Creates an array with the Boids that the referred Boid can audibles
 *
 * @param  {Vector} position Position of the Boid
 * @param  {Vector} wave_radius 
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.audible_for = function(position, wave_radius){
 var that = this

 audition = wave_radius * wave_radius
 var audibles = []
 this.each_boid(function (boid){
  var x1 = position.get_coord(0)
  var y1 = position.get_coord(1)
  var dx = boid.geo_data.position.get_coord(0) - x1
  var dy = boid.geo_data.position.get_coord(1) - y1
  if (dx * dx + dy * dy < audition )
   audibles.push(boid)
 })
 return audibles
}



/**
 * @method new_boid
 *
 * Creates a new boid
 *
 * @param  {String} color Color of the Boid
 * @param  {Vector} geo_data Position, velocity and acceleration of the Boid
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.new_boid = function(config, block){

 var b = typeof(block) === "undefined" ? new Boid(config) : new Boid(config, block)

 this.boids++
  b.id = this.boids
 this.has_born(b)
 return b
}

/**
 * @method start_and_run
 *
 * Starts the Boid and makes it run
 *
 * @param  {}
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.start_and_run = function(){
 this.start()
 this.run()
}

/**
 * @method attend_focus_boid
 *
 *
 *
 * @param  {DateTime} date Time of the message
 * @param  {String} mssg Message
 *
 *
 * ###Example
 *      //
 *
 *
 *
 */
World.prototype.attend_focus_boid = function(date, mssg){
 mssg.current++;
}

/**
 * @method new_boid_of
 * Creates a new boid with a particular behaviour: seek, flee, etc.
 *
 * @param {Function} class_name Name of the derived class of boid.
 * @param {Object} config Configuration object to provide to the boid constructor.
 *
 */
World.prototype.new_boid_of = function(class_name, config){
 var b = new class_name(config)
 if (this[class_name])
  this[class_name]++
  else
 this[class_name] = 1
 this.boids++
 b.id = this.boids
  this.has_born(b)
 return b
}

/**
 * @method method_missing
 * Provides dynamic method new_bois_as_<ClassName>
 */
World.prototype.method_missing= function(method, obj, params){

 if ( /new_boid_as_/.test(method) ){
  var subtype = method.match(/new_boid_as_(\w*)/ )[1].capitalize()
  return this.new_boid_of(eval("" + subtype), params[0])
  //todo: This is dependant of bad ll_Exception params analysis
 }
 return this.super.method_missing.apply(this, arguments)
}
