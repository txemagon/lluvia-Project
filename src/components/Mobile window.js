/**
 * Define the popup window class 
 * @author Txema
 * @version 1.00, june 2007
 * Translate by David Saldaña
 */


MobileWindow.prototype = new DynamicWindow;
MobileWindow.prototype.constructor = MobileWindow;

/**
 * @classDescription Windows are centered when the mouse pass over.
 * Derive from @see Hilo and is executed by framework @see Processor.
 * @param {String} 			name 			Window's name.
 * @param {String}			identifier		Key that identifies the HTML element.
 * @param {MobileWindow} 	parentWindow 	Pointer to parent Window.
 * @param {Array}			style			Css applicable style
 * @param {Point}			initialPosition	Window's rest position.
 * @param {Point}			finalPosition	Window's service position.
 * @param {Point}			dimensions		Window's wide and high.
 * @return {MobileWindow} 	New window that appears when the mouse pass over.
 * @constructor
 */
function MobileWindow(name, identifier, parentWindow, style, initialPosition, finalPosition, dimensions){
	
	this.state = {	none: 0, hide:1, leaving:2, active:3, entering: 4};
	this.currentState = {	previous:this.state.hidden, 
							current:this.state.hidden, 
							requested:this.state.hidden};
	style = style? style: new Array();
	style.push("MobileWindow");
	var rect = new Rectangle(new Point(initialPosition), new Point(dimensiones));
	this.initialPosition = initialPosition;
	this.finalPosition   = finalPosition;
	this.dimensions	     = dimensions;
	DynamicWindow.call(	this, rect, name, identifier, parentWindow, style, 
							this.state,
							this.currentState,
							new Array(new Array(null, null, null),
								new Array(MobileWindow.prototype.gestorHideHome  , MobileWindow.prototype.gestorHide  , MobileWindow.prototype.gestorHideFinal),
								new Array(MobileWindow.prototype.gestorLeavingHome, MobileWindow.prototype.gestorLeaving, MobileWindow.prototype.gestorLeavingFinal),
								new Array(MobileWindow.prototype.gestorActiveHome  , MobileWindow.prototype.gestorActive  , MobileWindow.prototype.gestorActiveFinal),
								new Array(MobileWindow.prototype.gestorEnteringHome, MobileWindow.prototype.gestorEntering, MobileWindow.prototype.gestorEnteringFinal))
					);
					
	if (this.parentWindow == null)
		document.body.appendChild(this.windowHTML.window[0]);
	else
		this.hangWindow(this);
		
	this.paint();
	this.modelMov = new DampedSystem(3.5, 2, 1, new Point(initialPosition.x / 1000, initialPosition.y / 1000), 
													 new Point(finalPosition.x/1000, finalPosition.y / 1000));
	
}

/* STATE GESTOR */


/**
 * Start state operations (log listeners, etc.)
 */

MobileWindow.prototype.gestorHideHome = function(){
	processor.events.addBuiltinListener(this.windowHTML.window[this.windowHTML.window.length - 1], "mouseover", function (){this.currentStatus.request = this.status.leaving;}, this);
}

/**
 * Manage the execution of this window when this is hidden.
 */
MobileWindow.prototype.gestorHide = function(){
	;
}

/**
 * Removal operations from state.
 */
MobileWindow.prototype.gestorHideFinal = function(){
	processor.events.removeBuiltinListener(this.windowHTML.window[this.windowHTML.window.length - 1], "mouseover");
}

/**
 * Operations inicializacion state (log listeners, etc.)
 */
MobileWindow.prototype.gestorLeavingHome = function(){

	this.modelMov.position.moment.set(new Time(processor.now.getTime() / 1000));
	this.modelMov.position.moment.set(new Time(processor.now.getTime() / 1000));
	this.modelMov.anchorage = new Mobile(new Point(this.finalPosition.x / 1000, this.finalPosition.y / 1000), 
											new Point(0, 0),
											new Point(0, 0),
											new Point(0, 0));
}

/**
 * manage the execution of this window when this is leaving.
 */
MobileWindow.prototype.gestorLeaving = function(){
	
	this.modelMov.update(new Time(processor.now.getTime() / 1000));
	var p = new Point(this.modelMov.position.position.magnitude);
	p.x *= 1000;
	p.y *= 1000;
	this.windowHTML.rectangle = new Rectangle(p, new Point(this.windowHTML.rectangle.getRectDimen()));
	
	MobileWindow.prototype.paint.call(this);
	var dx = p.x - this.finalPosition.x;
	var dy = p.y - this.finalPosition.y;
	var d = dx + dy;
	d = d>=0? d: -d;
	if (d<5)
		this.currentState.request = this.state.activate;
}

/**
 * removal operations from state.
 */
MobileWindow.prototype.gestorLeavingFinal = function(){
	this.modelMov.position.acceleration   = new Continuous(new Point(0,0));
	this.modelMov.position.velocity       = new Continuous(new Point(0,0));
}
/**
 * Operations inicializacion state (log listeners, etc.)
 */
MobileWindow.prototype.gestorActiveHome = function(){
	processor.events.addBuiltinListener(this.windowHTML.window[this.windowHTML.window.length - 1], "mouseout", 
			function (ev){
				if (!MouseInside(this.windowHTML.rectangle, ev)) 
					this.currentState.request = this.state.entering;
			}, 
		this);
}

/**
 * manage the execution of this window when this is activate.
 */
MobileWindow.prototype.gestorActive = function (){

	this.paint();	
}

/**
 * removal operations from state.
 */
MobileWindow.prototype.gestorActiveFinal = function(){
	processor.events.removeBuiltinListener(this.windowHTML.window[this.windowHTML.window.length - 1], "mouseout");
}

/**
 * Operations inicializacion state (log listeners, etc.)
 */
MobileWindow.prototype.gestorEnteringHome = function(){
	
	this.modelMov.position.moment.set(new Time(processor.now.getTime() / 1000));
	this.modelMov.position.moment.set(new Time(processor.now.getTime() / 1000));
	this.modelMov.anchorage = new Movil(new Point(this.initialPosition.x / 1000, this.initialPosition.y / 1000), 
											new Point(0, 0),
											new Point(0, 0),
											new Point(0, 0));
}

/**
 * manage the execution of this window when this is entering.
 */
MobileWindow.prototype.gestorEnetering = function(){
	this.modelMov.update(new Time(processor.now.getTime() / 1000));
	var p = new Point(this.modelMov.position.position.magnitude);
	p.x *= 1000;
	p.y *= 1000;
	this.windowHTML.rectangle = new Rectangle(p, new Point(this.windowHTML.rectangle.getRectDimen()));
	
	MobileWindow.prototype.paint.call(this);
	var dx = p.x - this.initialPosition.x;
	var dy = p.y - this.initialPosition.y;
	var d = dx + dy;
	d = d>=0? d: -d;
	if (d<5)
		this.currentState.request = this.state.hidden;
}

/**
 * removal operations from status.
 */
MobileWindow.prototype.gestorEnteringFinal = function(){
	this.modelMov.position.acceleration = new Continuous(new Point(0,0));
	this.modelMov.position.velocity   = new Continuous(new Point(0,0));
}