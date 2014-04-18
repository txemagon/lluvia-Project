/**
 * @author txema
 */

EventDispatcher.prototype = new ThreadAutomata
EventDispatcher.prototype.constructor = EventDispatcher

function EventDispatcher(lookup){
	// Private static vars
	var that = this; // Class reference for static functions
	this.ids   = 0
	this.ports = {
		 // List event listeners. "app_down": []
	}
	
	// Public vars
	this.inqueue = []
	this.clss = that	// Reference for static members to be used inside instances
	
	// Privileged methods
	this.getId = function(){return ++that.ids;}
	
	// Initialization
	lookup.add(this)
}

/**
 * 
 * @method enqueue
 * @static
 *
 * Gets the id of the event and push it to the array of event ids
 *
 * @param  {String} mssg Message sent by the fired event 
 * 
 * @return {Vector} Returns the id of the fired event
 */
EventDispatcher.prototype.enqueue = function(mssg){
	var ev = this
	mssg.received = {id: ev.getId(), time: new Date()};
	this.inqueue.push(mssg)
	return mssg.received.id
}

/**
 * 
 * @method add_port
 * @static
 *
 * Adds a new port to the array of ports
 *
 * @param  {} event Event to be added to the port array
 * @param  {} funct Function that is called when the event is triggered
 * 
 * @return {}  
 */
EventDispatcher.prototype.addPort = function (event, funct){
	if (this.ports[event])
		this.ports[event].push(funct)
}

/**
 * 
 * @method join_ports
 * @static
 *
 * Join two or more ports in a list of arrays
 *
 * @param  {Array} listArray Array that containts every port 
 * 
 * @return {}  
 */
EventDispatcher.prototype.joinPorts = function (listArray){
	for (var i=0; i<listArray.length; i++)
		this.ports[listArray[i]] = []
}

/**
 * 
 * @method del_port
 * @static
 *
 * Deletes an specific port from the array of ports
 *
 * @param  {} event Event to be deleted from the port array
 * @param  {} funct Function that is called when the event is triggered
 * 
 * @return {}  
 */
EventDispatcher.prototype.delPort = function (event, funct){
	if (this.clss.ports[event])
		for (var i=0; i<this.clss.ports.length; i++)
			if (this.clss.ports[i] === funct)
				this.clss.ports[i].splice(i,1)
}

/**
 * 
 * @method fire_event
 * @static
 *
 * Gets the next event in the queue
 *
 * @param  {} event Event that will start next 
 * 
 * @return {}  
 */
EventDispatcher.prototype.fireEvent = function(event){
	if (this.clss.ports[event.name])
		for (var i=0; i<this.clss.ports[event.name].length; i++)
			this.clss.ports[event.name][i](event);
}

/**
 * 
 * @method shift
 * @static
 *
 * Attends the queue of events and gets the arguments needed to answer them
 *
 * @param  {} 
 * 
 * @return {Boolean} Returns true or shows an alert if an error occurs
 */
EventDispatcher.prototype.shift = function(){ //attend the inqueue
	for (var i=0; i<this.inqueue.length; i++)
		try {
			var mssg = this.inqueue[i]
			if (mssg.status[mssg.current] === "closed")
				this.inqueue.splice(i, 1)
			if (this.inqueue[i]) {
				mssg = this.inqueue[i]
				if (mssg.status[mssg.current] === "sent") {
					this.device.attend(arguments[0], mssg)
					mssg.current++
				}
			}
		} catch (e) {
			if ($K_debug_level >= $KC_dl.PROGRAMMER)
			   alert("No event handler for message. \nException: " + e.toSource())
		}
	return true;
}

/**
 * 
 * @method run
 * @static
 *
 * Runs the next event 
 *
 * @param  {} 
 * 
 * @return {}  
 */
EventDispatcher.prototype.run = function(){
	return shift.apply(this, arguments)
}
