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
		that.newGate(that.view, SlideMenu)
		that.newGate("home$MG", SenderMG)
		that.newGate("llaveEnMano$MG", SenderMG)
		that.newGate("servicios$MG", SenderMG)
		that.newGate("plantillas$MG", SenderMG)
		that.newGate("portafolio$MG", SenderMG)
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
		that[el].slideMenu_over = that.newEffect(new SlideMenu_over(that.device, that))
	}

	if (arguments.length)
		initialize()
}

SlideMenu.prototype.do_onmouseover = function(event, element){
	this[this.el].slideMenu_over.currentState.requested = this[this.el].slideMenu_over.state.rising
}

SlideMenu.prototype.do_onmouseout = function(event, element){
	this[this.el].slideMenu_over.currentState.requested = this[this.el].slideMenu_over.state.descending
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
	this.solicitors = [ 
	/* down */
	[ 
	function(){
		this.y = this.y0;
		this.gate.panel.style.top = this.y + "px"
	},
	function(){
		;
	},
	function(){
		this.v = this.v0
	}
	],
	/* rising */
	[
	function(){
		this.before = this.now
		this.time = this.now
	},
	function(){
		this.v += (this.now - this.before) / 1000 * this.k * (this.y1 - this.y) - 0.009 * this.v * (1 - (this.y - this.y1) / (this.y0 - this.y1) )
		this.y += ((this.now - this.before) / 1000 * this.v )
		this.gate.panel.style.top = this.y + "px"
		this.gate.panel.style.height = (this.y0 - this.y + this.h) + "px"
		if (this.y <=  this.y1)
			this.currentState.requested = state.top
	},
	function(){
		;
	}
	],
	/* top */
	[
	function(){
		this.y = this.y1;
		this.gate.panel.style.top = this.y + "px"
	},
	function(){
		;
	},
	function(){
		this.v = - this.v0
	}
	],
	/* descending */
	[
	function(){
		this.before = this.now
		this.time   = this.now
	},
	function(){
		this.v += (this.now - this.before) / 1000 * this.k *(this.y0 - this.y) 
		this.y += (this.now - this.before) / 1000 * this.v 
		this.gate.panel.style.top = this.y + "px"
		this.gate.panel.style.height = (this.y0 - this.y + this.h) + "px"
		if (this.y >= this.y0)
			this.currentState.requested = state.down
	},
	function(){
		;
	}
	]
	]
	
	function initialize(){
		that.gate = gate
		ThreadAutomata.call(that, that.state, that.currentState, that.solicitors, processor)
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
	this.device.fireEvent(systemEv("sync", {name: "go_to", data: RegExp.$1}, this.device))
}

