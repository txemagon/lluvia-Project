MenuHandler.prototype = new Device
MenuHandler.prototype.contructor = MenuHandler

function MenuHandler(view) {
	var that = this
	this.self_events = ["get_panel_out"]

	function initialize() {
		Device.call(that, view)
		that.newGate("menu", Animation)
		that.newGate("instructions_option", Button)
		that.newGate("restart_option", Button)
		that.newGate("level_option", Button)
	}

	if (arguments.length)
		initialize()
}

