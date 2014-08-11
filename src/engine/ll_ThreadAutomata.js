ThreadAutomata.prototype = new Thread;
ThreadAutomata.extend(Automata);

ThreadAutomata.prototype.constructor = ThreadAutomata;

/**
 * @class Engine.ThreadAutomata
 * Creates an automata for atomic processing.
 */

/**
 * @method constructor
 *
 * @param {Object} state			Available automata states.
 * @param {Object} solicitor		Functions state managers.
 * @return {ThreadAutomata}			Newly created automata.
 */
function ThreadAutomata(state, solicitor, processor) {

    if (arguments.length) {
        Automata.call(this, state, solicitor);
        Thread.call(this, ThreadAutomata.prototype.run, processor);
    }
}


/**
 * Calls a function that manages the next activity in function
 * for the state of the object. It is responsible of state transitions through Automata#run.
 * The main difference between ThreadAutomata#run and Automata#run lies on
 * the type of the solicitor functions, designed to make atomic operations.
 *
 * @method	  run
 *
 */

ThreadAutomata.prototype.run = function(processors_time) {
    if (this.now)
        this.before = this.now
    this.now = processors_time
    Automata.prototype.run.call(this, this.now, this.before);
}