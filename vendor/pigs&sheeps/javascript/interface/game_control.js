/**
 * Device for handling the Game loop and user interactions
 */

GameControl.prototype = new Device
GameControl.prototype.constructor = GameControl

function GameControl() {
	
	var that = this
	var args = arguments

	this.self_events = ["start_game"]


    // todo: object scope rather than class scope
	this.newGate("screener", KeyboardControl)
	this.newGate("play_button", Button)

	Device.apply(this, arguments)
}