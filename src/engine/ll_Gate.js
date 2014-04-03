/**
 * Event to message mapper.
 *
 * @author Txema
 * @version 1.00 Aug, 2009
 */

/*
 * lluvia devices run in the processor/s time/s, events occur in real time. Gates map
 * human/HTML events to message system dynamics.
 */


function _stitchWorlds(gate, solicitor){
	return function(e){
		e = e || window.event
		try{
		 return gate[solicitor](e, this)
		} catch (err) {
			Exception.parse(err) }
	}
}

/**
 * @class Gate
 *
 * A Gate is a lluvia (javascript) wrapper for html elements. They're conceived
 * to respond to html events keeping the object scope.
 *
 * @param {String | HTMLElement} [element] (optional) HTML Element to wrap.
 * @param {String | HTMLElement} [parent]  (optional) HTML container to place the Gate.
 *
 * ### Example
 *
 * Given this HTML:
 *
 *     <div id="button_bar">&nbsp;</div>
 *
 * We write:
 *
 *     var brush_button = new Gate("brush_btn", "button_bar")
 *
 * That generates a div with id "brush_btn" and a javascript object that will respond to
 * every html event whenever it defines the corresponding handler.
 *
 * Don't use this class directly, but subclassify it preferently as in the following example.
 *
 * ### Usage
 *
 *     Button.prototype = new Gate
 *     Button.prototype.constructor = Button
 *
 *     function Button(element){
 *
 *     	try {
 *     		if (arguments.length)
 *     			Gate.call(this, element)	// Call to the super constructor (it does all the work).
 *     	} catch (e) {
 *     		if ($K_debug_level >= $KC_dl.DEVELOPER)
 *     			alert("No event handlers were found.\nException: " + e.toSource())
 *     	}
 *     }
 *
 *     Button.prototype.do_onclick   = function(event, element){
 *     	alert("You have made click.")
 *     }
 *
 */
function Gate(element, parent){
	var that = this
	function initialize(){
		if (element)
			if (typeof(element) === "string")
			 if (document.getElementById(element))
				element = document.getElementById(element)
			 else{
			   var element_name = element
			   element = document.createElement("div")
			   element.setAttribute('id', element_name)
			   if (parent){
			     if (typeof (parent) === "string" )
			       parent = document.getElementById(parent)
			     if (parent) parent.appendChild(element)
			     }
			 }
		that.panel = element
		that.keys(/do_.*/).each(function(handler){
				handler.match( /do_(.*)/ )
				that.panel[RegExp.$1] = _stitchWorlds(that, handler)
			})
		if (!element) {
			if (parent)
				parent.appendChild(that.panel)
			else
				document.body.appendChild(that.panel)
		}

		that.threads = []
	}

	if (arguments.length)
		initialize()
}

Gate.prototype.listen = function(event, handler){
	this.panel[event] = _stitchWorlds(this, handler)
}
//getCanvas not finish yet
Gate.prototype.getCanvas = function(){ return this.panel.lastChild; } // This is wrong

Gate.prototype.applySkin = function(skin){
	var div = document.createElement("div")
	div.setAttribute("class", skin)
	this.panel.appendChild(div)
}

/**
 * @method run
 * @private
 *
 * Animates all the threads that depends on this gate.
 * A gate is supposed to have threads in order to generate animations -Effects.
 */
Gate.prototype.run = function(now, before){
	for (var i=0; i<this.threads.length; i++)
		this.threads[i].run(now, before)
}

/**
 * @method new_effect
 * 
 * Registers a new effect for the Gate. 
 *
 * @param {ThreadAutomata} eff  Visual effect to handle the div of the Gate.
 */ 
Gate.prototype.new_effect = function(eff){
	this.threads.push(eff)
	return eff
}

