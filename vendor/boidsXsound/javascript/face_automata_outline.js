FaceAutomataOutline.prototype = new ThreadAutomata
FaceAutomataOutline.prototype.constructor = new FaceAutomataOutline

function FaceAutomataOutline(processor, gate) {
	var that = this
	this.now = new Date()
	this.before = new Date()
	this.ghost_opacity = 0
	var state = this.state = new Enumeration("normal_outline")
	this.currentState = { previous: state.normal_outline,
						  current: state.normal_outline,
						  requested: state.normal_outline }

		this.solicitors = [
			/* normal_outline */	
			[
				function(){
					this.draw_outline_face()
					this.draw_outline_antenna()
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

FaceAutomataOutline.prototype.draw_outline_face = function(){
	cxt.lineWidth = 2;
	cxt.beginPath();

	cxt.moveTo(47.5,45)
	cxt.lineTo(102.5,45);

	cxt.quadraticCurveTo(122.5, 45, 122.5, 70);
	cxt.lineTo(122.5,115);

	cxt.quadraticCurveTo(122.5, 135, 102.5, 135);
	cxt.lineTo(47.5,135);

	cxt.quadraticCurveTo(27.5, 135, 27.5, 115);
	cxt.lineTo(27.5, 70);

	cxt.quadraticCurveTo(27.5, 45, 47.5, 45);

	cxt.stroke();
}

FaceAutomataOutline.prototype.draw_outline_antenna = function(){
	cxt.lineWidth = 1;

	cxt.beginPath();
	cxt.moveTo(75,45)
	cxt.lineTo(75,40)
	cxt.lineTo(80,38)
	cxt.lineTo(70,36)
	cxt.lineTo(80,34)
	cxt.lineTo(75,32)
	cxt.lineTo(75,30)
	cxt.stroke();

	cxt.beginPath();
	cxt.arc(75, 28 ,3 , 0, Math.PI*2, false);
	cxt.fill()

	cxt.lineWidth = 2;
}
