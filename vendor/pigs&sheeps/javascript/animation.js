Animation.prototype = new Gate
Animation.prototype.constructor = Animation

function Animation(element) {

	var that = this

	function initialize(){
	    try {
	        if (element) {
	        	that.element = element
	        	that[element] = {}
	            Gate.call(that, element)	// Call to the super constructor (it does all the work).
                //threadAutomata aqui
                that[element].menu_automata = that.new_effect(new MenuAutomata(that.device, that))
	        }
	    } catch (e) {
	        if ($K_debug_level >= $KC_dl.DEVELOPER)
	           alert("No event handlers were found.\nException: " + e.toSource())
	    }
	}

	if (arguments.length)
	    initialize()
}



Animation.prototype.do_onmouseover = function(ev, el){
   // alert(this.element)
    this[this.element].menu_automata.currentState.requested = this[this.element].menu_automata.state.getting_out

}

Animation.prototype.do_onmouseout = function(ev, el){
    //alert(this.element)
    this[this.element].menu_automata.currentState.requested = this[this.element].menu_automata.state.getting_in

}


