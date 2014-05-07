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

