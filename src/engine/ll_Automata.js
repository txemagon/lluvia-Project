/**
 * @class Engine.Automata
 *
 * Creates a state machine. A lluvia state machine has a continous and derivable state,
 * made of the previous, the current and the requested one. During state transition, several solicitor functions
 * get executed: down function of the current state, up solicitor of the requested state and finally we arrive to the
 * steady state.
 * @uses Kernel.Foundation.Enumerable.EnumerationOf
 * @uses Engine.State
 * @uses  Engine.StateGear
 *
 * ## States
 *
 * States refers to each of the states of a Finite Machine Automaton. See {@link Engine.State State}
 * for a very detailed explanation.
 *
 * ### Warning
 *
 *   Avoid using run for naming a state.
 *
 * ## Solicitors
 *
 * Solicitors are the drivers that run every single {@link Engine.State state}. Despite
 * you can manually add the drivers to every state, the Automata constructor comes with a
 * facility to specify all the drivers at once.
 *
 * Define an object as in the following example to be used as the solicitor constructor param:
 *
 *     {
 *            walking: function() {
 *                return "I'm walking"
 *            },
 *            running: [
 *
 *                function() {
 *                    return "I'm running"
 *                }, {
 *                    slow: function() {
 *                        return "I'm running slow"
 *                    },
 *                    "slow.steady": function() {
 *                        return "But steadily"
 *                    },
 *                    fast: function() {
 *                        return "I'm running fast"
 *                    }
 *                }
 *            ]
 *        }
 *
 * See that when no substates are given you can directly define a function driver.
 * Notice too, that defining a regime driver is made by typing between quotes
 */

/**
 * @method constructor
 *
 * ## Example
 *
 *     var state = new Enumeration("initial", "running", "sleeping")
 *     var a = new Automata( states,
 *                          {previous:  state.initial,
 *                           current:   state.initial,
 *                           requested: state.running })
 *
 *
 * or, for nested states:
 *
 *     var a = new Automata(["killing", ["running", ["phase1", "phase2"], "supended" ]])
 *
 * If you want to request a given state upon start, please mark with an asterisk, as in this example.
 *
 *     var a = new Automata(["killing", ["running", ["*phase1", "phase2"], "supended" ]])
 *
 * @param  {Object | Array}   states Possibles states of an automata (Enumeration).
 *                                   Array is an extesnsion for Hierarchical State Machines.
 *                                   Avoid calling run to a state.
 * @param  {Array}    solicitor		 State Manager functions. An array with three functions (up, steady, down).
 * @return {Automata}				 New created state machine automata..
 * @constructor
 */
Automata.prototype.constructor = Automata;

function Automata(states, solicitor) {
    var that = this

    function find_initial_state(state_level, initial_state) {
        initial_state = initial_state || ""

        for (var i = 0; i < state_level.length; i++) {
            if (state_level[i] instanceof Array) {
                initial_state += "." + state_level[i - 1]
                return find_initial_state(state_level[i], initial_state)
            }
            if (Object.prototype.toString.call(state_level[i]) === "[object String]") {
                if (/^\*/.test(state_level[i])) {
                    state_level[i] = state_level[i].substring(1)
                    return initial_state + "." + state_level[i]
                }
            }
        }

    }

    var i_state = find_initial_state(states).substring(1).split(".")

    if (states instanceof Array)
        states = new(ProxyConstructor(EnumerationOf, State, states))
    this.state = states ? states : new Enumeration()

    this.state.each(function(k, v) {
        v.owner = that
    })

    // Always none equals to -1
    this.state.none = new State(State.NONE)

    var initial_state
    for (initial_state = this.state; i_state.length; initial_state = initial_state[i_state.shift()]);

    // todo: Make a proxyConstructor that handles the link via the this parameter.
    this.current = new StateGear(this, initial_state)
    this.current.zip(solicitor)
}

/**
 * @property {Enumeration} state Group of constants representing the
 *                               numbers for every possible state.
 *
 * ### Example
 *
 *     this.state = new Enumeration("killing", "running", ["phase1", "phase2"], "supended")
 *     //=> {
 *     //=>    killing: 	{0:{}},
 *     //=>    running: 	{1:{}, phase1:{1:{1:{}}}, phase2:{1:{2:{}}}},
 *     //=>    supended: 	{2:{}})
 *     //=> }
 *
 * Every value, despite it is actually an object, it behaves as a number.
 *
 *     this.state.running.phase2 == 2
 *     //=> true
 *
 * And keeps track of its path.
 *
 *     this.state.running.phase2.toString()
 *     //=> "1.2"
 *
 * Entrusted with the gifts of Enumeration we cand do:
 *
 *     this.state.keys()
 *     //=> ["killing", "running", "supended"]
 *
 * and
 *
 *     this.state.running.branches()
 *     //=> ["phase1", "phase2"]
 *
 *
 * And because of the special VersionNumber method toString and the mathematical ring
 * composed by VersionNumber, InterleavedArray and Enumerate we can state:
 *
 *     // InterleavedArray mate.
 *     var i = new InterleavedArray("a", "b", ["b1", "b2"], "c")
 *     i[this.state.running.phase1]
 *     //=> "b1"
 *
 */


/**
 * @method switch
 * Selects a new state to be updated to in next run.
 *
 * @param  {String | State} state this.state.running.slow or "running.slow" for instance.
 */
Automata.prototype.switch = function(state) {
    if (Object.prototype.toString.call(state) == "[object String]") {
        state = state.split(".")
        var s
        for (s = this.state; state.length; s = s[state.shift()]);
        state = s
    }
    this.current.requested = state
}


/**
 * @method	  run
 * Behavior of the automata according to its internal state.
 * This function takes care of state transitions.
 *
 */
Automata.prototype.run = function() {
    return this.current.drive_state()
}