/**
 * @class Engine.Automata
 *
 * Creates a state machine. A lluvia state machine has a continous and derivable state,
 * made of the previous, the current and the requested one. During state transition, several solicitor functions
 * get executed: down function of the current state, up solicitor of the requested state and finally we arrive to the
 * steady state.
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
 *
 * @param  {Object | Array}   states Possibles states of an automata (Enumeration).
 *                                   Array is an extesnsion for Hierarchical State Machines.
 * @param  {Object}   initialState	 Initial state of the automata.
 * @param  {Array}    solicitor		 State Manager functions. An array with three functions (up, steady, down).
 * @return {Automata}				 New created state machine automata..
 * @constructor
 */
Automata.prototype.constructor = Automata;

function Automata(states, solicitor, initial_state) {

    if (states instanceof Array)
        states = new(ApplyProxyConstructor(Enumeration, states))
    this.state = states ? states : {}

    // Always none equals -1
    this.state.none = State.NONE

    // todo: Make a proxyConstructor that handles the link via the this parameter.
    this.current = new AutomataGear(initial_state, this)

    this.solicitor = (solicitor || solicitor != null) ?
        solicitor :
        new Array(new Array(null, null, null));

    // State none doesn't execute anything, neither raises an error.

    this.solicitor[this.state.none] = [

        function() {
            return "none_up"
        },
        function() {
            return "none_steady"
        },
        function() {
            return "none_down"
        }
    ]
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
 * @method	  run
 * Behavior of the automata according to its internal state.
 * This function takes care of state transitions.
 *
 */
Automata.prototype.run = function() {
    return this.solicitor[this.current][0]()
        /*
    Automata.prototype.drive_state.apply(this, arguments)
    if (this.currentState.requested != this.state.none) {
        this.currentState.previous = this.currentState.current;
        this.currentState.current = this.currentState.requested;
        this.currentState.requested = this.state.none;
    }
    */
}