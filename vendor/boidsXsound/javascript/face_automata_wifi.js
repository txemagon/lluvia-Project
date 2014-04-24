FaceAutomataWifi.prototype = new ThreadAutomata
FaceAutomataWifi.prototype.constructor = new FaceAutomataWifi

function FaceAutomataWifi(processor, gate) {
	var that = this
	var time = 0
	this.now = new Date()
	this.before = new Date()
	this.ghost_opacity = 0
	var state = this.state = new Enumeration("waves_state1", "waves_state2", "waves_state3", "waves_state4", "expected")
	this.currentState = { previous: state.expected,
						  current: state.expected,
						  requested: state.expected }

		this.solicitors = [
			/* waves_state1 */	
			[
				function(){
					time = 0

					this.draw_wave_small()
					;
				},
				function(){
					time++
					if(time == 3)
						this.currentState.requested = this.state.waves_state2	
					;
				},
				function(){
					this.erase_wave_small()
					;
				}
			],
			/* waves_state2 */ 
			[
				function(){
					time = 0

					this.draw_wave_small()
					this.draw_wave_medium()
					;
				},
				function (){
					time++
					if(time == 3)
						this.currentState.requested = this.state.waves_state3	
					;
				},
				function(){
					this.erase_wave_small()
					//this.erase_wave_medium()
					;
				}
			],
			/* waves_state3 */
			[
				function(){
					time = 0

					this.draw_wave_medium()
					this.draw_wave_big()
					;
				},
				function(){
					time++
					if(time == 3)
						this.currentState.requested = this.state.waves_state4
					;
				},
				function(){
					this.erase_wave_medium()
					;
				}
			],
			/* waves_state4 */ 
			[
				function(){
					time = 0
					;
				},
				function(){
					time++
					if(time == 3)
						this.currentState.requested = this.state.expected
					;
				},
				function(){
					this.erase_wave_big()
					;
				}
			],
			/* expected */ 
			[
				function(){
					;
				},
				function(){
					time++
					if(time == 100)
						this.currentState.requested = this.state.waves_state1
					;
				},
				function(){
					;
				}
			]
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

FaceAutomataWifi.prototype.draw_wave_small = function(){
	cxt.beginPath();
	cxt.lineWidth = 1;
	cxt.moveTo(70,24)
	cxt.quadraticCurveTo(75, 19, 80, 24);
	cxt.stroke();
	cxt.lineWidth = 2;
}

FaceAutomataWifi.prototype.erase_wave_small = function(){
	cxt.beginPath();
	cxt.lineWidth = 3;
	cxt.strokeStyle = 'white'
	cxt.moveTo(70,24)
	cxt.quadraticCurveTo(75, 19, 80, 24);
	cxt.stroke();
	cxt.lineWidth = 2;
	cxt.strokeStyle = 'black'

}

FaceAutomataWifi.prototype.draw_wave_medium = function(){
	cxt.beginPath();
	cxt.lineWidth = 1;
	cxt.moveTo(65,22)
	cxt.quadraticCurveTo(75, 14, 85, 22);
	cxt.stroke();
	cxt.lineWidth = 2;
}

FaceAutomataWifi.prototype.erase_wave_medium = function(){
	cxt.beginPath();
	cxt.lineWidth = 3;
	cxt.strokeStyle = 'white'
	cxt.moveTo(65,22)
	cxt.quadraticCurveTo(75, 14, 85, 22);
	cxt.stroke();
	cxt.lineWidth = 2;
	cxt.strokeStyle = 'black'
}

FaceAutomataWifi.prototype.draw_wave_big = function(){
	cxt.beginPath();
	cxt.lineWidth = 1;
	cxt.moveTo(60,20)
	cxt.quadraticCurveTo(75, 7, 90, 20);
	cxt.stroke();
	cxt.lineWidth = 2;
}

FaceAutomataWifi.prototype.erase_wave_big = function(){
	cxt.beginPath();
	cxt.lineWidth = 3;
	cxt.strokeStyle = 'white'
	cxt.moveTo(60,20)
	cxt.quadraticCurveTo(75, 7, 90, 20);
	cxt.stroke();
	cxt.lineWidth = 2;
	cxt.strokeStyle = 'black'
}








