FaceAutomataMessage.prototype = new ThreadAutomata
FaceAutomataMessage.prototype.constructor = new FaceAutomataMessage

function FaceAutomataMessage(processor, gate) {
	var that = this
	var timer = 0
	this.now = new Date()
	this.before = new Date()
	this.level_emotion = 0
	var state = this.state = new Enumeration("start_effect", "show_message","sleep")
	this.currentState = { previous: state.start_effect,
						  current: state.start_effect,
						  requested: state.start_effect }

		this.solicitors = [
			/* start_effect */
			[
				function(){
					;
				},
				function(){
					this.currentState.requested = this.state.show_message	
					;
				},
				function(){
					;
				}
			],
			/* show_message */
			[
				function(){
					this.draw_message()	

					;
				},
				function(){
					;
				},
				function(){
					;
				}
			],
			/* sleep */
			[
				function(){
					this.erase_message()
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

FaceAutomataMessage.prototype.draw_message = function(){
		cxt.beginPath();
	cxt.arc(75, 75 ,74 , 0, Math.PI*2, false); 
	cxt.stroke();
	cxt.font = '25px sans-serif';
	cxt.fillText("Select a", 25, 70);
	cxt.fillText("nanobot", 23, 95);
}

FaceAutomataMessage.prototype.erase_message = function(){
	// cxt.fillStyle="white";
	// cxt.fillRect(0,0, 150,150);
	cxt.fillStyle="white";
	cxt.beginPath();
	cxt.arc(75, 75 ,73 , 0, Math.PI*2, false); 
	cxt.fill();
	cxt.fillStyle="black";
}

FaceAutomataMessage.prototype.set_level_emotion = function(level_emotion){
	this.level_emotion = level_emotion
}




