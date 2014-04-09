Button.prototype = new Gate
Button.prototype.constructor = Button

function Button(element, action){
	
	try {
		this.action = action
		if (arguments.length)
			Gate.call(this, element)	// Call to the super constructor (it does all the work).
	} catch (e) {
		if ($K_debug_level >= $KC_dl.DEVELOPER)
			alert("No event handlers were found.\nException: " + e.toSource())
	}
}

Button.prototype.do_onclick = function(event, element){
   return this.action["onclick"](event, element)
}