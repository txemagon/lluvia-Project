/**
 * Boid's world
 *
 * @author Txema
 * @version 1.00 Aug, 2011
 */


/**
 * @classDescription Creates a World for handling boids.
 *
 * @param  {screen} World screen
 * @return {World}
 * @constructor
*/

World.prototype = new Device
World.prototype.constructor = World
World.prototype.super = Device

function World(screen, width, height){

  var that = this
  this.self_events = ["focus_boid", "new_boid"]
  
  this.screen = []
  this.width   = width  || 100 //meters
  this.height  = height || 100 
  this.start_time = null
  this.acceleration_max = 30
  this.velocity_max = 200
  this.boids = {total: 0}

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

World.prototype.set_dashboard = function(name){
    this.dashboard = new WorldInterface(name, this)
}

World.prototype.width = function(){
  if (arguments.length == 0)
    return this.width
  this.width = arguments[0] 
}

World.prototype.height = function(){
  if (arguments.length == 0)
    return this.height
  this.height = arguments[0] 
}

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

World.prototype.assert_screen = function(){
  if ( !this.screen.length )
    throw "No screens yet"
} 

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

World.prototype.has_born = function (){
  for (var i=0; i<arguments.length; i++){
    arguments[i].my_world = this
    this.register(arguments[i])
    //logger.innerHTML += this.newMessage("sync", "new_boid", arguments[i]).event.toSource() + "<br/>"
    this.fireEvent(this.newMessage("sync", "new_boid", arguments[i]))
   }
}

World.prototype.get_boids = function(){
  var boids = []
  boids = this.threads.select_if( function(el){
                                    return (el.object instanceof Boid)
                                })
  return boids.collect( function(el){ return el.object; })
}

World.prototype.each_boid = function(){
  var that = this
  this.get_boids().each(function(el){
      World.prototype.each_boid.yield(el)
      })
}

World.prototype.start = function(){
  var that = this
  this.start_time = new Date()
  this.get_boids().each( function(el) {
    el.start(that.start_time) 
  })
}

World.prototype.draw = function(){
  var that = this
  this.get_boids().each( function(el) {
    el.draw(that.screen[0].context) 
  })
}

World.prototype.step = function(current_time){
  var that = this
  current_time = current_time || this.now || new Date()
  this.each_boid(function(boid){
    boid.update_physics(current_time)
  })
}

World.prototype.is_one_second_from_begining = function(){
  this.start()
  var current_time = new Date( this.start_time.toString() )
  current_time.setSeconds( this.start_time.getSeconds() + 1 )
  current_time.setMilliseconds( this.start_time.getMilliseconds())
  
  this.step(current_time)
}

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

World.prototype.running_steady = function(processors_time){
  //this.show_boids()
  var that = this
  this.now = processors_time || new Date()
  //this.eventDispatcher.shift()
  var ctx = this.screen[0].context
  ctx.clearRect(0,0,850,500)
  this.each_boid(function(boid){
    boid.run(that.now)
    boid.draw(ctx)
  })
  //setTimeout(this.run.bind(this), 100)
}

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
    if ( dx * dx + dy * dy < vision && 
         heading.angle(new Vector(dx, dy) < vision_object.angle ) )
      visible.push(boid)
  })
  return visible
}

World.prototype.new_boid = function(color, geo_data){
  color = color || "blue"
  if (typeof(geo_data) === "undefined")
    geo_data = { 
          position: new Vector(Math.floor(Math.random()*400), Math.floor(Math.random()*400)),
          velocity: new Vector(Math.floor(Math.random()*40), Math.floor(Math.random()*40)), 
          acceleration: new Vector(0,0)
  }
  var b = new Boid( geo_data, color)
  this.boids++
  b.id = this.boids
  this.has_born(b)
  return b
}

World.prototype.new_seeker = function(target, color){
  var b = this.new_boid(color)
  b.brain.activate('seek')
  b.brain.get_behavior('seek').set_target(target)
  return b
}

World.prototype.start_and_run = function(){
  this.start()
  this.run()
}


World.prototype.attend_focus_boid = function(date, mssg){
  mssg.current++;
}

World.prototype.new_boid_of = function(class_name, config){
  var b = new class_name(config)
  if (this[class_name])
    this[class_name]++
  else
    this[class_name] = 1
  this.boids.total++
  this.has_born(b)
  return b
}

World.prototype.method_missing= function(method, obj, params){

  if ( /new_boid_as_/.test(method) ){
    var subtype = method.match(/new_boid_as_(\w*)/ )[1].capitalize()
    return this.new_boid_of(eval("" + subtype), params[0])
    //todo: This is dependant of bad ll_Exception params analysis
  }
  return this.super.method_missing.apply(this, arguments) 
}