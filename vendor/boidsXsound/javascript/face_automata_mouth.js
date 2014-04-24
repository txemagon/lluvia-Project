FaceAutomataMouth.prototype = new ThreadAutomata
FaceAutomataMouth.prototype.constructor = new FaceAutomataMouth

function FaceAutomataMouth(processor, gate) {
	var that = this
	this.now = new Date()
	this.before = new Date()
	this.ghost_opacity = 0
	var state = this.state = new Enumeration("closed")
	this.currentState = { previous: state.closed,
						  current: state.closed,
						  requested: state.closed }

		this.solicitors = [
			/* closed */	
			[
				function(){
					this.draw_mouth_closed()
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

FaceAutomataMouth.prototype.draw_mouth_closed = function(){
	cxt.beginPath();
	cxt.moveTo(47,110)
	cxt.lineTo(103,110);
	cxt.stroke();
}