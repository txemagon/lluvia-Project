GeneralMenu.prototype = new Device
GeneralMenu.prototype.constuctor = GeneralMenu
function GeneralMenu(view){
    var that = this
    var args = arguments

    /* Events */
    this.self_events = ["go_to"]

    function initialize(){
        Device.call(that, view)

        that.new_gate("button_screener01", Gate, {
    	do_onclick: function(event, element) {
            this.device.fire_event(this.device.new_message("sync", "go_to", 1))
        }})

        that.new_gate("button_screener02", Gate, {
        do_onclick: function(event, element) {
            this.device.fire_event(this.device.new_message("sync", "go_to", 2))
        }})

        that.new_gate("button_screener03", Gate, {
        do_onclick: function(event, element) {
            this.device.fire_event(this.device.new_message("sync", "go_to", 3))
        }})

        that.new_gate("button_screener04", Gate, {
        do_onclick: function(event, element) {
            this.device.fire_event(this.device.new_message("sync", "go_to", 4))
        }})
    }

    if (arguments.length)
        initialize()
}