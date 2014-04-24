FaceAutomataMouth.prototype = new ThreadAutomata
FaceAutomataMouth.prototype.constructor = new FaceAutomataMouth

function FaceAutomataMouth(processor, gate) {
	var that = this
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
					cxt.beginPath();
					cxt.moveTo(48,110)
					cxt.lineTo(102,110);
					cxt.stroke();
					;
				},
				function(){

					;
				},
				function(){
					;
				}
			],
			/* vanishing */ 
			[
				function(){
					;
				},
				function (){

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