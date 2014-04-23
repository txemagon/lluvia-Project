FaceAutomata.prototype = new ThreadAutomata
FaceAutomata.prototype.constructor = new FaceAutomata

function FaceAutomata(processor, gate) {
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
					if( this.ghost_opacity >= 0.1)
					this.ghost_opacity-=0.1
					this.gate.panel.style.opacity = "" + this.ghost_opacity
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
//					if (this.ghost_opacity <= 1)
//					this.ghost_opacity += 0.1
//					this.gate.panel.style.opacity = "" + this.ghost_opacity
alert("estado")
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