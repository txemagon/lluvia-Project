TangledDevice.prototype = new Device
TangledDevice.prototype.constructor = TangledDevice

function TangledDevice(view) {
    var that = this

    this.self_events = ["press_pause"]

    function initialize() {
    	 Device.call(that, view)
    	 that.state.running.run.up = function() { return "running.run.up"  }
    }

    if (arguments.length)
        initialize()
}

