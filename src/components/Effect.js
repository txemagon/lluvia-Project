/**
 * @projectDescription Describes the effect class and wrapings.
 * That is a window, taking a single state, is processed each instant 
 * of time to make changes in its output. Consult: @see Window , @see Thread .
 *  
 * @author Txema
 * @version 1.00, June de 2007
 * @translated by Jesús del Saz
 * /

Effect.prototype = new Window;
extend(Effect, Thread);

Effect.prototype.constructor = Effect;

/**
 * @classDescription	Window monostable multiprocessor.
 * 
 * @param {Rectangle} 	rect			Dimension outside the window to create.
 * @param {String} 		name			Name of the HTML element to create.
 * @param {String} 		identifier		Unique identifier in the object model.
 * @param {Window}		parentWindow	Container for this window.
 * @param {Array} 		style			List of styles applied to the window.
 * @param {Function}	gestor			List of functions that serve every state.			
 * 
 * @return	{Effect}	Window effect
 * @constructor
 */
function Effect(rect, name, identifier, parentWindow, styleI, gestor){
	
	var style = new Array();
	if (styleI) 
		style = styleI;
	
	style.push("Effect");
	
	Window.call(this, rect, name, identifier, parentWindow, style);
	gestor = gestor? gestor:Effect.prototype.run; 
	Thread.call(this, gestor);

}

Effect.prototype.run = function (){
	alert("Should override the run method of the derived class effect.")
}