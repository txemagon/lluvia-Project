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
   //this.gate.panel.style.display = "none"

}

Ghost.prototype.do_onmouseover   = function(ev, el){	
	//var g = document.getElementById(this.name)
	//g.style.opacity = 0.4;
	this[this.element].ghost_automata.currentState.requested = this[this.element].ghost_automata.state.appearing
}

Ghost.prototype.do_onmouseout   = function(ev, el){	
	 this[this.element].ghost_automata.currentState.requested = this[this.element].ghost_automata.state.vanishing
}

