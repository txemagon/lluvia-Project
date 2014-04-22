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
    alert(this.element)
}
