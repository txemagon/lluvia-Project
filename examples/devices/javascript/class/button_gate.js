ButtonGate.prototype = new Gate
ButtonGate.prototype.constructor = ButtonGate

function ButtonGate(el, parent) {
    var that = this
    var args = arguments

    function initialize() {
        that.el = el
        that[el] = {}
        Gate.call(that, el, parent)
    }

    if (arguments.length)
        initialize()
}

ButtonGate.prototype.do_onclick = function(event, element) {
    //this.device.fireEvent(this.device.newMessage("sync", "press_pause", this.boid))
}
ButtonGate.prototype.talk = function(msg) {
    alert(msg)
}