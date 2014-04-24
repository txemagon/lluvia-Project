MenuHandler.prototype = new Device
MenuHandler.prototype.contructor = MenuHandler

function MenuHandler(view) {
	var that = this
	   

	function initialize() {
		Device.call(that, view)
		that.newGate("desplegable", Animation)
		that.newGate("start_option", Animation)
		that.newGate("restart_option", Animation)
		that.newGate("instructions_option", Animation)
	}

	if (arguments.length)
		initialize()
}