/**
 * @class Device
 * @extends Processor
 * @extends ThreadAutomata
 *
 * Provides an asynchronous mechanism for communicating with another devices.
 * In practical terms, it uses a message queue and fires events.
 * I doesn't have a window on his own but handles Gates to communicate
 * with HTML DOM.
 *
 * ###Example of use:
 *
 *
 *     // EXAMPLE APP DEVICE
 *     // ButtonGate Example
 *     ButtonGate.prototype = new Gate
 *     ButtonGate.prototype.constructor = ButtonGate
 *
 *     function ButtonGate(el){
 *     	if (arguments.length)
 *     		Gate.call(this, el)
 *     }
 *     // No 'device' references are provided in the constructor
 *
 *
 *     ButtonGate.prototype.do_onclick = function(event, element){
 *     	alert("You have made click.")
 *     }
 *
 *     TryApp.prototype = new Device
 *     TryApp.prototype.constructor = TryApp
 *
 *
 *
 *     function TryApp(){
 *     	//  self reference for static methods
 *     	var that = this;
 *
 *     	// class reference for instance objects
 *     	this._class = that
 *
 *
 *     	//  private static vars
 *     	Device.call(this, null)
 *     	this.newGate("llaveEnMano", ButtonGate)
 *      // Device#newGate inject a device property inside
 *      // the ButtonGate object pointing to _this_.
 *     	this.solicitors[this.state.running][this.stateChange.steady] = function(){
 *     		that.gates[0].panel.innerHTML = new Date()
 *     	}
 *     }
 *
 *
 *
 * We have to be very carefull with non idempotent methods (specially function references),
 * because they are called twice during inheritance processes. Once in xxx.prototype = new yy
 * and another time at object initialization " yyy.call(xxx, params) "
 *
 * Third generation inheritance generates constructor calls with null arguments
 *
 * @property {Object} state Enumeration with all possible states. Default values are listed below.
 * @property {Number} [state.suspended=0] The device is not using its executdion turn.
 * @property {Number} [state.running=1]  Normal work operations.
 * @property {Number} [state.suspending=2] The device is cleaning up before sleeping.
 * @property {Number} [state.killing=3] Write your last will.
 * @property {Number} [state.killed=4] No aim to recover.
 *
 * @property {Array} solicitors The three functions (up, steady and down) that drive any state.
 *
 * @property {Object} eventDispatcher EventDispatcher object. Handles in and out communications.
 * @property {Object} currentState    Holds the current state of the device.
 * @property currentState.previous    Record of the previous state.
 * @property currentState.current     State we are currently in.
 * @property currentState.requested   State to change in the next run.
 *
 * @property {Array} gates List of all attached Gates.
 *
 * @constructor
 * Creates a Device.
 *
 * @param {String | HTMLElement} [view] (optional) A possible view associated with the Device.
 * @param {Object} [state] (optional) Default Device states -as ll_Enumeration- are: suspended, running, suspending, killing and killed.
 * @param {Object} [currentState={ previous: state.suspended, current: state.suspended, requested: state.running }] Sets the initial conditions for the device to start.
 * @param {Object} [parent=Processor] Parent Device or processor this Device belongs to.
 *
 */

Device.prototype = new Processor
extend(Device, ThreadAutomata)  // ThreadAutomata is the last class in the inheritance chain in order to keep its run method unredefinided
Device.prototype.constructor = Device


function Device(view, state, currentState, parent){
	/* Inheritance initialization */


	/* Class accesors*/
	var that    = this
	this._class = that

	var state = state
	if (!state)
	  state = Device.STATE

      state.self_keys().each(function(key){  // Define overridable functions
		   ["up", "steady", "down"].each(function(substate){
		     Device.prototype[state + "_" + substate] = function(){;}
		})})

		//todo: refactor to Hashes along with states
	this.solicitors = [
		/* suspended */	[
			function(){
				;
			},
			function(){
				;
			},
			function(){
				;
			}
		],
		/* running */ 	[
			function(){
				;
			},
			function (){
				/* TO DO */ ;
				this.gateRunner(this.now)
				this.childRunner(this.now);
				this.running_steady(this.now)
			},
			function(){
				;
			}
		],
		/* suspending */[
			function(){
				;
			},
			function(){
				/* TO DO */ ;
				this.childRunner(this.now);
			},
			function(){
				;
			}
		],
		/* killing */ 	[
			function(){
				;
			},
			function(){
				/* TO DO */ ;
				this.gateRunner(this.now)
			},
			function(){
				;
			}
		],
		/* killed */ 	[
			function(){
				;
			},
			function(){
				;
			},
			function(){
				;
			}
		]
	]
	/* Instance vars */
	if (view)
		this.view = (typeof (view) === "string"? document.getElementById(view) : view)
	this.lookup = new Lookup();
	this.eventDispatcher = new EventDispatcher(this.lookup);
	this.currentState = currentState ||
						{ 	previous:  state.suspended,
							current:   state.suspended,
							requested: state.running
						}
	this.gates		   = []

	/* privileged functions (mainly public static accessors)*/
	this.getSolicitors = function(){return that.solicitors;}
	this.getStates	   = function(){return state;}
	this.openDevice	   = _$innerObject(this, "device")
	/* construction */
	function initialize(){ // Use that. This would refer to the function object.
		that.eventDispatcher.device = that
		that.register(that.eventDispatcher, that.eventDispatcher.shift)
		if (that.self_events)
			that.eventDispatcher.joinPorts(that.self_events)
		ThreadAutomata.call(that, state, that.currentState, that.solicitors, parent || $Processor);
	}

	if (arguments.length)	// Avoid registering during prototype copy while inheritance process
		initialize();


}

/**
 * Device default states
 */

Device.STATE = new Enumeration("suspended", "running", "suspending", "killing", "killed")

/**
* @method state_substate
* Dynamic
*
* Default method to handle any state.
*
* ###Example
*
*     Device.prototype.running_steady = function(){;}
*
* When functionality is required, override the required method.
*/

/**
 * @method getSolicitors
 *
 * Return the array of solicitors.
 *
 * @return {Array} Array of three functions (up, steady and running) by state, packed in a global array.
 */

/**
 * @method getStates
 * Return the list of all possible states for this Device.
 *
 * @return {Array} List of states.
 */

/**
 * @method gateRunner
 * @private
 *
 * Simulates multithreading for each gate by calling the run method.
 */
Device.prototype.gateRunner = function(){

		for (var i=0; i<this.gates.length; i++) 
			this.gates[i].run( this.now, this.before )

}

/**
 * @method childRunner
 * @private
 *
 * Simulates multithreading for each device attached to this one.
 */
Device.prototype.childRunner = function(){
	if (this.currentState != this.getStates().killed) {
		this.now = arguments[0]
		for (var i in this.threads)
			try {
				this.threads[i].solicitor.call(this.threads[i].object, this.now);
			}
			catch (e) {

			}
	}

	// If they are devices we shall call them just in case they are running

}

/**
 * @method newGate
 *
 * Creates a new Object using a derived class of Gate and attaches it to the gates array own property.
 *
 * @param {String | HTMLElement} el See (@link Gate)
 * @param {Function} ClassCons Class constructor deriving from Gate.
 */
Device.prototype.newGate = function(el, ClassCons){
	try {
		var Cons = this.openDevice(ClassCons)
		var view = this.view || null
		var ob = new Cons(el, view)
                ob.device = this
		this.gates.push( ob )
		return ob
	} catch (e) {
		if ($K_debug_level >= $KC_dl.DEVELOPER)
			alert("No event handlers were found.\nException: " + e.toSource())
	}
}

/**
 * @method attend
 *
 * Generic meesage dispatcher. Seeks for a more specific message handler.
 *
 * @param {Date} date   Time in which the message was attended in the inqueue.
 * @param {Object} mssg Message object shifted from the message queue.
 *
 * ### Note:
 *
 *   To attend a message called "close" define:
 *
 *       Device.prototype.attend_close = function(){;}
 *
 *  Make the previous definition in a derived class.
 */
Device.prototype.attend = function(date, mssg){
	this["attend_"+ mssg.name](date, mssg)  // If attend_ method doesn't exist then we shall provide a generic dispatcher.
}

Device.prototype._y = function(htmlElement, stopAt){
	stopAt = stopAt || null
	if (typeof(stopAt) === "string")
		stopAt = document.getElementById(stopAt)
	if (stopAt !== htmlElement && htmlElement.offsetParent)
		return htmlElement.offsetTop + Device.prototype._y(htmlElement.offsetParent, stopAt)
	return 0
}

Device.prototype._x = function(htmlElement, stopAt){
	stopAt = stopAt || null
	if (typeof(stopAt) === "string")
		stopAt = document.getElementById(stopAt)
	if (stopAt && htmlElement && stopAt === htmlElement)
		return 0
	if (htmlElement.offsetParent)
		return htmlElement.offsetLeft + Device.prototype._x(htmlElement.offsetParent, stopAt)
	return 0
}

Device.prototype.y_calc = function(){
	if (this.view) {
		this.y = this._y(this.view)
		return this.y
	}
	return null
}

Device.prototype.x_calc = function(){
	if (this.view) {
		this.x = this._x(this.view)
		return this.x
	}
	return null
}

/**
 * @method fireEvent
 *
 * Notifies to all the listeners that this device has generated an event.
 *
 * @param {Object} mssg The message to be triggered.
 */
Device.prototype.fireEvent = function (mssg){
	for (var i=0; i<this.eventDispatcher.ports[mssg.name].length; i++)
		this.eventDispatcher.ports[mssg.name][i].eventDispatcher.enqueue(mssg)
}

/**
 * @method addPort
 *
 * Adds an specific port (reference to a listener) to the selected event listeners list.
 *
 * @param {Object} mssg_name The message to be triggered.
 * @param {Object} device Device to be added to the ports array
 *
 */
Device.prototype.addPort = function (mssg_name, device){
	this.eventDispatcher.addPort(mssg_name, device)
}

/**
 * @method newMessage
 *
 * Creates new message.
 *
 * @param {String} type Message type.
 * @param {String} name Name of the event
 * @param {String} data If defined, gives extra information about the event
 *
 */
Device.prototype.newMessage = function(type, name, data){
      // logger.innerHTML += "data: " +  systemEv(type , {name: name, data: data || "no extra data available"}, this).toSource() + "<br/>"
	if (type && name)
		return systemEv(type , {name: name, data: data || "no extra data available"}, this)
}

/**
 * @method sendMessage
 *
 * Sends a message to a particular device, without using the listeners list.
 *
 * @param {String} type Message type.
 * @param {String} name Name of the event
 * @param {String} data If defined, gives extra information about the event
 * @param {Object} receiptant Device that receives the message
 *
 */
Device.prototype.sendMessage = function(type, name, data, receiptant){
	receiptant.eventDispatcher.enqueue(this.newMessage(type, name, data))

}

/**
 * @method method_missing
 *
 * Throws an exception when a method is not defined, unless someone has used the
 * camel case version of an existing method. In that particular case it recovers
 * from the crash and executes the call.
 *
 * @param {String} method Name of the non-existing method.
 * @param {String} obj Name of the object to which the method applies
 * @param {Array} params List of the parameter taken by the method
 *
 */
Device.prototype.method_missing = function (method, obj, params){
  if (this.respond_to$U(method.underscore()))
    return method.underscore.apply(this, params)
  obj = obj || ""
  params = params || []
  throw(new MethodMissingError(method + " missing in " + obj + "::" + this.constructor.name +". Params: " + params.join(', ') ))
}

