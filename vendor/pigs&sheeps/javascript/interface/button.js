Button.prototype = new Gate
Button.prototype.constructor = Button

function Button(element, action){
<<<<<<< HEAD
	var that = this
	
=======
>>>>>>> b75996f65d421e6ee1a6f91d7d1cddada6995d89
	try {
		this.action = action || {}
		if (arguments.length)
			that.element = element
			Gate.call(this, element)	// Call to the super constructor (it does all the work).
	} catch (e) {
		if ($K_debug_level >= $KC_dl.DEVELOPER)
			alert("No event handlers were found.\nException: " + e.toSource())
	}
}

// Button.prototype.do_onclick = function(event, element){
//    return this.action["onclick"](event, element)
// }
