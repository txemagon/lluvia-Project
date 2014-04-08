/***********NEW DEVICE**********/
GhostMedium.prototype = new Device 
GhostMedium.prototype.constructor = GhostMedium

function GhostMedium(view){

	var that = this

	function initialize(){
		Device.call(that, view)
		that.newGate("ghost1", Ghost)
		that.newGate("ghost2", Ghost)
	    that.newGate("ghost3", Ghost)
	    that.newGate("ghost4", Ghost)
	}

	if(arguments.length)
		initialize()
}


/***********NEW GATE**********/
Ghost.prototype = new Gate
Ghost.prototype.constructor = Ghost
Ghost.super = Gate

function Ghost(element){
	this.ghost_amount = 0	
    var that = this
    this.name = element

    function initialize() {
		try{
			if (element) {				
				that.element  = element
				that[element] = {}
				Gate.call(that, element)
				that[element].ghost_automata = that.new_effect(new GhostAutomata(that.device, that))
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

Ghost.prototype.do_onclick = function(ev, el){	
   this.ghost_amount++
   alert(this.ghost_amount)
}
/***************ALL GOOD UP TO HERE******************/

Ghost.prototype.do_onmouseover   = function(ev, el){	
	//var g = document.getElementById(this.name)
	//g.style.opacity = 0.4;
	this[this.element].ghost_automata.currentState.requested = this[this.element].ghost_automata.state.appearing
}

Ghost.prototype.do_onmouseout   = function(ev, el){	
	 //this[this.element].ghost_automata.currentState.requested = this[this.element].ghost_automata.state.vanishing
}

/***********NEW THREADAUTOMATA**********/
GhostAutomata.prototype = new ThreadAutomata
GhostAutomata.prototype.constructor = GhostAutomata

function GhostAutomata(processor, gate){
	
	var that = this
	this.now = new Date()
	this.before = new Date()
	this.ghost_opacity = 0
	var state = this.state = new Enumeration("vanished", "vanishing", "appearing", "appeared")
	this.currentState = { previous: state.vanished, 
						  current: state.vanished,
						  requested: state.vanished }
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
				alert("Buu uuuu uuu")
				if( this.ghost_opacity >= 0)
					this.ghost_opacity-=0.1
				this.style.opacity = this.ghost_opacity
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
				if (this.ghost_opacity <= 1)
					this.ghost_opacity += 0.1
				this.gate.panel.style.opacity = "" + this.ghost_opacity
		
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

