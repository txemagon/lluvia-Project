Boid.prototype.constructor = Boid

/**
 * Personal Autonomous character
 * 
 * @param {Object} geo_data Position, speed and acceleration
 * @param {Object} geo_data.position 2D position of the Boid
 * @param {Object} geo_data.velocity Planar Velocity
 * @param {Object} geo_data.acceleration Initial acceleration
 * @param {String} colour css color to paint it
 */
function Boid(geo_data,colour){

  var that = this
  
  function initialize(){
    that.brain = new Brain(that)
    that.last_heading = new Vector(0, 1)
    that.geo_data = geo_data || { 
      position: new Vector(0,0), 
      velocity: new Vector(0,0), 
      acceleration: new Vector(0,0) 
      }
    that.vel_max = 50
    that.my_world = null
    that.last_time = that.current_time = null
    that.colour = colour || "blue"
    that.mass = 2
    that.vision = 100

    that.force_limits = {
      thrust: 20,
      steering: 50,
      braking: 70
    }
   }
   
   if (arguments.length)
     initialize()
    
}

/**
 * @method  position
 *
 * Gets or set the position of the void
 * 
 * @return {"undefined" | Number[]}
 */
Boid.prototype.position = function(){
  if (arguments.length == 0)
    return this.geo_data.position.get_coord()
  this.geo_data.position = arguments[0]
}

/**
 * @method  velocity
 *
 * Gets or set the velocity of the void
 * 
 * @return {"undefined" | Number[]}
 */
Boid.prototype.velocity = function(){
  if (arguments.length == 0)
    return this.geo_data.velocity.get_coord()
  this.geo_data.velocity = arguments[0]
}

/**
 * @method  accelertation
 *
 * Gets or set the accelertation of the void
 * 
 * @return {"undefined" | Number[]}
 */
Boid.prototype.acceleration = function(){
  if (arguments.length == 0)
    return this.geo_data.acceleration.get_coord()
  this.geo_data.acceleration = arguments[0]
}

/**
 * @method  start
 *
 * Stamps the initial processing time.
 * 
 * @param  {Date} date
 */
Boid.prototype.start = function(date){ 
  this.last_time = this.current_time = date
}

/**
 * @method delta_t
 *
 * Ellapsed time since *last_time* was updated.
 * 
 * @return {Number} Number of seconds ellapsed.
 */
Boid.prototype.delta_t = function(){ 
   return (this.current_time.getTime() - this.last_time.getTime()) / 1000; 
}

/**
 * @method update_physics
 *
 * Calculates new position, velocity and acceleration depending on the ellapsed time.
 * @param  {Date} current_time Time for estimating coords.
 */
Boid.prototype.update_physics = function(current_time){
  this.last_time = this.current_time
  this.current_time = current_time
  this.geo_data.acceleration = this.requested_acceleration()
  this.geo_data.velocity = integrate(this.geo_data.velocity, this.geo_data.acceleration, this.delta_t() )
  this.geo_data.position = integrate(this.geo_data.position, this.geo_data.velocity, this.delta_t() )
}

Boid.prototype.run = function(current_time){
  if (!(current_time instanceof Date))
    return
  current_time = current_time || new Date()
  this.update_physics(current_time)
}

Boid.prototype.draw = function(ctx){

  var p = this.geo_data.position;
  var v = this.geo_data.velocity;
  var a = this.geo_data.acceleration;

  ctx.fillStyle = this.colour
  ctx.strokeStyle = "black"
  ctx.beginPath();
  ctx.arc(p.get_coord(0), p.get_coord(1), 10*escala, 0, Math.PI*2, true);      
  ctx.closePath();
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(p.get_coord(0), p.get_coord(1), 12*escala, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.stroke()

  if (this.focused){
    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.arc(p.get_coord(0), p.get_coord(1), 18*escala, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke()
  }
/*
  var placa_petri = new Image()
  if(escala == 0.5)
    placa_petri.src = "images/placa_petri_500.png"
  if(escala == 1)
    placa_petri.src = "images/placa_petri_1000.png"
  if(escala == 1.5)
    placa_petri.src = "images/placa_petri_1500.png"
  if(escala == 2)
    placa_petri.src = "images/placa_petri_2000.png"
  ctx.drawImage(placa_petri,0,0)
*/
  /* Speed */
  /*
  ctx.strokeStyle = "black"  
  ctx.beginPath();
  ctx.moveTo(p.get_coord(0), p.get_coord(1))
  ctx.lineTo(p.get_coord(0) + v.get_coord(0), p.get_coord(1) + v.get_coord(1))
  ctx.closePath();
  ctx.stroke()
  
  /* Acceleration */
  /*
  ctx.strokeStyle = "red"  
  ctx.beginPath();
  ctx.moveTo(p.get_coord(0), p.get_coord(1))
  ctx.lineTo(p.get_coord(0) + a.get_coord(0), p.get_coord(1) + a.get_coord(1))
  ctx.closePath();
  ctx.stroke()
  /*
  if (this.target && this.target != this){
  /* Displacement to target 
  ctx.beginPath();
  ctx.moveTo(p.get_coord(0), p.get_coord(1))
  ctx.lineTo(p.get_coord(0) + this.target_at().get_coord(0), p.get_coord(1) + this.target_at().get_coord(1))
  ctx.closePath();
  ctx.stroke()

  if (this.target != this){
    var p_target = this.target_data().position
  /*
    // Desired Velocity 
    ctx.strokeStyle = "black"  
    ctx.beginPath();
    ctx.moveTo(p.get_coord(0), p.get_coord(1))
    ctx.lineTo(p.get_coord(0) + this.desired_velocity().get_coord(0), p.get_coord(1) + this.desired_velocity().get_coord(1))
    ctx.closePath();
    ctx.stroke()
  
   
   // Approach distance
    ctx.strokeStyle = "black"
    ctx.beginPath();
    ctx.arc(p_target.get_coord(0), p_target.get_coord(1), this.approach_distance, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke();

    // Arrival distance
    var arrival_distance = this.target_at().module()
    if (this.approach_distance > arrival_distance ){
      ctx.strokeStyle = "red"
      ctx.beginPath();
      ctx.arc(p_target.get_coord(0), p_target.get_coord(1), arrival_distance, 0, Math.PI*2, true); 
      ctx.closePath();
      ctx.stroke();
    }
    
    }
  }
  */
}

/**
 * @method heading
 *
 * Gets the normal vector aligned with the heading.
 * 
 * @return {Vector}
 */
Boid.prototype.heading = function(){
  var _heading
  try{
    _heading = this.geo_data.velocity.unit() 
    this.last_heading = _heading || this.last_heading
  } catch(err){
    _heading = this.last_heading 
  }
  return _heading 
}

/**
 * @method locale
 *
 * The local coordinate system expressed in the global cs.
 * 
 * @return {Vector}
 */
Boid.prototype.locale = function(){  // The local coordinate system expressed in the global cs.
  var u = this.heading()
  if (isNaN(u.get_coord(0)) || isNaN(u.get_coord(1)))
    u = new Vector(1,0)
  var v = new Vector(-u.Coord[1], u.Coord[0])
  return [u,v]
}

/**
 * @method globale
 *
 * Expresses global cs (coordinate system) into lcs
 * 
 * @return {Vector}
 */
Boid.prototype.globale = function(){  
  var aux = this.heading()
  if (isNaN(aux.get_coord(0)) || isNaN(aux.get_coord(1)))
    aux = new Vector(1,0)
  var u = new Vector(aux.Coord[0], -aux.Coord[1])
  var v = new Vector(-u.Coord[1], u.Coord[0])
  return [u,v]
}

/**
 * @method localize
 *
 * Changes global coordinates into boid coordinates
 * 
 * @return {Vector}
 */
Boid.prototype.localize = function(){
  var v = new Vector(1,1,1)
  Vector.apply(v, arguments) // Create a Vector with whatever arguments that have been passed.
  var l = this.locale()
  return new Vector( l[0].dot(v), l[1].dot(v) )
}

/**
 * @method globalize
 *
 * Changes local coordinates into world (global) coordinates
 * 
 * @return {Vector}
 */
Boid.prototype.globalize = function(){
  var v = new Vector(1,1,1)
  Vector.apply(v, arguments) // Create a Vector with whatever arguments that have been passed.
  var l = this.globale()
  return new Vector( l[0].dot(v), l[1].dot(v) )
}

/**
 * @method visible_objects
 *
 * Ask the world if something is visible with my geo_data and vision abilities.
 * 
 * @return {boolean}
 */
Boid.prototype.visible_objects = function(){
  return this.my_world.visible_for(this.geo_data.position, this.vision)
}

/**
 * @method  requested_acceleration
 *
 * Answers to the world the acceleration requested (brain desired and body clipped)
 * 
 * @return {Vector}
 */
Boid.prototype.requested_acceleration = function(){
  return this.clip(this.brain.desired_acceleration())
}

/**
 * @method clip
 *
 * Clips acceleration according to the boid force limits.
 * 
 * @return {Vector}
 */
Boid.prototype.clip = function(){
  var v = new Vector(1,1,1)
  Vector.apply(v, arguments)
  v = this.localize(v)
  if (v.Coord[0] > this.force_limits.thrust)
    v.Coord[0] = this.force_limits.thrust
  if (v.Coord[0] < -this.force_limits.brake)
    v.Coord[0] = -this.force_limits.brake    
  if (v.Coord[1] > this.force_limits.steering)
    v.Coord[1] = this.force_limits.steering
  if (v.Coord[1] < -this.force_limits.steering)
    v.Coord[1] = -this.force_limits.steering    
  return this.globalize(new Vector(v.Coord[0], v.Coord[1])) // Ensure the module is correct
}

/**
 * @method set_target
 *
 * Targets a boid.
 * 
 * @param  {Boid} boid
 * @return {Boid} Returns the boid being
 */
Boid.prototype.set_target = function(boid){
  this.target = boid || new Boid({
                          position:      new Vector(1,1),
                          velocity:      new Vector(1,1),
                          acceleration:  new Vector(1,1)
      }, "red")
  return boid
}

Boid.prototype.target_data = function(){
  return this.target ? this.target.geo_data : null
}

function integrate(primitive, diff, delta){
  return primitive.add( diff.scale( delta ) )
}

 
/**
* @class Nanobot
*
* Creates a Nanobot, personal autonomous character. 
*
* @constructor Nanobot
*
* @param {Object} geo_data      Position, speed and acceleration
* @param {String} color         css color to paint nanobot 
* @param {Number} level_emotion Nanobot emotional level
* @param {number} wave_length   Audition wave_length
* @param {String} gender        Gender nanobot
*/
Nanobot.prototype = new Boid
Nanobot.prototype.constructor = Nanobot

function Nanobot(geo_data, color,level_emotion, wave_lenght, gender){
	var that = this

	function initialize(){
		that.level_emotion = level_emotion || 50
		that.wave_lenght = wave_lenght || 100
    that.wave_aux = 0
		that.gender = gender 
    that.talking = false
    that.is_listening = false
    that.array_frequency = []
    that.array_msg = []
    this.word_msg = ""
    that.replying = false
    this.word_reply = ""
    Boid.call(that, geo_data, color)
	}

	if(arguments.length)
		initialize()
}

/**
* @method audible_objects
*
* Ask the world if something is audible with my geo_data and wave length.
*
* @return {Array} The nanobots audibles
*/
Nanobot.prototype.audible_objects = function(){
  var audible_objects = []
    audible_objects = this.my_world.visible_for(this.geo_data.position, this.wave_lenght) 
    for(var i=0; i < audible_objects.length; i++){
      if(audible_objects[i] instanceof Speaker)
        audible_objects.splice(i, 1)
      if(audible_objects[i].id == this.id)  //--> Combinarlo con el if de arriba!!!!
        audible_objects.splice(i, 1)
  }
  return audible_objects
}

/**
* @method set_frequency
*
* Send frequency an array
*
* @param {Number} new_value The new value to save.
*/
Nanobot.prototype.set_frequency = function(new_value){
  if(new_value)
    this.array_frequency.push(new_value)
}

/**
* @method talk
*
* Nanobot speaks with their environment.
*
* @param {String} mssg Message to transmit.
*/
Nanobot.prototype.talk = function(mssg){
  this.talking = true
  this.word_msg = mssg
  var nanobots_listening = this.audible_objects()

  if(nanobots_listening.length > 0){
    for(var i=0; i<nanobots_listening.length; i++){
      var msg = { word: mssg , 
                  transmitter: this
                } 
      nanobots_listening[i].set_msg(msg)
    }
  }
}

/**
* @method set_msg
*
* Send a message an array.
*
* @param {String} new_msg Send the message to transmit.
*/
Nanobot.prototype.set_msg = function(new_msg){
  if(new_msg)
    this.array_msg.push(new_msg)
}

/**
* @method analyze_msg
*
* Analyze the message.
*/
Nanobot.prototype.analyze_msg = function(){
  if(this.array_msg.length > 0){
    switch (this.array_msg[0].word){
      case "hola":
        this.replying = true
        this.word_reply = "hola"
        break
      case "seguirme":
        this.replying = true
        this.word_reply = "voy"
        this.brain.activate('seek')
        this.brain.get_behavior('seek').set_target(this.array_msg[0].transmitter)
        break
      case "iros":
        this.replying = true
        this.word_reply = "vale"
        this.brain.activate('flee')
        this.brain.get_behavior('flee').set_target(this.array_msg[0].transmitter)
        break
    }
    this.array_msg.shift()
  }
}

/**
* @method analyze_sound
*
* Analyze the sound.
*/
Nanobot.prototype.analyze_sound = function(){
  if(this.array_frequency.length > 0)
    this.level_emotion += this.array_frequency.shift() 
}

/**
* @method listen
*
* Nanobot analyzy sounds and messages.
*/
Nanobot.prototype.listen = function(){
  this.analyze_sound()
  this.analyze_msg()
}

/**
* @method run
*
* Updates the time in the boid's variables
*
* @param {Date}   current_time Current time of the boid
*/
Nanobot.prototype.run = function(current_time){
  if (!(current_time instanceof Date))
    return
  current_time = current_time || new Date()
  this.update_physics(current_time)
  this.listen()
}

/**
* @method draw
*
* Draws a nanobot into the world defined by the context
*
* @param {Object} ctx Context in which to paint the Boid
*/
Nanobot.prototype.draw = function(ctx){
  var p = this.geo_data.position

  ctx.fillStyle = this.colour
  ctx.strokeStyle = "black"
  ctx.beginPath();
  ctx.arc(p.get_coord(0), p.get_coord(1), 10*escala, 0, Math.PI*2, true);      
  ctx.closePath();
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(p.get_coord(0), p.get_coord(1), 12*escala, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.stroke()

  ctx.fillStyle = "white"
  ctx.fillText(this.level_emotion, p.get_coord(0)-8, p.get_coord(1)+5);

  if (this.focused){
    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.arc(p.get_coord(0), p.get_coord(1), 18*escala, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke()
    ctx.strokeStyle = "black"
  }

  if(this.talking){
   //ctx.drawImage(this.msg_hello, p.get_coord(0)-10, p.get_coord(1)-45, 80, 50)
   ctx.font = "bold 15px ubuntu";
   ctx.fillStyle = "black"
   ctx.fillText(this.word_msg, p.get_coord(0)+5, p.get_coord(1)-15);

      ctx.beginPath();
    ctx.arc(p.get_coord(0), p.get_coord(1), this.wave_aux, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.stroke()
    if(this.wave_aux < this.wave_lenght)
      this.wave_aux+=20
    else{
      this.talking = false
      this.wave_aux = 0
    }
  }

  if(this.replying){
   ctx.font = "bold 15px ubuntu";
   ctx.fillStyle = "black"
   ctx.fillText(this.word_reply, p.get_coord(0)+5, p.get_coord(1)-15);
     if(this.wave_aux < this.wave_lenght)
       this.wave_aux+=20
     else{
       this.replying = false
       this.wave_aux = 0
     }
  }
}


/**
* @class Speaker
*
* Creates a Speaker. 
*
* @constructor Speaker
*
* @param {Object} geo_data      Position, speed and acceleration
* @param {number} wave_length   Audition wave_length
* @param {String} src           Image path
*/
Speaker.prototype = new Boid
Speaker.prototype.constructor = Speaker

function Speaker(geo_data, wave_lenght, src){
	var that = this
	function initialize(){
		that.image = new Image()
		that.image.src = src || "images/altavoz.png"
		that.wave_lenght = wave_lenght || 100
		that.wave_aux = 0
		that.this_on = false
		Boid.call(that, geo_data)
	}

	if(arguments.length)
		initialize()
}

/**
* @method on
*
* Turn on the speaker
*/
Speaker.prototype.on = function(){
	this.this_on = true
}

/**
* @method off
*
* Turn off the speaker
*/
Speaker.prototype.off = function(){
	this.this_on = false
}

/**
* @method volume_up
*
* Increase the volume of the speaker
*/
Speaker.prototype.volume_up = function(increase){
  this.wave_lenght += increase
}

/**
* @method volume_down
*
* Decrement the volume of the speaker
*
*/
Speaker.prototype.volume_down = function(decrement){
  this.wave_lenght -= decrement
}

/**
* @method get_wave_lenght
*
* Returns wave length
*/
Speaker.prototype.get_wave_lenght = function(){
	return this.wave_lenght * escala
}

/**
* @method get_frequency_music
*
* Returns frequency music
*/
Speaker.prototype.get_frequency_music = function(){
	return 1
}

/**
* @method audible_objects
*
* Ask the world if something is audible with my geo_data and wave length.
*
* @return {Array} The nanobots audibles
*/
Speaker.prototype.audible_objects = function(){
  var audible_objects = []
  if(this.this_on){
    audible_objects = this.my_world.visible_for(this.geo_data.position, this.wave_lenght) 
    for(var i=0; i < audible_objects.length; i++){
     if(audible_objects[i] instanceof Speaker)
        audible_objects.splice(i, 1)
    }
  }
  return audible_objects
}

/**
* @method nanobot_is_listening
*
* description
*/
Speaker.prototype.nanobot_is_listening = function(){
  var array_boids = this.audible_objects()
  for(var i=0; i<array_boids.length; i++){
    if(array_boids[i].level_emotion) //--> Mejorar esta linea!!!
      array_boids[i].set_frequency(this.get_frequency_music()) 
  }
}

/**
* @method run
*
* Updates the time in the boid's variables
*
* @param {Date}   current_time Current time of the boid
*/
Speaker.prototype.run = function(current_time){
  if (!(current_time instanceof Date))
    return
  current_time = current_time || new Date()
  this.update_physics(current_time)
  this.nanobot_is_listening()
}

/**
* @method draw
*
* Draws a nanobot into the world defined by the context
*
* @param {Object} ctx Context in which to paint the Boid
*/
Speaker.prototype.draw = function(ctx){
	var p = this.geo_data.position
	var image_size = 35
	ctx.drawImage(this.image, p.get_coord(0)-(image_size/2)*escala, p.get_coord(1)-(image_size/2)*escala, image_size*escala, image_size*escala)
	if(this.this_on == true){
  		ctx.beginPath();
 		ctx.arc(p.get_coord(0), p.get_coord(1), this.wave_aux, 0, Math.PI*2, true);
  		ctx.closePath();
  		ctx.stroke()
  	if(this.wave_aux < this.wave_lenght)
  		this.wave_aux+=20
  	else
  		this.wave_aux = 0
  	}
  if (this.focused){
    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.arc(p.get_coord(0), p.get_coord(1), 22*escala, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke()
    ctx.strokeStyle = "black"
  }
}