/**
 * @class AutomataGear
 * Drives the automata into different states.
 */

/**
 * @method  constructor
 *
 */

function AutomataGear(initial_state, automata) {
    this.previous = State.NONE
    this.current = State.NONE
    this.requested = initial_state || State.NONE

}

AutomataGear.prototype.value = function() {
    return this.current
}

AutomataGear.prototype.toString = function() {
    return this.current.toString()
}
/**
 * @method drive_state
 * Executes the solicitor functions related to the fsm state.
 * All arguments are passed to solicitors.
 *
 */
AutomataGear.prototype.drive_state = function() {

    var base = this.state_name[this.currentState.current]
    var down = base + "_down"
    var steady = base + "_steady"
    var up = base + "_up"

    if (this.currentState.requested != this.state.none) {
        this.solicitor[this.currentState.current][this.stateChange.down].apply(this, arguments)
        if (this[down])
            this[down]()

        this.solicitor[this.currentState.requested][this.stateChange.up].apply(this, arguments)
        if (this[up])
            this[up]()

    }

    this.solicitor[this.currentState.current][this.stateChange.steady].apply(this, arguments)
    if (this[steady])
        this[steady]()

}