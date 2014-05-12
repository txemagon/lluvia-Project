FaceAutomataMouth.prototype = new ThreadAutomata
FaceAutomataMouth.prototype.constructor = new FaceAutomataMouth

function FaceAutomataMouth(processor, gate) {
	var that = this
	this.now = new Date()
	this.before = new Date()
	this.actual_boid = 0
	var state = this.state = new Enumeration("start_effect", "normal", "happy", "sleep")
	this.currentState = { previous: state.sleep,
						  current: state.sleep,
						  requested: state.sleep }

		this.solicitors = [
			/* start_effect */
			[
				function(){
					;
				},
				function(){
					this.currentState.requested = this.state.normal	
					;
				},
				function(){
					;
				}
			],
			/* normal */	
			[
				function(){
					this.draw_mouth_normal()
					;
				},
				function(){
					this.change_state()
					;
				},
				function(){
					this.erase_mouth_normal()
					;
				}
			],
			/* happy */	
			[
				function(){
					this.draw_mouth_smiley()
					;
				},
				function(){
					this.change_state()
					;
				},
				function(){
					this.erase_mouth_smiley()
					;
				}
			],
			/* sleep */
			[
				function(){
					;
				},
				function(){
					;
				},
				function(){
					;
				}
			],
		]

    function initialize(){
    	that.gate = gate
		try{
			if(that.state){
				ThreadAutomata.call(that, that.state, that.currentState, that.solicitors, processor)
			}
		}catch(e){
			alert("No event handlers were found.\nException: " + e.toSource())
		}
    }

    if (arguments.length)
        initialize()
}


FaceAutomataMouth.prototype.change_state = function(){
	var level = this.actual_boid.level_emotion

	if(level<33){
		this.currentState.requested = this.state.happy
	}
	if(level>33 && level<66)
		this.currentState.requested = this.state.normal
}

FaceAutomataMouth.prototype.draw_mouth_normal = function(){
	cxt.beginPath();
	cxt.moveTo(47,110)
	cxt.lineTo(103,110);
	cxt.stroke();
}

FaceAutomataMouth.prototype.erase_mouth_normal = function(){
	cxt.strokeStyle = 'white'
	cxt.beginPath();
	cxt.moveTo(47,110)
	cxt.lineTo(103,110);
	cxt.stroke();
	cxt.strokeStyle = 'black'
}

FaceAutomataMouth.prototype.draw_mouth_smiley = function(){
	cxt.lineWidth = 1
	cxt.beginPath()
	cxt.moveTo(47,100)
	cxt.lineTo(103,100)
	cxt.quadraticCurveTo(103,125,75,125)
	cxt.quadraticCurveTo(47,125,47,100)
	cxt.stroke();
}


FaceAutomataMouth.prototype.erase_mouth_smiley = function(){
	cxt.strokeStyle = 'white'
	cxt.lineWidth = 2
	cxt.beginPath()
	cxt.moveTo(47,100)
	cxt.lineTo(103,100)
	cxt.quadraticCurveTo(103,125,75,125)
	cxt.quadraticCurveTo(47,125,47,100)
	cxt.stroke();
	cxt.lineWidth = 1
	cxt.strokeStyle = 'black'
}

FaceAutomataMouth.prototype.set_actual_boid = function(actual_boid){
	this.actual_boid = actual_boid
}