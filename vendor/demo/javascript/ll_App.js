/**
 * Normal App Device
 *
 * @author Txema
 * @version 1.00 Sept, 2009
 */

ll_App.prototype = new Device
ll_App.prototype.constructor = ll_App

function ll_App(view){
	var that = this
	var args = arguments
	
	/* Events */
	this.self_events = ["go_to"]
	
	function initialize(){
		Device.call(that, view)
		
	}
	
	if (arguments.length)
		initialize()
		
}