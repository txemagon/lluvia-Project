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

KeyboardControl.prototype.do_onkeypress = function(event,element){
	$logger.log("key pressed")
}

KeyboardControl.prototype.do_onkeydown = function(event,element){
	$logger.log("key down")
}

KeyboardControl.prototype.do_onkeyup = function(event, element){
    $logger.log("key up")
    // Use this.device.fireEvent to notificate this event to all the listeners.
}

KeyboardControl.prototype.do_onclick = function(event,element){
	$logger.log("click")
}
