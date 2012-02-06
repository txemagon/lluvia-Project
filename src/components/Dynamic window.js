/**
 * @projectDescription Description of a dynamic window and wrappings.
 * dynamic window is considered one that has several statements which may be multi-processor. 
 * Consult: @see Window , @see AutomatonThread.
 * 
 * @author Txema
 * @version 1.00, june 2007
 * @traslated by Pablo Maximo
 */

DynamicWindow.prototype = new Window;
extend(DynamicWindow, AutomatonThread);

DynamicWindow.prototype.constructor = DynamicWindow;


/**
 * @classDescription	Window whit states multi-processor.
 * 
 * @param  {Rectangle} 	rect			External dimension of the window to create.
 * @param  {String} 	name			Name of the HTML element to create.
 * @param  {String} 	identifier	    Unique identifier in the object model.
 * @param  {window}		parentWindow	Window container for this.
 * @param  {Array} 		style			Style list for the window.
 * @param  {Object}		states			Possible states of the windows.
 * @param  {Object}		currentState	Initial state of the object.
 * @param  {Array}		gestor			List of functions that manage each state.			
 * 
 * @return {DynamicWindow}	New object created.
 * @constructor
 */
function DynamicWindow(	rect, name, identifier, parentWindow, styleI, 
						state, currentState, gestor){
	
	var style = new Array();
	if (styleI) 
		style = styleI;
	
	style.push("DynamicWindow");
	Window.call(this, rect, name, identifier, parentWindow, style);
							
	AutomatonThread.call(this, state, currentState, gestor);

}