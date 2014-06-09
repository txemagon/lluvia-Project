FaceBoid.prototype = new Gate
FaceBoid.prototype.constructor = FaceBoid

function FaceBoid(element){
	var that = this
	this.name = element

	function initialize(){
		try{
			if(element){
				that.element = element
				that[element] = {}
				Gate.call(that, element)
				that[element].face_automata_message = that.new_effect(new FaceAutomataMessage(that.device, that))
				//that[element].face_automata_eyes    = that.new_effect(new FaceAutomataEyes(that.device, that))
				//that[element].face_automata_outline = that.new_effect(new FaceAutomataOutline(that.device, that))
				//that[element].face_automata_mouth   = that.new_effect(new FaceAutomataMouth(that.device, that))
				//that[element].face_automata_wifi    = that.new_effect(new FaceAutomataWifi(that.device, that))
			}
		} catch(e){
				if ($K_debug_level >= $KC_dl.DEVELOPER)
					alert("No event handlers were found.\nException: " + e.toSource())
		}
	}

	if(arguments.length)
		initialize()
}

FaceBoid.prototype.init_animation = function(actual_boid){
	//alert(this[this.element])
	//alert(this[this.element].toSource())
	this.set_actual_boid(actual_boid)
	//this.menu_effects[this.menu_effects.element].menu_automata.currentState.requested = this.menu_effects[this.menu_effects.element].menu_automata.state.out
	//this[this.element].face_automata_message.currentState.requested = this[this.element].face_automata_message.state.sleep
	//this[this.element].face_automata_eyes.currentState.requested    = this[this.element].face_automata_eyes.state.start_effect
	//this[this.element].face_automata_outline.currentState.requested = this[this.element].face_automata_outline.state.start_effect
	//this[this.element].face_automata_mouth.currentState.requested   = this[this.element].face_automata_mouth.state.start_effect
	//this[this.element].face_automata_wifi.currentState.requested    = this[this.element].face_automata_wifi.state.start_effect
}

FaceBoid.prototype.finish_animation = function(){
	//this[this.element].face_automata_message.currentState.requested = this[this.element].face_automata_message.state.start_effect
	//this[this.element].face_automata_eyes.currentState.requested    = this[this.element].face_automata_eyes.state.sleep
	//this[this.element].face_automata_outline.currentState.requested = this[this.element].face_automata_outline.state.sleep
	//this[this.element].face_automata_mouth.currentState.requested   = this[this.element].face_automata_mouth.state.sleep
	//this[this.element].face_automata_wifi.currentState.requested    = this[this.element].face_automata_wifi.state.sleep
}
// Mejorar!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
FaceBoid.prototype.set_actual_boid = function(actual_boid){
	// this[this.element].face_automata_message.set_level_emotion(level_emotion)
	// this[this.element].face_automata_eyes.set_level_emotion(level_emotion)
	// this[this.element].face_automata_outline.set_level_emotion(level_emotion)
	try{
	//	this[this.element].face_automata_mouth.set_actual_boid(actual_boid)
	} catch(e){
		//alert( "pepe")
	}
	// this[this.element].face_automata_wifi.set_level_emotion(level_emotion)
}

