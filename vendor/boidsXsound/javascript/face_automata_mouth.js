FaceAutomataMouth.prototype = new ThreadAutomata
FaceAutomataMouth.prototype.constructor = new FaceAutomataMouth

function FaceAutomataMouth(processor, gate) {
	var that = this
	this.now = new Date()
	this.before = new Date()
	this.actual_boid = 0
	var state = this.state = new Enumeration("start_effect", "normal", "happy", "angry", "sleep")
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
					
					;
				},
				function(){
					this.zoom_nanobot()
					;
				},
				function(){
					
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
			/* angry */	
			[
				function(){
					this.draw_mouth_angry()
					;
				},
				function(){
					this.change_state()
					;
				},
				function(){
					this.erase_mouth_angry()
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

FaceAutomataMouth.prototype.zoom_nanobot = function(){
	var hue = (this.actual_boid.level_emotion * 2.4)+120
	var c = 'hsl(' + hue + ', 100%, 36%)'
	var a = this.actual_boid.geo_data.acceleration
	var v = this.actual_boid.geo_data.velocity

	cxt.fillStyle = "white"
	cxt.beginPath();
	cxt.arc(75, 75, 75, 0, Math.PI*2, true);      
	cxt.closePath();
	cxt.fill();


	cxt.beginPath();
	cxt.arc(75, 75 ,74 , 0, Math.PI*2, false); 
	cxt.stroke();

	cxt.fillStyle = c
	cxt.beginPath();
	cxt.arc(75, 75, 20, 0, Math.PI*2, true);      
	cxt.closePath();
	cxt.fill();

	cxt.strokeStyle = "black"
	cxt.beginPath()
	cxt.arc(75, 75, 27, 0, Math.PI*2, true);      
	cxt.closePath();
	cxt.stroke();

	cxt.lineWidth = 3;
	cxt.strokeStyle = "red"
    cxt.beginPath();
    cxt.moveTo(75, 75)
    cxt.lineTo(75 + a.get_coord(0), 75 + a.get_coord(1))
    cxt.closePath();
    cxt.stroke()

    cxt.strokeStyle = "black"
    cxt.beginPath();
    cxt.moveTo(75, 75)
    cxt.lineTo(75 + v.get_coord(0), 75 + v.get_coord(1))
    cxt.stroke();
    cxt.lineWidth = 2;
}


FaceAutomataMouth.prototype.change_state = function(){
	var level = this.actual_boid.level_emotion

	if(level<33)
		this.currentState.requested = this.state.happy
	if(level>33 && level<66)
		this.currentState.requested = this.state.normal
	if(level>66)
		this.currentState.requested = this.state.angry
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

FaceAutomataMouth.prototype.draw_mouth_angry = function(){
	cxt.lineWidth = 1
	cxt.beginPath()
	cxt.moveTo(47,110)
	cxt.quadraticCurveTo(75,90,103,105)
	cxt.stroke();
}

FaceAutomataMouth.prototype.erase_mouth_angry = function(){
	cxt.strokeStyle = 'white'
	cxt.lineWidth = 3
	cxt.beginPath()
	cxt.moveTo(47,110)
	cxt.quadraticCurveTo(75,90,103,105)
	cxt.stroke();
	cxt.lineWidth = 1
	cxt.strokeStyle = 'black'
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