FaceAutomataWifi.prototype = new ThreadAutomata
FaceAutomataWifi.prototype.constructor = new FaceAutomataWifi

function FaceAutomataWifi(processor, gate) {
	var that = this
	var time = 0
	this.now = new Date()
	this.before = new Date()
	this.ghost_opacity = 0
	var state = this.state = new Enumeration("vanished", "vanishing", "appearing", "busted")
	this.currentState = { previous: state.vanished,
						  current: state.vanished,
						  requested: state.vanished }

		this.solicitors = [
			/* vanished */	
			[
				function(){
					time = 0

					cxt.beginPath();
					cxt.lineWidth = 3;
					cxt.strokeStyle = 'white'
					cxt.moveTo(60,20)
					cxt.quadraticCurveTo(75, 7, 90, 20);
					cxt.stroke();
					cxt.lineWidth = 2;
					cxt.strokeStyle = 'black'

					cxt.beginPath();
					cxt.lineWidth = 1;
					cxt.moveTo(70,24)
					cxt.quadraticCurveTo(75, 19, 80, 24);
					cxt.stroke();
					cxt.lineWidth = 2;
					;
				},
				function(){
					time++
					if(time == 5)
						this.currentState.requested = this.state.vanishing	
					;
				},
				function(){
					;
				}
			],
			/* vanishing */ 
			[
				function(){
					time = 0

					cxt.beginPath();
					cxt.lineWidth = 3;
					cxt.strokeStyle = 'white'
					cxt.moveTo(70,24)
					cxt.quadraticCurveTo(75, 19, 80, 24);
					cxt.stroke();
					cxt.lineWidth = 2;
					cxt.strokeStyle = 'black'

					cxt.beginPath();
					cxt.lineWidth = 1;
					cxt.moveTo(65,22)
					cxt.quadraticCurveTo(75, 14, 85, 22);
					cxt.stroke();
					cxt.lineWidth = 2;
					;
				},
				function (){
					time++
					if(time == 5)
						this.currentState.requested = this.state.appearing	
					;
				},
				function(){
					;
				}
			],
			/* appearing */
			[
				function(){
					time = 0

					cxt.beginPath();
					cxt.lineWidth = 3;
					cxt.strokeStyle = 'white'
					cxt.moveTo(65,22)
					cxt.quadraticCurveTo(75, 14, 85, 22);
					cxt.stroke();
					cxt.lineWidth = 2;
					cxt.strokeStyle = 'black'

					cxt.beginPath();
					cxt.lineWidth = 1;
					cxt.moveTo(60,20)
					cxt.quadraticCurveTo(75, 7, 90, 20);
					cxt.stroke();
					cxt.lineWidth = 2;
					;
				},
				function(){
					time++
					if(time == 5)
						this.currentState.requested = this.state.busted	
					;
				},
				function(){
					;
				}
			],
			/* busted */ 
			[
				function(){
					cxt.beginPath();
					cxt.lineWidth = 3;
					cxt.strokeStyle = 'white'
					cxt.moveTo(60,20)
					cxt.quadraticCurveTo(75, 7, 90, 20);
					cxt.stroke();
					cxt.lineWidth = 2;
					cxt.strokeStyle = 'black'
					;
				},
				function(){
					time++
					if(time == 50)
						this.currentState.requested = this.state.vanished
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