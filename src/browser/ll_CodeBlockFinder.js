/**
 * @class CodeBlockFinder
 *
 * Pushdown Automaton for identifying code blocks
 *
 * @param {String} snippet A text containing the code block to search for.
 * @param {(Number | String | RegExp)} [start_after] First point to start looking at.
 * @param {Object} [delimiter] Code block delimiters
 * @param {String} delimiter.open  One character string to open code blocks
 * @param {string} delimiter.close One character strint to close code blocks
 *
 * **Note:** When delimiter is larger than one character then tokenization is 
 * required.
 *
 *    ###Example:
 *    var code = "for {var i=0; i<3; i++){      \n\
 *                   alert("hello " + i)        \n\
 *                 }                            \n\
 *                                              \n\
 *                 function name(){             \n\
 *                   function inner_function(){ \n\
 *                     ;                        \n\
 *                     }                        \n\
 *                    ;                         \n\
 *                 }                            \n\
 *                                              \n\
 *                 function main(){;}              "
 *    (new CodeBlockFinder(code, /function\s+name/))
 */

function CodeBlockFinder(snippet, start_after, delimiters){
	delimiters = delimiters || {}
	delimiters.open  = delimiters.open  || '{'
    delimiters.close = delimiters.close || '}'
    this.delimiters = delimiters
    this.search_start = 0
    
    if (start_after){
	    if (typeof(start_after) === "number")
	    	this.search_start = start_after
	    if (start_after.constructor.name == "String" ||
	    	start_after.constructor.name == "RegExp"    )
	    	this.search_start = snippet.search(start_after)
    }
    if (this.search_start < 0)
        throw "Impossible to set up the CodeBlockFinder" +
              "with params: " + arguments.toSource()
    
    this.source    = snippet
    this.reset()
}

CodeBlockFinder.States  = new Enumeration("searching", "scanning", "ended")

/**
 * Reset the finite state Machine
 * 
 * @return {void} 
 */
CodeBlockFinder.prototype.reset = function(){
	this.initial   = this.search_start
    this.final     = this.search_start
    this.status    = CodeBlockFinder.States.searching
    this.delimiter = this.delimiters.open  
    this.nested    = 0
}

/**
 * Start the Pushdown Automaton
 * 
 * @return {String} Returns a complete code block.
 */
CodeBlockFinder.prototype.start = function(){
	var car  = null 
	var text = []
    while(car = this.source[this.initial]){
    	switch(this.status){

    		case CodeBlockFinder.States.searching:
	    		if (car == this.delimiter){
	    			text.push(car)
	    			this.delimiter = this.delimiters.close 
	    			this.status    = CodeBlockFinder.States.scanning
	    		}      
	    		break;

	    	case CodeBlockFinder.States.scanning:
	    	    text.push(car)
	    	    if (car == this.delimiters.open)
	    	    	this.nested++
	    		if (car == this.delimiter){
	    			if (this.nested > 0)
	    				this.nested--
	    			else
	    			    this.status = CodeBlockFinder.States.ended
	    		}      
	    		break;

	    	case CodeBlockFinder.States.ended:
	    	   this.text = text.join("")
	    	   return this.text

	    	default:
	    	  throw "Inconsistent state parsing code block"
	    	  break;
    	}
    	this.initial++
    }

    return ""
}

