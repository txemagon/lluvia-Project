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
    Boid.call(that, geo_data, color)
    that.level_emotion = level_emotion || 50
    that.wave_lenght = wave_lenght || 100
    that.wave_aux = 0
    that.gender = gender 
    that.talking = false
    that.is_listening = false
    that.array_frequency = []
    that.array_msg = []
    that.word_msg = ""
    that.replying = false
    that.word_reply = ""
    that.visible_object = []
/*
    that.head = that
    that.body = []
    that.create_body()
*/
	}

	if(arguments.length)
		initialize()
}

/*
Nanobot.prototype.create_body = function(){
  for(var i=0; i<5; i++){
    var body_part = { position: this.geo_data.position, last_position: this.geo_data.position}
    this.body.push(body_part)
  }
}

Nanobot.prototype.update_body = function(){
  this.body[this.body.length-1].position = this.geo_data.position

  var aux_body = this.body.pop()
  this.body.unshift(aux_body)
}
*/

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
      case "hello": 
        var replys = ["hello", "hi", "what's up", "how are you", "nice to meet you"]
        this.replying = true
        this.word_reply = replys[Math.floor(Math.random() * replys.length)]
        this.level_emotion -= 5
        break
      case "2+2=4":
        var replys = ["oooh", "you are so smart", "genius!!", "witchcraft!!"]           // 2+2=4; oooh, your are so smart
        this.replying = true
        this.word_reply = replys[Math.floor(Math.random() * replys.length)]
        this.level_emotion -= 15
        break
      case "joke": //==> Why did the boy bury his flashligth? because the baterries were dead; jajaja, :), it's funny!
        var replys = ["jajaja", ":)", "it's funny!"]
        this.replying = true
        this.word_reply = replys[Math.floor(Math.random() * replys.length)]
        this.level_emotion -= 50
        break
      case "bu!!!":  
        var replys = ["¡Ahh!", "What a shock!", "huy", "oh"]        
        this.replying = true
        this.word_reply = replys[Math.floor(Math.random() * replys.length)]
        this.level_emotion += 15
        break
      case "idiot": //==> Idiot,
        var replys = ["not you!!", ":(", "Why?", "joo"]           
        this.replying = true
        this.word_reply = replys[Math.floor(Math.random() * replys.length)]
        this.level_emotion += 30
        break
      case "i kill you!":  //==> I kill you!! 
        var replys = ["No please!!", "Nooo", "Help!"]        
        this.replying = true
        this.word_reply = replys[Math.floor(Math.random() * replys.length)]
        this.level_emotion += 100
        break



      case "seguirme":
        this.replying = true
        this.word_reply = "voy"
        this.brain.activate('seek',this.array_msg[0].transmitter)
        //this.brain.get_behavior('seek').set_target(this.array_msg[0].transmitter)
        break
      case "iros":
        this.replying = true
        this.word_reply = "vale"
        this.brain.activate('flee', this.array_msg[0].transmitter)
        //this.brain.get_behavior('flee').set_target(this.array_msg[0].transmitter)
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
Nanobot.prototype.analyze_sound = function(){ // Mirar esta parte xq despues de las ultimas cuatro lineas no hace falta las mitad de las cosas
  var baremo = 3000

  if(this.array_frequency.length > 0){
    if(this.level_emotion < 100 || this.array_frequency[0] < 0){
      if(this.array_frequency[0] >= baremo){
        this.level_emotion += 0.1
        this.array_frequency.shift()
      }
      else{
        this.level_emotion -= 0.1
        this.array_frequency.shift()
      }
    }
    else if(this.level_emotion >= 100 && this.array_frequency[0] > 0){
      this.array_frequency.length = 0
    }
  }
  else if(this.level_emotion >= 50.0){
    this.level_emotion -= 0.1
  }else if(this.level_emotion < 50.0)
    this.level_emotion += 0.1

  if(this.level_emotion < 0)
    this.level_emotion = 0

}

Nanobot.prototype.analyze_level_emotion = function(){
  var stress = this.level_emotion/100
  if(this.level_emotion > 80){
    this.vision.angle = 50

  }


  if(this.level_emotion > 40 && this.level_emotion < 90){
    this.vision.angle = 0.5
  }


  if(this.level_emotion < 40){
    this.vision.angle = 0.1
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
  this.analyze_level_emotion()
}

Nanobot.prototype.infinity_move = function (){
  if(this.geo_data.position.get_coord(1) > 412)
    this.geo_data.position.Coord[1] = -12
  if(this.geo_data.position.get_coord(1) < -12)
    this.geo_data.position.Coord[1] = 412
  if(this.geo_data.position.get_coord(0) > 562)
    this.geo_data.position.Coord[0] = -12
  if(this.geo_data.position.get_coord(0) < -12)
    this.geo_data.position.Coord[0] = 562
   
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
  this.infinity_move()
  //this.update_body()
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
  var v = this.geo_data.velocity
  var a = this.geo_data.acceleration;
  var c = 'hsl(' + hue + ', 100%, 36%)';
  ctx.fillStyle = c
  ctx.strokeStyle = "black"
  ctx.beginPath();
  ctx.arc(p.get_coord(0), p.get_coord(1), 5, 0, Math.PI*2, true);      
  ctx.closePath();
  ctx.fill();

/*  
  // Pintar cuerpo
  var b = this.body
  ctx.fillStyle = a
  ctx.strokeStyle = "black"
  ctx.beginPath();
  for(var i=0; i<this.body.length; i++){
    ctx.arc(b[i].position.get_coord(0), b[i].position.get_coord(1), 10, 0, Math.PI*2, true);     
  }
  ctx.closePath();
  ctx.fill();  
  // Fin pintar cuerpo
*/



  ctx.beginPath();
  ctx.arc(p.get_coord(0), p.get_coord(1), 7, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.stroke()

//  ctx.fillStyle = "white"
//  ctx.fillText(Math.round(this.level_emotion), p.get_coord(0)-7, p.get_coord(1)+5);

  if (this.focused){
/*Angle vision*/
    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.moveTo(p.get_coord(0), p.get_coord(1))

    var a0 = -this.heading().angle(1,0)
    //var a0 = p.get_coord(0)/p.module()
    ctx.arc(p.get_coord(0), p.get_coord(1), this.vision.radius + a0, -this.vision.angle - a0 , this.vision.angle - a0); 
    ctx.closePath();
      ctx.stroke();
      
/*
    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.arc(p.get_coord(0), p.get_coord(1), 11, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke()

*/
    /* Acceleration */
    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.moveTo(p.get_coord(0), p.get_coord(1))
    ctx.lineTo(p.get_coord(0) + a.get_coord(0), p.get_coord(1) + a.get_coord(1))
    ctx.closePath();
    ctx.stroke()

    ctx.strokeStyle = "black"

     ctx.beginPath();
     ctx.moveTo(p.get_coord(0), p.get_coord(1))
     ctx.lineTo(p.get_coord(0) + v.get_coord(0), p.get_coord(1) + v.get_coord(1))

      // set line color
      ctx.stroke();
  }

  if(this.talking){
   ctx.font = "bold 15px ubuntu";
   ctx.fillStyle = "black"
   ctx.fillText(this.word_msg, p.get_coord(0)+5, p.get_coord(1)-15);

      ctx.beginPath();
    ctx.arc(p.get_coord(0), p.get_coord(1), this.wave_aux, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.stroke()
    if(this.wave_aux < this.wave_lenght)
      this.wave_aux+=10

    else{
      this.talking = false
      this.wave_aux = 0
    }
  }

  if(this.replying){
    if(this.wave_aux>50){
      ctx.font = "bold 15px ubuntu";
      ctx.fillStyle = "black"
      ctx.fillText(this.word_reply, p.get_coord(0)+5, p.get_coord(1)-15)
    }
     if(this.wave_aux < this.wave_lenght*1.5){
       this.wave_aux+=5
      }
     else{
       this.replying = false
       this.wave_aux = 0
     }
  }
}