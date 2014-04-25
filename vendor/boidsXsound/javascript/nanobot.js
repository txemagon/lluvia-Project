Nanobot.prototype = new Boid
Nanobot.prototype.constructor = new Nanobot
Nanobot.prototype.super = Boid

function Nanobot(level_emotion, wave_lenght, image, gender){
	var that = this

	function initialize(){
		that.level_emotion = level_emotion || 50
		that.wave_lenght = wave_lenght || that.vision
		that.image = image
		that.gender = gender 
	}

	if(arguments.length)
		initialize()
}

Nanobot.prototype.talk = function(){

}

Nanobot.prototype.listen = function(){

}

Nanobot.prototype.get_state = function(){

}

Nanobot.prototype.change_state = function(){

}

Nanobot.prototype.stop = function(){

}

Nanobot.prototype.get_instructions = function(){

}
