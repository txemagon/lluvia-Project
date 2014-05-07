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
	this.now 	 = new Date();
	this.events  = new Event();
	this.threads = new Array();
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
 * Execute all threads one step.
 *
 * @memberOf 	{Processor}
 * @method 		step
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
 * Execute all threads.
 *
 * @memberOf 	{Processor}
 * @method 		run
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



