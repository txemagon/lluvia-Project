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

 




 Nanobot.prototype = new Boid
 Nanobot.prototype.constructor = Nanobot



function Nanobot(geo_data, color,level_emotion, wave_lenght, image, gender){
	var that = this

	function initialize(){
		that.level_emotion = level_emotion || 50
		that.wave_lenght = wave_lenght || 100
		that.image = image
		that.gender = gender 
    that.talking = false
		Boid.call(that, geo_data, color)
    that.msg_hello = new Image()
    that.msg_hello.src = "images/hola_vectorial.svg"

    that.is_listening = false
    that.array_frequency = []
	}

	if(arguments.length)
		initialize()
}

Nanobot.prototype.talk = function(mssg){
  this.talking = true


}

Nanobot.prototype.listen = function(){
  //that.is_listening = true

}
// 1- En speaker ver quien puede escuchar al altavoz --> HECHO
//    1.2- Cuidado si el que escucha es otro speaker(sacarlo del array) --> HECHO
// 2- Mandar al nanobot la frecuencia aun array de frecuancias para que los vaya analizando cuando pueda -->HECHO
// 3- En nanobot analizar lo escuchado --> HECHO
//    3.2- Tanto el nanobot como el speaker deben estar escuchando todo el rato
// 4º) Comprobar que puede escuchar al mismo tiempo de diferentes fuentes de sonido

/*
Nanobot.prototype.audible_objects = function(){
	return this.my_world.visible_for(this.geo_data.position, this.wave_lenght)
}

Nanobot.prototype.run = function(current_time){
  if (!(current_time instanceof Date))
    return
  current_time = current_time || new Date()
  this.update_physics(current_time)
  this.update_behavior()
}

Nanobot.prototype.analyze_sound = function(){
	var a = this.audible_objects()
	var result = 0
	for(var i=0; i<a.length; i++){
		if(i != a.length-1 )                             //<---- El error de que desaparezcan los boids esta aqui
			result += a[i].get_frequency()
	}
	
	return 	result/a.length	
}

Nanobot.prototype.get_state = function(){
	return this.level_emotion
}

Nanobot.prototype.change_state = function(){
	this.level_emotion += this.analyze_sound()
}

Nanobot.prototype.update_behavior = function(){
	this.change_state()
	if(this.level_emotion > 60){
			this.brain.activate('seek')
 			this.brain.get_behavior('seek').set_target()
	}
}
*/

Nanobot.prototype.get_frequency = function(new_value){
  if(new_value)
    this.array_frequency.push(new_value)
  
}

Nanobot.prototype.analyze_sound = function(){
 // alert(this.array_frequency.length
  if(this.array_frequency.length > 0)
    this.level_emotion += this.array_frequency.shift() 
}

Nanobot.prototype.run = function(current_time){
  if (!(current_time instanceof Date))
    return
  current_time = current_time || new Date()
  this.update_physics(current_time)
 // this.get_frequency()
  this.analyze_sound()
}


Nanobot.prototype.stop = function(){

}

Nanobot.prototype.set_instructions = function(){

}

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
  ctx.fillText("hola", p.get_coord(0)+5, p.get_coord(1)-15);
  }

}




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

Speaker.prototype.on = function(){
	this.this_on = true
}

Speaker.prototype.off = function(){
	this.this_on = false
}

Speaker.prototype.subir_volumen = function(increase){
  this.wave_lenght += increase
}

Speaker.prototype.bajar_volumen = function(decrement){
  this.wave_lenght -= decrement
}

Speaker.prototype.get_wave_lenght = function(){
	return this.wave_lenght * escala
}

Speaker.prototype.get_frequency_music = function(){
	return 1
}

// CAmbiar nombre 
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

Speaker.prototype.nanobot_is_listening = function(){
  var array_boids = this.audible_objects()
  for(var i=0; i<array_boids.length; i++){
    array_boids[i].get_frequency(this.get_frequency_music()) 
  }
}

Speaker.prototype.run = function(current_time){
  if (!(current_time instanceof Date))
    return
  current_time = current_time || new Date()
  this.update_physics(current_time)
  this.nanobot_is_listening()
}

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
  }
}