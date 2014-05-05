FaceAutomataEyes.prototype = new ThreadAutomata
FaceAutomataEyes.prototype.constructor = new FaceAutomataEyes

function FaceAutomataEyes(processor, gate) {
	var that = this
	var timer = 0
	this.now = new Date()
	this.before = new Date()
	this.level_emotion = 0
	var state = this.state = new Enumeration("start_effect","open", "close","sleep")
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
					this.currentState.requested = this.state.open	
					;
				},
				function(){
					;
				}
			],
			/* open */	
			[
				function(){
					t = 0
					this.draw_eyes_open()
					;
				},
				function(){
					t++
					if(t == 60)
						this.currentState.requested = this.state.close	
					;
				},
				function(){
					this.erase_eyes_open()
					;
				}
			],
			/* close */ 
			[
				function(){
					t = 0
					this.draw_eyes_close()
					;
				},
				function (){
					t++
					if(t == 3)
						this.currentState.requested = this.state.open
					;
				},
				function(){
					this.erase_eyes_close()
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

FaceAutomataEyes.prototype.set_level_emotion = function(level_emotion){
	this.level_emotion = level_emotion
}


// No funciona!!!!!!!
FaceAutomataEyes.prototype.sleep = function(milliseconds){
	var time_limit = this.now.getTime() + milliseconds
	while(this.now.getTime() <= time_limit){}
}


FaceAutomataEyes.prototype.draw_eyes_open = function(){
	cxt.beginPath();
	cxt.arc(55, 75 ,8 , 0, Math.PI*2, false); 
	cxt.arc(95, 75 ,8 , 0, Math.PI*2, false); 
	cxt.fill();
}

FaceAutomataEyes.prototype.draw_eyes_close = function(){
	cxt.beginPath();
	cxt.moveTo(48, 75)
	cxt.lineTo(62, 75)

	cxt.moveTo(88, 75)
	cxt.lineTo(102, 75)
	cxt.stroke();
}

FaceAutomataEyes.prototype.erase_eyes_close = function(){
	cxt.strokeStyle = 'white'
	cxt.beginPath();
	cxt.moveTo(48, 75)
	cxt.lineTo(62, 75)

	cxt.moveTo(88, 75)
	cxt.lineTo(102, 75)
	cxt.stroke();
	cxt.strokeStyle = 'black'
}

FaceAutomataEyes.prototype.erase_eyes_open = function(){
	cxt.fillStyle = 'white'
	cxt.beginPath();
	cxt.arc(55, 75 ,9 , 0, Math.PI*2, false); 
	cxt.arc(95, 75 ,9 , 0, Math.PI*2, false); 
	cxt.fill();
	cxt.fillStyle = 'black'
}