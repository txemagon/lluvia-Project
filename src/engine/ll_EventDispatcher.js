/**
 * @class Engine.EventDispatcher
 * @extends ThreadAutomata
 *
 * Handle in and out asynchronous communications via a message queue
 * and a listener mechanism (ports).
 *
 * @constructor
 * Creates a EventDispatcher.
 
 *
 */

EventDispatcher.prototype = new ThreadAutomata
EventDispatcher.prototype.constructor = EventDispatcher

function EventDispatcher() {
    // Private static vars
    var that = this; // Class reference for static functions
    this.ids = 0
    this.ports = {
        // List event listeners. "app_down": []
    }

    // Public vars
    this.inqueue = []
    this.clss = that // Reference for static members to be used inside instances

    // Privileged methods
    this.getId = function() {
        return ++that.ids;
    }

}

/**
 * @method enqueue
 *
 * Receives incoming messages stamping the arrival number. The arrival
 * order can be used to identificate messages.
 *
 * @param {Object} mssg Message object pushed into the message queue.
 *
 * @return {Number} Order of arrival
 *
 */
EventDispatcher.prototype.enqueue = function(mssg) {
    var ev = this
    mssg.received = {
        id: ev.getId(),
        time: new Date()
    };
    this.inqueue.push(mssg)
    return mssg.received.id
}

/**
 * @method addPort
 *
 * Adds an specific device referer in the list of event listeners for a
 * particular event.
 *
 * @param {String} event Name of the event to listen
 * @param {Object} device Device to be added to the ports array (dock).
 *
 */
EventDispatcher.prototype.addPort = function(event, device) {
    if (this.ports[event])
        this.ports[event].push(device)
}

/**
 * @method joinPorts
 *
 * Builds an empty dock (port array) for every event.
 *
 * @param {Array} listArray
 */
EventDispatcher.prototype.joinPorts = function(listArray) {
    for (var i = 0; i < listArray.length; i++)
        this.ports[listArray[i]] = []
}

/**
 * @method delPort
 *
 * Removes a listener from the dock.
 *
 * @param {Object} event Event that we were listening to
 * @param {Object} device Device to be deleted to the ports array
 *
 */
EventDispatcher.prototype.delPort = function(event, device) {
    if (this.clss.ports[event])
        for (var i = 0; i < this.clss.ports.length; i++)
            if (this.clss.ports[i] === device)
                this.clss.ports[i].splice(i, 1)
}

/**
 * @method fireEvent
 *
 * Notifies to all the listeners that this device has generated an event.
 *
 * @param {Object} event Event generated
 */
EventDispatcher.prototype.fireEvent = function(event) {
    if (this.clss.ports[event.name])
        for (var i = 0; i < this.clss.ports[event.name].length; i++)
            this.clss.ports[event.name][i](event);
}

/**
 * @method shift
 *
 * Extract messages from the queue and send them
 * to the device default dispatcher. If the dispatcher
 * has closed the message being processed then it removes
 * it from the message queue. Otherwise is kept until
 * operations around this message are finished.
 *
 * @return {Boolean} true Confirms removal
 */
EventDispatcher.prototype.shift = function() { //attend the inqueue
    for (var i = 0; i < this.inqueue.length; i++)
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
 * @method run
 *
 * Drives the incoming message queue.
 *
 * @return {Boolean} true
 */
EventDispatcher.prototype.run = function() {
    return shift.apply(this, arguments)
}