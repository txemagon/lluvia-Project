Keypad.prototype = new Device
Keypad.prototype.constructor = Keypad

function Keypad(view) {
    var that = this

    this.self_events = ["press_pause"]

    if (arguments.length)
        Device.call(this, view)
}