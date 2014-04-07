Ghost.prototype = new Gate
Ghost.prototype.constructor = Ghost
Ghost.super = Gate

function Ghost(element){
	this.ghost_amount = 0	

function initialize(){
	try{
		if(element){
			Gate.call(this, element)
		}		
	} catch (e) {
	    if ($K_debug_level >= $KC_dl.DEVELOPER)
	       alert("No event handlers were found.\nException: " + e.toSource())
        }
    }

    if (arguments.length)
        initialize()

    //that[el].slideMenu_over = that.newEffect(new SlideMenu_over(that.device, that))
}

Ghost.prototype.do_onclick   = function(element){
   this.ghost_amount++
   alert(this.ghost_amount)
}

Ghost.prototype.do_onmouseover   = function(element){
	var g = document.getElementById("ghost1")
	g.style.opacity = 0.4;   
}


GhostAutomata.prototype = new ThreadAutomata
GhostAutomata.prototype.constructor = GhostAutomata

function GhostAutomata(el, gate){
	var that = this
	this.now = new Date()
	this.before = new Date()
	this.ghost_opacity = 0
	var state = this.state = new Enumeration("vanished", "vanishing", "appearing", "appeared")
	this.currentState = {previous: state.down, 
						 current: state.down,
						 request: state.down}
	this.solicitors = [
		/* vanished */	[
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
		/* vanishing */ 	[
			function(){
				;
			},
			function (){
				if(ghost_opacity <= 0.6)
					ghost_opacity+=0.1
				this.style.opacity = ghost_opacity 
				 ;
				this.gateRunner(this.now)
				this.childRunner(this.now);
				this.running_steady(this.now)
			},
			function(){
				;
			}
		],
		/* appearing */[
			function(){
				;
			},
			function(){
				/* TO DO */ ;
				this.childRunner(this.now);
			},
			function(){
				;
			}
		],
		/* appeared */ 	[
			function(){
				;
			},
			function(){
				/* TO DO */ ;
				this.gateRunner(this.now)
			},
			function(){
				;
			}
		]
	]

    function initialize(){
	    try{
		    if(that.state){
			    ThreadAutomata.call(that, that.state)
		        that.newGate(el, Ghost)
			}
	    }catch(e){
		    if ($K_debug_level >= $KC_dl.DEVELOPER)
		    alert("No event handlers were found.\nException: " + e.toSource())
	    }
    }

    if (arguments.length)
        initialize()

}

