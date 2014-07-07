Thread.prototype.constructor = Thread;

/**
 * @class Engine.Thread
 * abstract class (future interface/module) to instantiate executions threads.
 */

/**
 * @method constructor
 *
 * @param  {Function} 	    solicitor Function attending processor calls.
 * @return {Thread} 	    New execution thread
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
 * @method    run
 * State machine manager.
 * Thread execution step. Is an abstract method.
 *
 */
Thread.prototype.run = function(processors_time){
	this.now = processors_time
	throw "The solicitor function remains still undefined."
}

