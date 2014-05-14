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
    audible_objects = this.my_world.audible_for(this.geo_data.position, this.wave_lenght)
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
        this.level_emotion -= 20
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
  if(this.array_frequency.length > 0){
    if(this.level_emotion < 100 || this.array_frequency[0] < 0)
      this.level_emotion += this.array_frequency.shift()
    else if(this.level_emotion >= 100 && this.array_frequency[0] > 0){
      this.array_frequency.shift()
    }
  }
  else if(this.level_emotion >= 0.0){
    this.level_emotion -= 0.1
  }
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
  var hue = (this.level_emotion * 2.4)+120

  var p = this.geo_data.position
  var a = 'hsl(' + hue + ', 100%, 36%)';
  ctx.fillStyle = a
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
  ctx.fillText(Math.round(this.level_emotion), p.get_coord(0)-7, p.get_coord(1)+5);

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