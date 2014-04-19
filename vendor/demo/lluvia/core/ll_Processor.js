/**
 * Multiprocess components / state machines
 * @author Txema
 * @version 1.00, june 2007
 */


Processor.prototype.constructor = Processor;

/** 
 * @classDescription 	create a Processor to run threads.
 * @return 				{Processor}	retuns a new processor.
 * @constructor 
 */
function Processor(){
	
	// Variables member
	this.now 	    = new Date();
	this.events     = new Event();
	this.threads 	= new Array();
}


// Operations 

/**
 * Add a thread in the execution queue
 * @memberOf 	{Processor}
 * @method 		register
 * @param 		{Thread}    cObject 		Is the caller object to be porocessed through the thread interface.
 * @param 		{Function}  solicitorF		Control loop object. Typically "run".
 */
Processor.prototype.register = function(cObject, solicitorF){
	var obj = null
	var fun = null
	if (cObject){
		obj = cObject
		if (solicitorF)
			fun = solicitorF
		else if (cObject.run)
			fun = cObject.run
		if (!fun)
			throw "The current processor can´t get a valid solicitor"
			
	}
	
	this.threads.push({object: cObject, solicitor: (solicitorF? solicitorF: cObject.run) });
	
}

/**
 * Removes a thread out of the execution queue.
 *
 * @memberOf 	{Processor}
 * @method 		 kill
 * @param 		{Thread} 		rObject 	Object to be removed from the execution queue.
 * @param 		{Function}  	solicitorF  As far as an object can be processed by several parallel solicitors function, one can be removed. (This is a fairly overenthusiastic feature indeed)
 */
Processor.prototype.kill = function(rObject, solicitorF){
	for (var i in this.threads)
		if (this.threads[i] == {object: rObject, solicitor: solicitorF})
			this.threads.slice(i,i+1);
}

/**
 * Execute all threads one pass.
 * 
 * @memberOf 	{Processor}
 * @method 		run
 */
Processor.prototype.run = function (){
	
	this.now = new Date();
	try {
	  for (var i in this.threads)
        this.threads[i].solicitor.call(this.threads[i].object, this.now);
    } 
    catch (e) {
    
    }

	setTimeout(this.run.bind(this), 10); 	
}

Processor.prototype.start = function(){
	this.run()
	return this;
}

Processor.prototype.newThread = function(){
	var t = new Thread(null, this)
	t.run = function(){ 
		t.run.yield(); // Yield smthg in near future. Not tested yet.
	}
	return t;
}

// Global Application Processor creation
$Processor = new Processor().start()

Thread.prototype.constructor = Thread;

/**
 * @classDescription abstract class (future interface/module) to instantiate executions threads.
 *
 * @param  {Function} 	    solicitor Function attending processor calls.
 * @return {Thread} 		New execution thread
 * @constructor
 */
function Thread(solicitor, processor){
	this.before = new Date()
	this.now = processor? processor.now: new Date();
	if (!solicitor) 
		solicitor = this.run;
	
	if (processor && processor instanceof Processor) 
		processor.register(this, solicitor); 
}
	
	

/**
 * Thread execution step. Is an abstract method.
 * 
 * @memberOf  {Thread}
 * @method    run	State machine manager.
 */
Thread.prototype.run = function(processors_time){
	this.now = processors_time
	throw "The solicitor function remains still undefined." 
}

Automata.prototype.constructor = Automata;

/**
 * @classDescription creates a state machine. A lluvia state machine has a continous and derivable state,
 * made of the previous, the current and the requested one. During state transition, several solicitor functions
 * get executed: down function of the current state, up solicitor of the requested state and finally we arrive to the
 * steady state.
 * 
 * @param  {Object}   states	     Possibles states of an automata.
 * @param  {Object}   initialState	 Initial state of the automata.
 * @param  {Array}    solicitor		 State Manager functions. An array with three functions (up, steady, down).
 * @return {Automata} 				 New created state machine automata..
 * @constructor
 */
function Automata(states, initialState, solicitor){
	
	this.state = states == null? {none: -1}: states;
	
	this.stateChange  = {	up: 0, steady:1, down: 2};
	this.currentState = initialState != null? initialState: 
						{	previous :this.state.none, 
							current  :this.state.none, 
							requested:this.state.none};
	this.solicitor = (solicitor || solicitor != null)? solicitor: new Array(new Array(null, null, null));
}

/**
 * Behavior of the automata according to its internal state.
 * This function takes care of state transitions.
 * 
 * @memberOf {Automata}
 * @method	  run
 */

Automata.prototype.run = function(){
	if (this.currentState.requested != this.state.none){
		this.solicitor[this.currentState.current][this.stateChange.down].call(this);
		this.solicitor[this.currentState.requested][this.stateChange.up].call(this);
		this.currentState.previous  = this.currentState.current;
		this.currentState.current   = this.currentState.requested;
		this.currentState.requested = this.state.none;
	}
}

ThreadAutomata.prototype  = new Thread;
extend(ThreadAutomata, Automata);

ThreadAutomata.prototype.constructor = ThreadAutomata;

/**
 * @classDescription Creates an automata for atomic processing.
 * 
 * @param {Object} state			Available automata states.
 * @param {Object} currentState	    Initial automata state.
 * @param {Object} solicitor		Functions state managers.
 * @return {ThreadAutomata}			Newly created automata.
 * @constructor
 */
function ThreadAutomata(state, currentState, solicitor, processor){
	if (arguments.length){
		Automata.call(this, state, currentState, solicitor);
		Thread.call(this, ThreadAutomata.prototype.run, processor);
	}
}


/**
 * Calls a function that manages the next activity in function
 * for the state of the object. It is responsible of state transitions through Automata#run.
 * The main difference between ThreadAutomata#run and Automata#run lies on
 * the type of the solicitor functions, designed to make atomic operations.
 * 
 * @memberOf {ThreadAutomata}
 * @method	  run
 * 	
 */

ThreadAutomata.prototype.run = function(processors_time){
	if (this.now)
		this.before = this.now
	this.now    = processors_time
	Automata.prototype.run.call(this);
	
	if (this.solicitor[this.currentState.current][this.stateChange.steady]) 
		this.solicitor[this.currentState.current][this.stateChange.steady].call(this, this.now, this.before);
}


