/**
 * Control Panel Application
 *
 * @author Txema
 * @version 1.00 Sept, 2009
 */

ControlPanel_App.prototype = new Device
ControlPanel_App.prototype.constructor = Home_App

function ControlPanel_App(view){
	var that = this
	var args = arguments

	/* Events */
	this.self_events = ["go_to"]

	function initialize(){
		Device.call(that, view)
		that.new_gate(that.view, SlideMenu)
		that.new_gate("home$MG", SenderMG)
		that.new_gate("llaveEnMano$MG", SenderMG)
		that.new_gate("servicios$MG", SenderMG)
		that.new_gate("plantillas$MG", SenderMG)
		that.new_gate("portafolio$MG", SenderMG)
	}

	if (arguments.length)
		initialize()

}

SlideMenu.prototype = new Gate
SlideMenu.prototype.constructor = SlideMenu

function SlideMenu(el){
	var that = this
	function initialize(){
		that.el = el
		that[el] = {}
		Gate.call(that, el)
		that.panel.style.position = "relative"
		that[el].slideMenu_over = that.new_effect(new SlideMenu_over(that.device, that))
	}

	if (arguments.length)
		initialize()
}

SlideMenu.prototype.do_onmouseover = function(event, element){
	this[this.el].slideMenu_over.switch("rising")
}

SlideMenu.prototype.do_onmouseout = function(event, element){
	this[this.el].slideMenu_over.switch("descending")
}


SlideMenu_over.prototype = new ThreadAutomata
SlideMenu_over.prototype.constructor = SlideMenu_over

function SlideMenu_over(processor, gate){
	var that = this

	this.y0 = this.y = 0//Device.prototype._y(that.gate.panel)
	this.y1 = - 150
	this.v = 2
	this.y  = 0
	this.v0 = 12
	this.k  = 9
	this.k2 = 0.4
	this.dv = 50
	this.dy = 5
	this.now = new Date()
	this.before = new Date()
	var state = this.state = new Enumeration("down", "rising", "top", "descending")
	this.currentState = { 	previous:  state.down,
							current:   state.down,
							requested: state.down
						}
	
	var solicitors = {
        "down.up": function(){
            that.y = that.y0;
		    that.gate.panel.style.top = that.y + "px"
        },
        down: function(){
        },
        "down.down": function(){
            that.v = that.v0
        },
        "rising.up": function(){
            that.before = that.now
	        that.time = that.now
        },
        rising: function(){
            that.v += (that.now - that.before) / 1000 * that.k * (that.y1 - that.y) - 0.009 * that.v * (1 - (that.y - that.y1) / (that.y0 - that.y1) )
		    that.y += ((that.now - that.before) / 1000 * that.v )
		    that.gate.panel.style.top = that.y + "px"
		    that.gate.panel.style.height = (that.y0 - that.y + that.h) + "px"
		    if (that.y <=  that.y1)
			    that.switch("top")
        },
        "rising.down": function(){
        },
        "top.up": function(){
            that.y = that.y1;
		    that.gate.panel.style.top = that.y + "px"
        },
        top: function(){

        },
        "top.down": function(){
            that.v = - that.v0	
        },
        "descending.up": function(){
            that.before = that.now
	        that.time   = that.now
        },
        descending: function(){
            that.v += (that.now - that.before) / 1000 * that.k *(that.y0 - that.y)
		    that.y += (that.now - that.before) / 1000 * that.v
		    that.gate.panel.style.top = that.y + "px"
		    that.gate.panel.style.height = (that.y0 - that.y + that.h) + "px"
		    if (that.y >= that.y0)
			    that.switch("down")
        },
        "descending.down": function(){
        }
    }

	function initialize(){
		that.gate = gate
		ThreadAutomata.call(that, ["down", "rising", "top", "descending"], solicitors)
		that.h = that.gate.panel.offsetHeight
		that.gate.panel.style.width = screen.width + "px"
		that.gate.panel.style.zIndex = 1000
	}
	if (arguments.length)
		initialize()
}

SenderMG.prototype = new Gate
SenderMG.prototype.constructor = SenderMG

function SenderMG(el){
	var that = this

	function initialize(){
		that.el = el
		that[el] = {}
		Gate.call(that, el)
	}

	if (arguments.length)
		initialize()
}

SenderMG.prototype.do_onclick = function(event, element){
	this.el.match(/(.*)\$MG/)
	this.device.fire_event(systemEv("sync", {name: "go_to", data: RegExp.$1}, this.device))
}

