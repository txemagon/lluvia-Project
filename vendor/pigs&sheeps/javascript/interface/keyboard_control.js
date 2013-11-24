/**
 * Keyboard Controller
 */

KeyboardControl.prototype = new Gate
KeyboardControl.prototype.constructor = KeyboardControl

function KeyboardControl() {
	var that = this
	var args = arguments

	Gate.apply(this, arguments)
}

KeyboardControl.prototype.do_onkeydown = function(event,element){

}

KeyboardControl.prototype.do_onkeyup = function(event, element){

}