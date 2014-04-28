MenuHandler.prototype = new Device
MenuHandler.prototype.contructor = MenuHandler

function MenuHandler(view) {
	var that = this
	this.self_events = [ "get_panel_out", "restart_game" ]
	Device.apply(this, arguments)

	function initialize() {
		Device.call(that, view)
		that.newGate("menu", Animation)
		
		that.newGate("instructions_option", Gate, {do_onclick: function(event, element) {
            alert("Move the little pig to place sheeps into the barnyard")
        } })
		
		that.newGate("restart_option", Gate, { do_onclick: function(event, element) {
            this.device.fireEvent(this.device.newMessage("sync", "restart_game", this))
        } })
		
		that.newGate("level_option", Gate, {do_onclick: function(event, element){
            var levels_container= document.getElementById('level_option_container')
            if(levels_in==0){
                levels_in+=1
                levels_container.style.display='inline'
                levels_container.style.left='200px'
        // menu_desplegable.style.height='210px'
            }
            else{
                levels_in-=1
                levels_container.style.display='none'
            }
        } })
	}

	if (arguments.length)
		initialize()
}

