Automata.prototype.constructor = Automata;

/**
 * @classDescription creates a state machine. A lluvia state machine has a continous and derivable state,
 * made of the previous, the current and the requested one. During state transition, several solicitor functions
 * get executed: down function of the current state, up solicitor of the requested state and finally we arrive to the
 * steady state.
 *
 * @param  {Object}   states		 Possibles states of an automata.
 * @param  {Object}   initialState	 Initial state of the automata.
 * @param  {Array}    solicitor		 State Manager functions. An array with three functions (up, steady, down).
 * @return {Automata}				 New created state machine automata..
 * @constructor
 */
function Automata(states, initialState, solicitor){

	this.state = states == null ? { none: -1 } : states;
	this.state.none = -1
	this.state_name = []
	for (var key in this.state)
		if (this.state.hasOwnProperty(key))
			this.state_name[this.state[key]] = key

	this.stateChange  = {	up: 0, steady:1, down: 2};
	this.currentState = initialState != null ? initialState:
						{	previous  : this.state.none,
							current   : this.state.none,
							requested : this.state.none };
	this.solicitor = (solicitor || solicitor != null) ? solicitor : new Array(new Array(null, null, null));
}


/**
 * @method drive_state
 * Executes the solicitor functions related to the fsm state.
 * All arguments are passed to solicitors.
 *
 */
Automata.prototype.drive_state = function() {

	var base   = this.state_name[this.currentState.current]
	var down   = base + "_down"
	var steady = base + "_steady"
	var up     = base + "_up"

	if ( this.currentState.requested != this.state.none ){
		this.solicitor[this.currentState.current][this.stateChange.down].apply(this, arguments)
		if ( this[down])
			this[down]()

		this.solicitor[this.currentState.requested][this.stateChange.up].apply(this, arguments)
		if (this[up])
			this[up]()

	}

	this.solicitor[this.currentState.current][this.stateChange.steady].apply(this, arguments)
	if (this[steady])
		this[steady]()

}

/**
 * @method	  run
 * Behavior of the automata according to its internal state.
 * This function takes care of state transitions.
 *
 */
Automata.prototype.run = function(){

	Automata.prototype.drive_state.apply(this, arguments)
	if ( this.currentState.requested != this.state.none ){
		this.currentState.previous  = this.currentState.current;
		this.currentState.current   = this.currentState.requested;
		this.currentState.requested = this.state.none;
	}
}
