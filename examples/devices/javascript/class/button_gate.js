ButtonGate.prototype = new Gate
ButtonGate.prototype.constructor = ButtonGate

function ButtonGate(el, parent, id_parent) {
    var that = this
    var args = arguments
    this.device = parent

    function initialize() {
        that.el = el
        that[el] = {}
        Gate.call(that, el, id_parent)
    }

    if (arguments.length)
        initialize()
}

ButtonGate.prototype.do_onclick = function(event, element) {
    this.device.fire_event(this.device.new_message("sync", "press_pause", this.device))
}