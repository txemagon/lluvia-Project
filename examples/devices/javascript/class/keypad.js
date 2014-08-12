Keypad.prototype = new Device
Keypad.prototype.constructor = Keypad

function Keypad(view){
    var that = this

    if (arguments.length)
        Device.call(this, view)
}

Keypad.prototype.start_watch = function(){}

Keypad.prototype.pause_watch = function(){}