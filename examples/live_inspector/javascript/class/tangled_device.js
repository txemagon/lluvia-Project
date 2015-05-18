TangledDevice.prototype = new Device
TangledDevice.prototype.constructor = TangledDevice

function TangledDevice(view) {
    var that = this

    this.self_events = ["press_pause"]

    function initialize() {
    	 Device.call(that, view)
    }

    if (arguments.length)
        initialize()
}