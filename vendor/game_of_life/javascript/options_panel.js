OptionsPanel.prototype = new Device
OptionsPanel.prototype.constructor = OptionsPanel

function OptionsPanel(){
	this.self_events = ["pause", "start", "next_step", "restart", "resume"]

    Device.call(this, null, null)
    
    this.new_gate("button_start", Gate, {
    	do_onclick: function(event, element) {
            this.device.fire_event(this.device.new_message("sync", "start", this))
            button_start.style.visibility = "hidden"
        },
        do_onmouseover: function(event, element){
            button_start.src = "images/buttons/button_start_select.png"
        },
        do_onmouseout: function(event, element){
            button_start.src = "images/buttons/button_start.png"
        }})

    this.new_gate("button_pause", Gate, {
    	do_onclick: function(event, element) {
            this.device.fire_event(this.device.new_message("sync", "pause", this))
        },
        do_onmouseover: function(event, element){
            button_pause.src = "images/buttons/button_pause_select.png"
        },
        do_onmouseout: function(event, element){
            button_pause.src = "images/buttons/button_pause.png"
        }})

    this.new_gate("button_next_step", Gate, {
    	do_onclick: function(event, element) {
            this.device.fire_event(this.device.new_message("sync", "next_step", this))
        },
        do_onmouseover: function(event, element){
            button_next_step.src = "images/buttons/button_next_step_select.png"
        },
        do_onmouseout: function(event, element){
            button_next_step.src = "images/buttons/button_next_step.png"
        }})

    this.new_gate("button_restart", Gate, {
    	do_onclick: function(event, element) {
            this.device.fire_event(this.device.new_message("sync", "restart", this))
        },
        do_onmouseover: function(event, element){
            button_restart.src = "images/buttons/button_restart_select.png"
        },
        do_onmouseout: function(event, element){
            button_restart.src = "images/buttons/button_restart.png"
        }})

    this.new_gate("button_resume", Gate, {
    	do_onclick: function(event, element) {
            this.device.fire_event(this.device.new_message("sync", "resume", this))
        },
        do_onmouseover: function(event, element){
            button_resume.src = "images/buttons/button_resume_select.png"
        },
        do_onmouseout: function(event, element){
            button_resume.src = "images/buttons/button_resume.png"
        }})

}