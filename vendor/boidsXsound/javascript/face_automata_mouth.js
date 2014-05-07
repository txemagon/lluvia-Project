FaceAutomataMouth.prototype = new ThreadAutomata
FaceAutomataMouth.prototype.constructor = new FaceAutomataMouth

function FaceAutomataMouth(processor, gate) {
	var that = this
	this.now = new Date()
	this.before = new Date()
	this.level_emotion = 0
	var state = this.state = new Enumeration("start_effect", "closed", "sleep")
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
					this.currentState.requested = this.state.closed	
					;
				},
				function(){
					;
				}
			],
			/* closed */	
			[
				function(){
					;
				},
				function(){
					this.draw_mouth()
					;
				},
				function(){
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

FaceAutomataMouth.prototype.draw_mouth = function(){
	if(this.level_emotion.level_emotion > 51){
		this.draw_mouth_smiley()
	}
	else{
		this.draw_mouth_closed()
	}
}

FaceAutomataMouth.prototype.draw_mouth_closed = function(){
	cxt.beginPath();
	cxt.moveTo(47,110)
	cxt.lineTo(103,110);
	cxt.stroke();
}

FaceAutomataMouth.prototype.draw_mouth_smiley = function(){
	cxt.beginPath();
	cxt.moveTo(47,110)
	cxt.fillText("smiley", 25, 70);
}

FaceAutomataMouth.prototype.set_actual_boid = function(actual_boid){
	this.level_emotion = actual_boid
}