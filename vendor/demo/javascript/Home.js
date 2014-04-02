/**
 * Home Application
 *
 * @author Txema
 * @version 1.00 Sept, 2009
 */

Home_App.prototype = new Device
Home_App.prototype.constructor = Home_App

function Home_App(view){
	var that = this
	var args = arguments
	
	/* Events */
	this.self_events = ["app_down", "app_pause"]
	
	function initialize(){
		Device.call(that, view)
		that.threads.push( new God("godHome", null, null, that) )
		that.newGate("llaveEnMano", Sender)
		that.newGate("servicios", Sender)
		that.newGate("plantillas", Sender)
		that.newGate("portafolios", Sender)
		that.solicitors[that.getStates().killing][1] = that.killing
	}
	
	if (arguments.length)
		initialize()
		
}
Home_App.prototype.sendMessage = function(type, name, data, receiptant){
	this.threads[3].eventDispatcher.enqueue(this.newMessage(type, name, data))
}

Home_App.prototype.newMessage = function(type, name, data){
	if (type && name)
		return systemEv(type , {name: name, data: data || "no extra data available"}, this)
}

Home_App.prototype.killing = function(){
	this.gateRunner(this.now)
	var end = true
	for (var i = 0; i < this.gates.length; i++) 
		if (this.gates[i].threads[0].currentState.current != this.gates[i].threads[0].state.down) 
			end = false
		
	if (end)
		this.currentState.requested = this.getStates().killed
}

Home_App.prototype.Har_Mageddon_back = function(){
	this.currentState.requested = this.getStates().killing
}


Sender.prototype = new Gate
Sender.prototype.constructor = Sender

function Sender(el){ 
	var that = this	
	
	function initialize(){
		that.y = 0
		that.el = el
		that[el] = {}
		Gate.call(that, el)
		that.panel.style.position = "relative"
		that[el].edificio_over = that.newEffect(new Edificio_over(that.device, that))
	}

	if (arguments.length)
		initialize()
}
	
Sender.prototype.do_onclick = function(event, element){
	this.device.sendMessage("sync", "Har_Mageddon", null, this.device)
}

Sender.prototype.do_onmouseover = function(event, element){
	this[this.el].edificio_over.currentState.requested = this[this.el].edificio_over.state.rising
}

Sender.prototype.do_onmouseout = function(event, element){
	this[this.el].edificio_over.currentState.requested = this[this.el].edificio_over.state.descending
}

Edificio_over.prototype = new ThreadAutomata
Edificio_over.prototype.constructor = Edificio_over

function Edificio_over(processor, gate){
	var that = this
	
	this.y0 = this.y = 0//Device.prototype._y(that.gate.panel)
	this.y1 = - 30
	this.v = 2
	this.y  = 0
	this.v0 = 12
	this.k  = 0.9
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
		this.shadow.style.top = (- this.k2 * this.y) + "px"
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
		this.shadow.style.top = (- this.k2 * this.y) + "px"
		this.gate.panel.style.top = this.y + "px"
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
		this.shadow.style.top = (- this.k2 * this.y) + "px"
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
		this.shadow.style.top = (- this.k2 * this.y) + "px"
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
		that.shadow = document.getElementById(that.gate.panel.getAttribute("id") + "R")
		that.shadow.style.position = "relative"
	}
	if (arguments.length)
		initialize()
}
