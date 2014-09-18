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