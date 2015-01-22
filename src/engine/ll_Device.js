/**
 * @class Engine.Device
 * @extends Processor
 * @mixins Engine.ThreadAutomata
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
 *     	this.new_gate("llaveEnMano", ButtonGate)
 *      // Device#new_gate inject a device property inside
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
 * @property {Object} event_dispatcher event_dispatcher object. Handles in and out communications.
 * @property {Object} current_state    Holds the current state of the device.
 * @property current_state.previous    Record of the previous state.
 * @property current_state.current     State we are currently in.
 * @property current_state.requested   State to change in the next run.
 *
 * @property {Array} gates List of all attached Gates.
 */

Device.prototype = new Processor
Device.extend(ThreadAutomata) // ThreadAutomata is the last class in the inheritance chain in order to keep its run method unredefinided
Device.prototype.constructor = Device

/**
 * Device default states
 * @property {Object} Device.STATE Enumeration constant.
 */

Device.STATE = new EnumerationOf(State, ["suspended", "running", "suspending", "killing", "killed"])

Device.default_solicitors = {
            running: function() {
                this.gate_runner(that.now)
                this.child_runner(that.now);
            },
            suspending: function() {
                this.child_runner(that.now);
            },
            killing: function() {
                this.gate_runner(that.now)
            }
        }

/**
 * @method constructor
 * Creates a Device.
 *
 * @param {String | HTMLElement} [view] (optional) A possible view associated with the Device.
 * @param {Object} [state] (optional) Default Device states -as ll_Enumeration- are: suspended, running, suspending, killing and killed.
 * @param {Object} [current_state={ previous: state.suspended, current: state.suspended, requested: state.running }] Sets the initial conditions for the device to start.
 * @param {Object} [parent=Processor] Parent Device or processor this Device belongs to.
 *
 */

function Device(view, state, solicitors, parent) {
    /* Class accesors*/
    var that = this
    this._class = that

    /* construction */
    function initialize() { // Use that. 'this' would refer to the function object.

        state = state  || new EnumerationOf(State, Device.STATE)
        that.solicitors = Device.default_solicitors

        /* Instance vars */
        if (view)
            that.view = (typeof(view) === "string" ? document.getElementById(view) : view)

        that.event_dispatcher = new EventDispatcher();
        that.gates = []
        that.open_device = _$innerObject(that, "device")

        that.event_dispatcher.device = that
        that.register(that.event_dispatcher, that.event_dispatcher.shift)
        if (that.self_events)
            that.event_dispatcher.joinPorts(that.self_events)
        //todo: Look for world.prototype.running_slow_steady and friends
        ThreadAutomata.call(that, state, that.solicitors, parent || $Processor);
        that.switch("running")
    }

    if (arguments.length) // Avoid registering during prototype copy while inheritance process
        initialize();


}

/**
 * @method gate_runner
 * @private
 *
 * Simulates multithreading for each gate by calling the run method.
 */
Device.prototype.gate_runner = function() {

    for (var i = 0; i < this.gates.length; i++)
        this.gates[i].run(this.now, this.before)

}

/**
 * @method child_runner
 * @private
 *
 * Simulates multithreading for each device attached to this one.
 */
Device.prototype.child_runner = function() {
    if (this.current_state != this.state.killed) {
        this.now = arguments[0]
        for (var i in this.threads)
            try {
                this.threads[i].solicitor.call(this.threads[i].object, this.now);
            } catch (e) {

            }
    }

    // If they are devices we shall call them just in case they are running

}

/**
 * @method new_gate
 *
 * Creates a new Object using a derived class of Gate and attaches it to the gates array own property.
 *
 * @param {String | HTMLElement} el See (@link Gate)
 * @param {Function} ClassCons Class constructor deriving from Gate.
 */
Device.prototype.new_gate = function(el, ClassCons, config) {
    try {
        var Cons = this.open_device(ClassCons)
        var view = this.view || null
        var ob = new Cons(el, view, config)
        ob.device = this
        this.gates.push(ob)
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
Device.prototype.attend = function(date, mssg) {
    this["attend_" + mssg.name](date, mssg) // If attend_ method doesn't exist then we shall provide a generic dispatcher.
}

Device.prototype._y = function(htmlElement, stopAt) {
    stopAt = stopAt || null
    if (typeof(stopAt) === "string")
        stopAt = document.getElementById(stopAt)
    if (stopAt !== htmlElement && htmlElement.offsetParent)
        return htmlElement.offsetTop + Device.prototype._y(htmlElement.offsetParent, stopAt)
    return 0
}

Device.prototype._x = function(htmlElement, stopAt) {
    stopAt = stopAt || null
    if (typeof(stopAt) === "string")
        stopAt = document.getElementById(stopAt)
    if (stopAt && htmlElement && stopAt === htmlElement)
        return 0
    if (htmlElement.offsetParent)
        return htmlElement.offsetLeft + Device.prototype._x(htmlElement.offsetParent, stopAt)
    return 0
}

Device.prototype.y_calc = function() {
    if (this.view) {
        this.y = this._y(this.view)
        return this.y
    }
    return null
}

Device.prototype.x_calc = function() {
    if (this.view) {
        this.x = this._x(this.view)
        return this.x
    }
    return null
}

/**
 * @method fire_event
 *
 * Notifies to all the listeners that this device has generated an event.
 *
 * @param {Object} mssg The message to be triggered.
 */
Device.prototype.fire_event = function(mssg) {
    for (var i = 0; i < this.event_dispatcher.ports[mssg.name].length; i++)
    /* Attending a mssg in one queue remains different from another queue */
        this.event_dispatcher.ports[mssg.name][i].event_dispatcher.enqueue(mssg.clone())

}

/**
 * @method add_port
 *
 * Adds an specific port (reference to a listener) to the selected event listeners list.
 *
 * @param {Object} mssg_name The message to be triggered.
 * @param {Object} device Device to be added to the ports array
 *
 */
Device.prototype.add_port = function(mssg_name, device) {
    this.event_dispatcher.add_port(mssg_name, device)
}

/**
 * @method new_message
 *
 * Creates new message.
 *
 * @param {String} type Message type.
 * @param {String} name Name of the event
 * @param {String} data If defined, gives extra information about the event
 *
 */
Device.prototype.new_message = function(type, name, data) {
    // logger.innerHTML += "data: " +  systemEv(type , {name: name, data: data || "no extra data available"}, this).toSource() + "<br/>"
    if (type && name)
        return systemEv(type, {
            name: name,
            data: data || "no extra data available"
        }, this)
}

/**
 * @method send_message
 *
 * Sends a message to a particular device, without using the listeners list.
 *
 * @param {String} type Message type.
 * @param {String} name Name of the event
 * @param {String} data If defined, gives extra information about the event
 * @param {Object} receiptant Device that receives the message
 *
 */
Device.prototype.send_message = function(type, name, data, receiptant) {
    receiptant.event_dispatcher.enqueue(this.new_message(type, name, data))

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
Device.prototype.method_missing = function(method, obj, params) {
    if (this.respond_to$U(method.underscore()))
        return method.underscore.apply(this, params)
    obj = obj || ""
    params = params || []
    throw (new MethodMissingError(method + " missing in " + obj + "::" + this.constructor.name + ". Params: " + params.join(', ')))
}