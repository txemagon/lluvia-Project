/**
 * @projectDescription Generic class Window and DinamycWindow
 * @author Txema
 * @version 1.00, June 2007
 * @translated by Jesús del Saz
 * /
Window.prototype.constructor = Window;

/**
 * @classDescription Contains data.
 * 
 * @param {Rectangle} 	rect				Dimensions of the window.
 * @param {String} 		name				HTML name attribute of the object.
 * @param {String} 		identifier			DOM unique identifier.
 * @param {Window} 		parentWindow		Pointer to the parent window.
 * @param {Array} 		style				List styles apply to the window.
 * @param {Node}		initialElement		HTML element initial.
 * 
 * @return {Window} The newly created window.
 * @constructor
 */

function Window(rect, name, identifier, parentWindow, style, initialElement){
	this.windowHTML    = {	window: new Array(), 
							rectangle: rect, 
							name: name? name:"", 
							identifier: identifier? identifier: "",
							style: style? style: new Array()};
	if (!style || style == null)
		style = new Array();
	this.windowHTML.style.push("Window");
	this.windowHTML.style.reverse();
	this.parentWindow = parentWindow;
	this.daughterWindow= new Array();

	if (i)
		this.elementHTML = initialElement;
	// Initialization Methods 
	Window.prototype.createWindow.call(this);
	if (this.parentWindow != null){
		this.parentWindow.windowHTML.window[this.parentWindow.windowHTML.window.length - 1].appendChild(this.windowHTML.window[0]);
		this.parentWindow.daughterWindow.push(this);
	}
		
}


/**
 * Repainting of the window.
 * 
 * @memberOf	{Window}
 * @method		paint
 * 
 */
Window.prototype.paint = function(){
	for (var i in this.windowHTML.window){
		if (this.windowHTML.rectangle){
			if (this.windowHTML.rectangle.y0 != null)
				this.windowHTML.window[i].style.top    = this.windowHTML.rectangle.y0 + "px";
			if (this.windowHTML.rectangle.x0 != null)
				this.windowHTML.window[i].style.left   = this.windowHTML.rectangle.x0 + "px";
			if (this.windowHTML.rectangle.x0 != null &&
				this.windowHTML.rectangle.y0 != null &&
				this.windowHTML.rectangle.x1 != null &&
				this.windowHTML.rectangle.y1 != null ){
					this.windowHTML.window[i].style.width  = this.windowHTML.rectangle.getRectDimen().x + "px";
					this.windowHTML.window[i].style.height = this.windowHTML.rectangle.getRectDimen().y + "px";
			}
		}		
	}
	
		if (this.daughterWindow.length > 0)
			for (var j in this.daughterWindow)
				this.daughterWindow[j].paint();
			
			
}

/**
 * Sets a property to an HTML element
 * @param {Object} element	HTML element that receives the property.
 * @param {Object} name   	Property Name.
 * @param {Object} value    Property value.
 */
Window.prototype.setProperty = function (element, name, value){
	if ( (name != null) && (name != "") && (value != null) && (value != "") )
		element.setAttribute(name, value);
}

/**
 * Push an element to the list of HTML elements in the window.
 * 
 * @memberOf {Window}
 * @method   {createElement}
 * 
 * @param {Object} element type DOM element to create: div, span, ...
 */
Window.prototype.createElement = function (element){
	this.windowHTML.window.push(document.createElement(element));
	if (this.windowHTML.window.length > 1)
		this.windowHTML.window[this.windowHTML.window.length - 2].appendChild(this.windowHTML.window[this.windowHTML.window.length-1]);
	/* else
		if (this.parentWindow != null)
			this.parentWindow.hungWindow(this);	
	*/
			
     Window.prototype.setProperty.call(this, this.windowHTML.window[this.windowHTML.window.length - 1], "name", this.windowHTML.name);
	 Window.prototype.setProperty.call(this, this.windowHTML.window[this.windowHTML.window.length - 1], "id", this.windowHTML.identifier);		
}

/**
 * Creates a set div's of output that represents the window, 
 * with all their inheritance relationships.
 * 
 * @memberOf 	{Window}
 * @method		createWindow
 */
Window.prototype.createWindow = function(){
	
	for (var i in this.windowHTMLs.style){
		Window.prototype.createElement.call(this, "div");
		this.windowHTML.window[this.windowHTML.window.length - 1].className = this.windowHTML.style[i];
	}		
	
	if (this.elementHTML){
		this.windowHTML.window[this.windowHTML.window.length - 1].appendChild(this.elementHTML);
		this.windowHTML.window.push(this.elementHTML);
	}
}

/**
 * Hung windows as a daughter of this.
 * 
 * @memberOf	{Window}
 * @method		hangWindow
 * 
 * @param       {mobileWindow} window   	The window will be hung.
 */
Window.prototype.hangWindow = function(window){
	if (window != null)
		this.daughterWindows.push(window);
}

/**
 * Insert an HTML element within the canvas window.
 * 
 * @memberOf	{Window} 
 * @method	    appendHTML
 * @param       {Node} element HTML Element.
 */
Window.prototype.appendHTML = function(element){
	var el2 = element.cloneNode(true);
	el2.setAttribute("name", "");
	var v = new Window(null,"", "", this, null, el2);
	//this.daughterWindows.push(v);
	//this.windowHTML.window[this.windowHTML.window.length - 1].appendChild(el2);
}

/**
 * Appends all HTML elements whose property name matches the parameter.
 * 
 * @memberOf {Window}
 * @method   appendData
 * @param    {String} name Property name of data to append.
 */
Window.prototype.appendData = function(name){
	var elements = document.getElementsByName(name);
	for (var i=0; i<elements.length; i++)
		this.appendHTML(elements[i]);
}

/**
 * Removes a daughter window.
 * @memberOf {Window}
 * @method	removeWindow 
 * @param {mobileWindow} window	 Window to remove the Array.
 *
 */
Window.prototype.removeWindow = function(window){
	for (var i in this.daughterWindows)
		if (this.daughterWindows[i] == window){
			this.daughterWindows[i].removeDaughters();
			this.daughterWindows = this.daughterWindows.splice(i,1);
			delete(window);		
		}	
}


/**
 * Kill this window.
 * 
 * @memberOf {WindowM}
 * @method   die
 */
Window.prototype.die = function (){
	if (this.parentWindow != null)
		this.parentWindow.removeWindow(this);
	else{
		this.removeDaughters();
		delete this;
	}
}

/**
 * Removes all windows daughters of this window.
 * 
 * @memberOf 	{Window}
 * @method		removeDaughters
 */
Window.prototype.removeDaughters = function(){
	for (var i in this.daughtersWindows){
		if (this.daughtersWindows[i].length != 0)
			this.daughtersWindows[i].removeDaughters();
		delete this;
	}
}



