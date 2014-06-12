/**
 * Multiprocess components / state machines
 * @author Txema
 * @version 1.00, june 2007
 */

Processor.prototype.constructor = Processor;

/**
 * Create a Processor to run threads.
 * lluviaProject provides a default processor $Processor in the global scope.
 *
 * @constructor Processor
 * @return				{Processor}	retuns a new processor.
 */
function Processor(){

	// Variables member
	this.now	 = new Date();
	this.events  = new Event();
	this.threads = new Array();
}


// Operations

/**
 * Add a thread in the execution queue
 * @method		register
 * @param		{Thread}    cObject		Is the caller object to be porocessed through the thread interface.
 * @param		{Function}  solicitorF		Control loop object. Typically "run".
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
 * @method		 kill
 * @param		{Thread}		rObject		Object to be removed from the execution queue.
 * @param		{Function}	solicitorF  As far as an object can be processed by several parallel solicitors function, one can be removed. (This is a fairly overenthusiastic feature indeed)
 */
Processor.prototype.kill = function(rObject, solicitorF){
	for (var i in this.threads)
		if (this.threads[i] == {object: rObject, solicitor: solicitorF})
			this.threads.slice(i,i+1);
}

/**
 * Execute all threads one step.
 *
 * @method		step
 */
Processor.prototype.step = function (date){

	this.now = date || new Date();
	try {
	  for (var i=0; i<this.threads.length; i++)
            this.threads[i].solicitor.call(this.threads[i].object, this.now);
    }
    catch (e) {

    }
}

/**
 * @method run
 * Execute all threads. Top processors are called by themselves.
 * Lower tiers can belong (be registered) in another's Processor#thread. Then
 * a date is passed as a parameter in order to keep lower time lags between
 * Thread#run calls. Thus, all registered threads are informed of the same (date)
 * time.
 *
 * @param {Date} date Parent's processor time.
 *
 */
Processor.prototype.run = function (date){
    this.now =  new Date();
    try {
	this.step(this.now)
    }
    catch (e) {

    }

    setTimeout(this.run.bind(this), 20);
}

/**
 * @method start
 *
 * Start Processor#run cycle.
 */
Processor.prototype.start = function(){
    this.run()
    return this;
}

/**
 * @method newThread
 * Executes periodically a function in a new Thread.
 *
 * Not tested. ruby -e "puts 'sorry ' * 20"
 *
 * ### Example
 *
 *    $Processor.newThread(function() {
 *      for (var i=0; i<1000; i++)
 *         "Love others as your code"
 *    })
 */
Processor.prototype.newThread = function(){
    var t = new Thread(null, this)

    t.run = Processor.prototype.newThread.block_given$U() || function() {;}
    return t;
}

/**
 *  @method get
 *  Stereotypical mirage fetcher. Get objects or functions passed as a reference or
 *  belonging to a class hierarchy.
 *  A object can be repeated as long as you can push an object twice in the threads array
 *  with the same or different solicitor function. Processor#get avoids repetion as
 *  in sql select distinct.
 *
 * @param {Object} object object or class reference.
 * @return {Array}  Array with collected objects or an empty array is anything is found.
 */
Processor.prototype.get = Processor.prototype.get = function (object) {
    var collect = []

    var len = this.threads.length
    for (var i=0; i<len; i++) {
	var candidate = this.threads[i].object
       if ( candidate && !collect.include$U(candidate) &&
	    ( candidate == object ||  candidate instanceof object )
	  )
      collect.push(candidate)
    }

    return collect
}

// Global Application Processor creation
$Processor = new Processor().start()



