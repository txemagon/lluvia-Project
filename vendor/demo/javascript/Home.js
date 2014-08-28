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
		that.new_gate("llaveEnMano", Sender)
		that.new_gate("servicios", Sender)
		that.new_gate("plantillas", Sender)
		that.new_gate("portafolios", Sender)
		that.state.running.run.killing = that.killing
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
		that[el].edificio_over = that.new_effect(new Edificio_over(that.device, that))
	}

	if (arguments.length)
		initialize()
}

Sender.prototype.do_onclick = function(event, element){
	this.device.send_message("sync", "Har_Mageddon", null, this.device)
}

Sender.prototype.do_onmouseover = function(event, element){
	this[this.el].edificio_over.switch("rising")
}

Sender.prototype.do_onmouseout = function(event, element){
	this[this.el].edificio_over.switch("descending")
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

    var solicitors = {
        "down.up": function(){
            that.y = that.y0;
	        that.shadow.style.top = (- that.k2 * that.y) + "px"
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
	 	    that.shadow.style.top = (- that.k2 * that.y) + "px"
	 	    that.gate.panel.style.top = that.y + "px"
	 	    if (that.y <=  that.y1)
	 		    that.switch("top")
        },
        "rising.down": function(){
        },
        "top.up": function(){
            that.y = that.y1;
	 	    that.shadow.style.top = (- that.k2 * that.y) + "px"
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
	 	    that.shadow.style.top = (- that.k2 * that.y) + "px"
	 	    if (that.y >= that.y0)
	 		    that.switch("down")
        },
        "descending.down": function(){
        }
    }

	function initialize(){
		that.gate = gate
		ThreadAutomata.call(that, ["down", "rising", "top", "descending"], solicitors)
		that.shadow = document.getElementById(that.gate.panel.getAttribute("id") + "R")
		that.shadow.style.position = "relative"
	}
	if (arguments.length)
		initialize()
}