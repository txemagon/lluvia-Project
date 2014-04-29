OptionHandler.prototype = new Device
OptionHandler.prototype.contructor = OptionHandler

function OptionHandler(view) {
	var that = this
	this.self_events = [ "get_panel_out", "keep_menu_out", "get_menu_in" ]
	Device.apply(this, arguments)

	function initialize() {
		Device.call(that, view)
		
		that.newGate("level_option_container", Levels)

        that.newGate("level1", Gate, {do_onclick: function(event, element) {
            alert("You are in level 1!")
        } })

        that.newGate("level2", Gate, {do_onclick: function(event, element) {
            alert("You are in level 2!")
        } })

        that.newGate("level3", Gate, {do_onclick: function(event, element) {
            alert("You are in level 3")
        } })
	}

	if (arguments.length)
		initialize()
}


