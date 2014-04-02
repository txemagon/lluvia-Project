Function.prototype.bind = function(object){
	var f = this
	return function(){ f.apply(object, arguments) }
}

Function.prototype.bind_params = function(){
	var args = arguments
	var f = this
	return function(){ f.apply(f, args) }
}

Function.prototype.yield = function(){
     for (var i=this.arguments.length-1; i>=0; i--)               
        if (typeof(this.arguments[i]) === "function")         
            return this.arguments[i].apply(this, arguments)   
    // We shall raise an error if we reach this point 
}    

/*
 * yield example
 * 
 * The last function parameter (if any) is a lambda.
 */
/*
function pepe(a, b, c){
     
     return a + b + c + pepe.yield(3) 
}  

alert( pepe(1, 2, 3, function(e){ return e + 2 }) )
*/

