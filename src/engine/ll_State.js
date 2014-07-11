/**
 * @class Engine.State
 * @extends Kernel.Foundation.DataType.VersionNumber
 * Defines each of the states of an Automata.
 *
 * ### Example
 *
 * Create a new State for an automata.
 *
 *     var a = new State("1.3.5")
 *
 * Then override run function to provide a default action
 * to be executed independently of the substate (up, steady or down).
 *
 *     a.run = function(name) {
 *         alert("Regime: " + this.regime.name + ", Mr. " + name)
 *     }
 *
 * Provide the substate action (driver)
 *
 *     a.run.steady = function(name) {
 *         alert("Hello all the time Mr. " + name")
 *     }
 *
 * Define the regime of your state (up, steady or down)
 *     a.regime = State.REGIME.steady
 *
 * Execute the state using this syntax:
 *
 *     a[a]("Jones")
 *
 *
 * ## Hooks
 *
 * Some extra additions can be used. State#before_hooks and State#after_hooks
 * are two arrays of functions to be called before and after the drivers with the
 * same parameters of State#run
 *
 * The after_hooks calls are appended with an array containing the response
 * of the general driver and the substate driver.
 *
 * Take a look to the following.
 *
 * ### Example
 *
 *
 *     var a = new State("1.3.5")
 *     a.door = "locked"
 *
 *     a.run = function(name) {
 *         if (this.door != "locked") {
 *             this.door = "opened"
 *             return true
 *         }
 *         return false
 *     }
 *
 *     a.run.steady = function(name) {
 *         if (this.door == "opened")
 *             return "2 people inside"
 *         return "Can't see anybody. The door is closed."
 *     }
 *     a.regime = State.REGIME.steady
 *
 *     a.before_hooks.push(function(obj) {
 *         obj.door = "unlocked"
 *     })
 *
 *
 *     a.after_hooks.push(function(obj, responses) {
 *         alert("The door is opened: " + responses[0] + "\n" +
 *             "I see: " + responses[1])
 *     })
 *     a[a]()
 *
 * The before hook is executed before the drivers and it unlocks the door.
 * The after driver shows two people and the door opened.
 *
 * obj is a parameter appended in before and after hooks and represents the
 * obj that is executing the hooks.
 *
 * The after_hooks receive an ectra parameter responses.
 *
 * 1. responses[0] is the response of the general driver, and
 * 1. responses[1] is the response of the substate driver.
 *
 */

State.prototype = new VersionNumber
State.prototype.constructor = State

/**
 * @method constructor
 *
 * @param  {String|VersionNumber} label. Any valid parameter in
 *                                {@link Kernel.Foundation.DataType.VersionNumber VersionNumber}
 *                                Constructor.
 */
function State(label) {
    /*  Don't check anything but existance.
        Just try to execute for profiling purposes.
    */
    VersionNumber.apply(this, arguments)
    var that = this
    this.before_hooks = []
    this.after_hooks = []

    Object.defineProperties(this, {
        before_hooks: {
            value: this.before_hooks,
            enumerable: false
        },
        after_hooks: {
            value: this.after_hooks,
            enumerable: false
        }
    })

    Object.defineProperty(this, "regime", {
        value: State.REGIME.up,
        writable: true,
        configurable: true
    })

    /* Override this.run for common actions */
    this.run = function() {}
    this[this] = function() {
        State.prototype._run.apply(that, arguments)
    }
}

/**
 * @property {VersionNumber} regime Current regime of the state: up, steady or down.
 */


/**
 * @property {Array} before_hooks List of functions for calling them before calling the
 * drivers.
 */


/**
 * @property {Array} after_hooks List of functions for calling them after calling the
 * drivers.
 */

/**
 * @method  _run
 * Controller that invokes the drivers. This method is non writable, non enumerable
 * and non configurable.
 */
State.prototype._run = function() {
    var response = []
    var args = Array.prototype.slice.call(arguments, 0)
    args.push(this)

    for (var i = this.before_hooks.length - 1; i >= 0; i--)
        this.before_hooks[i].apply(this, args)

    response[0] = this.run.apply(this, arguments)

    if (this.run[this.regime.name])
        response[1] = this.run[this.regime.name].apply(this, arguments)

    args.push(response)
    if (this.after_hooks.length)
        for (var i = this.after_hooks.length - 1; i >= 0; i--)
            this.after_hooks[i].apply(this, args)
}
Object.defineProperty(State.prototype, "_run", {
    value: State.prototype._run,
    enumerable: false,
    writable: false,
    configurable: false
})

/**
 * @property {Enumeration} REGIME
 * @static
 * Possible values for a state: up, steady and down.
 * up and down states provide a way politely enter and leave the state.
 */
State.REGIME = new Enumeration("up", "steady", "down")
State.NONE = new State("-1")