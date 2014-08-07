/**
 * @class Engine.StateGear
 * Drives the automata into different states.
 */

/**
 * @method  constructor
 *
 */

function StateGear(automata, initial_state) {
    this.automata = automata
    this.previous = State.NONE
    this.current = State.NONE
    this.requested = initial_state || State.NONE

}

StateGear.prototype.valueOf = function() {
    return this.current
}

StateGear.prototype.toString = function() {
    return this.current.toString()
}


/**
 * @method drive_state
 * Executes the solicitor functions related to the fsm state.
 * All arguments are passed to solicitors. If a new state is requested, it
 * spins the gear to next position.
 *
 */
StateGear.prototype.drive_state = function() {

    if (this.requested != this.state.none) {
        // Close old state
        var s = this.current
        s.regime = State.REGIME.down
        s[s].apply(s, arguments)

        // Spin the gear
        this.current.previous = this.current.current;
        this.current.current = this.current.requested;
        this.current.requested = this.state.none;

        // Open new state
        var s = this.current
        s.regime = State.REGIME.up
        s[s].apply(s, arguments)
        s.regime = State.REGIME.steady
    }

    return s[s].apply(s, arguments)
}

/**
 * @method zip
 * Assigns the function driver to the state object.
 *
 *    var solicitors = {
 *           walking: function() {
 *               return "I'm walking"
 *           },
 *           running: [
 *
 *               function() {
 *                   return "I'm running"
 *               }, {
 *                   slow:
 *
 *                       function() {
 *                           return "I'm running slow"
 *                       },
 *                   "slow.steady: function() {
 *                       return "But steadily"
 *
 *                       },
 *                   fast: function() {
 *                       return "I'm running fast"
 *                   }
 *               }
 *           ]
 *       }
 *
 * ## Notice
 *
 * Function drivers must come first in the Array
 * Only already defined states are valid attributes
 *
 * @param  {[type]} solicitors [description]
 * @return {[type]}            [description]
 */
StateGear.prototype.zip = function(solicitors, base_state) {
    base_state = base_state || this.automata.state

    function add_state(name, driver) {
        var base = base_state

        name = name.split(".")
        if (name.length == 1)
            base[i].run = driver
        else {
            while (name.length > 1) {
                var current
                try {
                    base = base[current = name.shift()]
                } catch (e) {
                    throw "State " + current + " is not defined."
                }
            }
            var regime = name.shift()
            var included = false
            State.REGIME.each(function(k, v) {
                if (k == regime)
                    included = true
            })
            if (!included)
                throw "Invalid regime " + regime + "."

            base.run[regime] = driver
        }
    }

    for (var i in solicitors) {
        if (solicitors[i] instanceof Function)
            add_state(i, solicitors[i])
        else if (solicitors[i] instanceof Array) {
            add_state(i, solicitors[i].shift())
            this.zip(solicitors[i][0], base_state[i])
        }

    }
}