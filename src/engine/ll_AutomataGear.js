/**
 * @class AutomataGear
 */

function AutomataGear(initial_state) {
    this.previous = State.NONE
    this.current = State.NONE
    this.requested = initial_state || State.NONE

}