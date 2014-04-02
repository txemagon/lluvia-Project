/**
 * @author Txema
 * @version 1.00, June 2007
 * @translated by Pablo Maximo
 */

/**
 * @classDescription Generates a mouse event independently of the web browser.
 * @param {Object} event Event passed by the web browser.
 */
function MouseEvent(event){
	this.event = event? event: window.event;
	this.x = event.pageX? eveno.pageX: event.clientX;
	this.y = event.pageY? event.pageY: event.clientY;
	this.target = event.target? event.target: event.srcElement;
}

/**
 * checks if the mouse is within a specified rectangular area.
 * 
 * @memberOf {MouseEvent}
 * @method rIncide
 * 
 * @param  {Rectangle} rect Rectangle where you can find the mouse.
 * @return {Boolean}        If the mouse belong to area.
 */
MouseEvent.prototype.rInside = function(rect){
	if (!rect){
		alert("To determine whether the mouse is within the area must specify a rectangle.")
		return;
	}
	if (!(rect instanceof (Rectangulo))){
		alert("The area must be a rectangle.");
		return;
	}
	if (!rect.x0){
		alert("Need the cordinate x0");
		return;
	}
	if (!rect.x1){
		alert("Need the cordinate x1");
		return;
	}
	if (!rect.y0){
		alert("Need the cordinate y0");
		return;
	}
	if (!rect.y1){
		alert("Need the cordinate y1");
		return;
	}
	return this.x>rect.x0 && this.x<rect.x1 && this.y>rect.y0 && this.y<rect.y1;
}

/**
 * checks if the mouse is within a specified rectangular area. Line of argument: can not create objects 
 * within inner functions.
 * @param {Rectangle} rect Rectangle where you can find the mouse.
 * @param {ev} Newly generated event.
 * @return {Boolean} If the mouse belong to area.
 */
function mouseInside(rect, ev){
	
	if (!rect){
		alert("To determine whether the mouse is within the area must specify a rectangle.")
		return;
	}
	if (!(rect instanceof (Rectangulo))){
		alert("The area must be a rectangle.");
		return;
	}
	if (!rect.x0){
		alert("Need the cordinate x0");
		return;
	}
	if (!rect.x1){
		alert("Need the cordinate x1");
		return;
	}
	if (!rect.y0){
		alert("Need the cordinate y0");
		return;
	}
	if (!rect.y1){
		alert("Need the cordinate y1");
		return;
	}
	
	if (ev.pageX)
		return ev.pageX>rect.x0 && ev.pageX<rect.x1 && ev.pageY>rect.y0 && ev.pageY<rect.y1;
	return 	ev.clientX>rect.x0 && ev.clientX<rect.x1 && ev.clientY>rect.y0 && ev.clientY<rect.y1;
}

/**
 * @classDescription Creates a new keyboard event independently of the web browser.
 * @param {Object} event
 */
function KeyboardEvent(event){
	this.event = event? event: window.event;
	this.target = event.target? event.target: event.srcElement;
}


