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
		that.wave_lenght = wave_lenght || 300
		that.wave_aux = 0
		that.this_on = false
    that.array_frequency = []
    that.frequency = 0
		Boid.call(that, geo_data)
    that.monitor = new Monitor()
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
  this.monitor.playSound()
}

/**
* @method off
*
* Turn off the speaker
*/
Speaker.prototype.off = function(){
	this.this_on = false
  this.monitor.stopSound()
}

/**
* @method volume_up
*
* Increase the volume of the speaker
*/
Speaker.prototype.volume_up = function(increase){
  this.wave_lenght += increase
  this.monitor.changeVolumen(1)
}

/**
* @method volume_down
*
* Decrement the volume of the speaker
*
*/
Speaker.prototype.volume_down = function(decrement){
  this.wave_lenght -= decrement
  this.monitor.changeVolumen(5)
}

Speaker.prototype.nextTrack = function(decrement){
  this.monitor.next()
}

Speaker.prototype.previousTrack = function(decrement){
  this.monitor.previous()
}

/**
* @method get_wave_lenght
*
* Returns wave length
*/
Speaker.prototype.get_wave_lenght = function(){
	return this.wave_lenght
}

/**
* @method set_frequency_music
*
* Set frequency music
*/
Speaker.prototype.set_frequency_music = function(new_value){
  this.frequency = new_value
  //var new_frequency = Math.log(new_value/1000)/10
  //this.array_frequency.push(new_frequency)


  /*
  var new_frequency = Math.log(new_value/1000)/10
  var media = 0
  this.array_frequency.push(new_frequency)
  for(var i=0; i<this.array_frequency.length; i++){
    media += this.array_frequency[i]
  }

  media = media / this.array_frequency.length

  //this.frequency = new_frequency
*/
}

/**
* @method get_frequency_music
*
* Returns frequency music
*/
Speaker.prototype.get_frequency_music = function(){ // cambiar para que si llega a un numero muy alto limpiarlo
/*  var media = 0
  for(var i=0; i<this.array_frequency.length; i++){
    media += this.array_frequency[i]
  }
  media = media / this.array_frequency.length
*/

  //return Math.log(this.frequency/1000)/10
  return this.frequency
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
    audible_objects = this.my_world.audible_for(this.geo_data.position, this.wave_lenght) 
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
  if(ff)
    this.set_frequency_music(ff)
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
	ctx.drawImage(this.image, p.get_coord(0)-(image_size/2), p.get_coord(1)-(image_size/2), image_size, image_size)
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
    ctx.arc(p.get_coord(0), p.get_coord(1), 22, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke()
    ctx.strokeStyle = "black"
  }
}