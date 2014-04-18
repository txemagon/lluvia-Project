/**
 * @class WorldInterface 
 *
 * World's menu. Creates a Interface to interact with boids.
 *
 * version 1.00 Aug, 2011
 * 
 * @constructor WorldInterface
 *
 * @param  {htmlElement} view Button holder panel.
 * @return {} WorldInterface
*/
WorldInterface.prototype = new Device
WorldInterface.prototype.constructor = WorldInterface

function WorldInterface(view){
  var that = this
  var args = arguments
  
  /* Events */
  this.self_events = ["focus_boid"]
  
  function initialize(){
    Device.call(that, view)
  }
  
  if (arguments.length)
    initialize()
  
}

/**
 * @method add_boid
 *
 * Creates a Gate to be used as a lever of a boid instance.
 *
 * @param {Object} boid Boid instance.
 * 
 */
WorldInterface.prototype.add_boid = function(boid){
  var gate = this.newGate("Boid_" + boid.id, BoidCollector)
  gate.boid = boid
}

/**
 * @method attend_new_boid
 *
 *  Message to be attended.
 *
 * @param {Date}    date Date in which the message was unqueued. See Device#attend.
 * @param {Object}  mssg Message to be attended Message to be attended. 
 */
WorldInterface.prototype.attend_new_boid = function(date, mssg){
  // logger.innerHTML += mssg.received.id + ": " + mssg.status[mssg.current] + " => " + mssg.event.new_boid.data.self_keys() + "<br/>"
  mssg.current++
  var boid = mssg.event.new_boid.data
  var gate = this.newGate("Boid_" + boid.id, BoidCollector)
  gate.boid = boid
}

/**
 * @class BoidCollector 
 *
 * 
 *
 * 
 * @constructor BoidCollector
 *
 * @param  {} 
 * @param  {} 
 * 
 * @return {} BoidCollector
 */
BoidCollector.prototype = new Gate
BoidCollector.prototype.constructor = BoidCollector

function BoidCollector(el, parent){ 
	var that = this	
	var args = arguments
	
	function initialize(){
		that.el = el
		that[el] = {}
		Gate.call(that, el, parent.getAttribute('id'))
		document.getElementById(el).innerHTML = el.humanize()
	}

	if (arguments.length)
		initialize()
}


/**
 * @method do_onclick
 *
 * When event onClick is activated, it shows a message with the given boid's information
 *
 * @param {Event}   event Event that has to be triggered
 * @param {Object}  element Element that triggered the event
 */	
BoidCollector.prototype.do_onclick = function(event, element){
	this.device.fireEvent(this.device.newMessage("sync", "focus_boid", this.boid))
}


/**
 * @method do_onmouseover
 *
 * When event onMouseOver is activated, it changes the color of the panel to grey
 * and get the focus on the given boid
 *
 * @param {Event}   event Event that has to be triggered
 * @param {Object}  element Element that triggered the event
 */
BoidCollector.prototype.do_onmouseover = function(event, element){
  this.panel.style.color = "grey"
  this.boid.focused = true
}


/**
 * @method do_onmouseout
 *
 * When event onMouseOut is activated, it changes the color of the panel to white
 * and get the focus out the given boid
 *
 * @param {Event}   event Event that has to be triggered
 * @param {Object}  element Element that triggered the event
 */
BoidCollector.prototype.do_onmouseout = function(event, element){
  this.panel.style.color = "white"
  this.boid.focused = false
}
