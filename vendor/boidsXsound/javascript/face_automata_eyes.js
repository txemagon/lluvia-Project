FaceAutomataEyes.prototype = new ThreadAutomata
FaceAutomataEyes.prototype.constructor = new FaceAutomataEyes

function FaceAutomataEyes(processor, gate) {
	var that = this
	var t = 0
	this.now = new Date()
	this.before = new Date()
	var state = this.state = new Enumeration("vanished", "vanishing", "appearing", "busted")
	this.currentState = { previous: state.vanished,
						  current: state.vanished,
						  requested: state.vanished }

		this.solicitors = [
			/* vanished */	
			[
				function(){
					t = 0
					;
				},
				function(){
					cxt.beginPath();
					cxt.arc(55, 75 ,8 , 0, Math.PI*2, false); 
					cxt.arc(95, 75 ,8 , 0, Math.PI*2, false); 
					cxt.fill();
					
					t++
					if(t == 60)
						this.currentState.requested = this.state.vanishing	
					;
				},
				function(){
					cxt.fillStyle = 'white'
					cxt.beginPath();
					 cxt.arc(55, 75 ,9 , 0, Math.PI*2, false); 
					 cxt.arc(95, 75 ,9 , 0, Math.PI*2, false); 
					 cxt.fill();
					 cxt.fillStyle = 'black'
					;
				}
			],
			/* vanishing */ 
			[
				function(){
					t = 0
					;
				},
				function (){
					cxt.beginPath();
					cxt.moveTo(48, 75)
					cxt.lineTo(62, 75)

					cxt.moveTo(88, 75)
					cxt.lineTo(102, 75)
					cxt.stroke();

					t++
					if(t == 3)
						this.currentState.requested = this.state.vanished	
					;
				},
				function(){
					;
				}
			],
			/* appearing */
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
			/* busted */ 
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