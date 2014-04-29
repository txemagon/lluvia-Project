MenuHandler.prototype = new Device
MenuHandler.prototype.contructor = MenuHandler

function MenuHandler(view) {
	var that = this
	this.self_events = [ "get_panel_out", "restart_game", "keep_menu_out", "get_menu_in" ]
	Device.apply(this, arguments)
	this.view = view

	function initialize() {
		Device.call(that, view)
		
		that.menu_effects = that.newGate("menu", Animation)
		that.menu_effects[view].menu_automata = that.menu_effects.new_effect(new MenuAutomata(that.menu_effects.device, that.menu_effects))
		
		that.newGate("instructions_option", Gate, {do_onclick: function(event, element) {
            alert("Move the little pig to place sheeps into the barnyard")
        } })
		
		that.newGate("restart_option", Gate, { do_onclick: function(event, element) {
            this.device.fireEvent(this.device.newMessage("sync", "restart_game", this))
        } })
		
		that.newGate("level_option", Gate, {do_onclick: function(event, element){
            var levels_container= document.getElementById('level_option_container')
            levels_container.style.display='inline'
        } })
	}

	if (arguments.length)
		initialize()
}

MenuHandler.prototype.attend_keep_menu_out = function(date, msg) {
    //alert(this.menu_effects.menu_automata.toSource())
    this.menu_effects.menu_automata.currentState.requested = this[this.view].menu_automata.state.out
}

MenuHandler.prototype.attend_get_menu_in = function(date, msg) {
    //this[this.element].menu_automata.currentState.requested = this[this.element].menu_automata.state.getting_in
    alert("aqui llego")
}