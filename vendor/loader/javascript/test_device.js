TestDevice.prototype = new Device
TestDevice.prototype.constructor = TestDevice

function TestDevice(view, self_events) {
    var that = this
    var args = arguments

    /* Events */
    this.self_events = self_events

    function initialize() {
        Device.call(that, view)
    }

    if (arguments.length)
        initialize()
}

TestDevice.prototype.attend_event1 = function(date, mssg){
    alert("event 1")
}