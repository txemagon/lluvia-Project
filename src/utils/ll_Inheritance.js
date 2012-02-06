/**
 * Generic Utilities.
 * 
 * @author Txema
 * @version 1.00 June 2007
 * @translated by Antonio Carhuatocto
 */

//Method 1 inheritance (allow multiple inheritance)

/**
 * Performs inheritance operations, not implemented on JavaScript.
 * 
 * @param {Object} derivative Class that derives
 * @param {Object} superclass Parent Class
 */
function extend(derivative, superclass) {
    var sConstructor = superclass.toString();
    var aMatch = sConstructor.match( /\s*function (.*)\(/ );
    if ( aMatch != null ) { 
		derivative.prototype[aMatch[1]] = superclass; 
	}
    for (var m in superclass.prototype) {
        derivative.prototype[m] = superclass.prototype[m];
    }
}


//Method 2 inheritance (allow multiple inheritance)

Function.prototype.DeriveFrom = function(fnSuper){
    var prop;

    if (this == fnSuper){
        alert("Error - cannot derive a class of its own.");
        return;
    }

    for (prop in fnSuper.prototype)
        if (	typeof(fnSuper.prototype[prop]) == "function" && 
				!this.prototype[prop])
            this.prototype[prop] = fnSuper.prototype[prop];
       
    this.prototype[fnSuper.StName()] = fnSuper;
}
Function.prototype.StName = function(){
    var st;

    st = this.toString();
    st = st.substring(st.indexOf(" ")+1, st.indexOf("("));
    if (st.charAt(0) == "(")
        st = "function ...";

    return st;
}

Function.prototype.Override = function(fnSuper, stMethod){
    this.prototype[fnSuper.StName() + "_" + stMethod] = fnSuper.prototype[stMethod];
}
