/**
 * @author txema
 */

// Device.prototype = new ThreadAutomata
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
		state = new Enumeration("suspended", "running", "suspending", "killing", "killed")
      
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
		that.currentState.requested = state.running
		ThreadAutomata.call(that, state, that.currentState, that.solicitors, parent || $Processor);
	}

	if (arguments.length)	// Avoid registering during prototype copy while inheritance process
		initialize();	
		
		
}

Device.prototype.gateRunner = function(){
		for (var i=0; i<this.gates.length; i++)
			this.gates[i].run(this.now, this.before)	
}

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

Device.prototype.attend = function(date, mssg){
	this["attend_"+ mssg.name](date, mssg)  // If attend_ method doesn't exist then whe shall provide a generic dispatcher.
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

Device.prototype.fireEvent = function (mssg){
	for (var i=0; i<this.eventDispatcher.ports[mssg.name].length; i++)
		this.eventDispatcher.ports[mssg.name][i].eventDispatcher.enqueue(mssg)
}

Device.prototype.addPort = function (mssg_name, obj){
	this.eventDispatcher.addPort(mssg_name, obj)
}

Device.prototype.newMessage = function(type, name, data){
      // logger.innerHTML += "data: " +  systemEv(type , {name: name, data: data || "no extra data available"}, this).toSource() + "<br/>"
	if (type && name)
		return systemEv(type , {name: name, data: data || "no extra data available"}, this)
}

Device.prototype.sendMessage = function(type, name, data, receiptant){
	receiptant.eventDispatcher.enqueue(this.newMessage(type, name, data))
	
}

Device.prototype.method_missing = function (method, obj, params){
  if (this.respond_to$U(method.underscore()))
    return method.underscore.apply(this, params)
  obj = obj || ""
  params = params || []
  throw(new MethodMissingError(method + " missing in " + obj + "::" + this.constructor.name +". Params: " + params.join(', ') ))
}


/*
/*
 * EXAMPLE APP DEVICE
 */

/* ButtonGate Example 
ButtonGate.prototype = new Gate
ButtonGate.prototype.constructor = ButtonGate

function ButtonGate(el){ 
	if (arguments.length)
		Gate.call(this, el)
}
*/
/* No 'device' references in the constructor 
	
	
ButtonGate.prototype.do_onclick = function(event, element){
	alert("You have made click.")
}


TryApp.prototype = new Device
TryApp.prototype.constructor = TryApp
*/

/*
function TryApp(){
	/* self reference for static methods 
	var that = this;
	
	/* class reference for instance objects 
	this._class = that
	
	
	/* private static vars 
	Device.call(this, null)
	this.newGate("llaveEnMano", ButtonGate)
	this.solicitors[this.state.running][this.stateChange.steady] = function(){
		that.gates[0].panel.innerHTML = new Date()
	}
	
}
*/

/*
 * We have to be very carefull with non idempotent methods (specially function references),
 * because they are called twice during inheritance processes. Once in xxx.prototype = new yy
 * and another time at object initialization " yyy.call(xxx, params) "
 * 
 * Third generation inheritance generates constructor calls with null arguments 
 */

