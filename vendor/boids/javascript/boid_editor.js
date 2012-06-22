/**
 * Boid's dashboard
 *
 * @author Txema
 * @version 1.00 Aug, 2011
 */


/**
 * @classDescription Creates a dashboard for handling one boid.
 *
 * @param  {view} Button holder panel.
 * @return {BoidEditor}
 * @constructor
*/


BoidEditor.prototype = new Device
BoidEditor.prototype.constructor = BoidEditor

function BoidEditor(view){
  var that = this
  var args = arguments
  
  /* Events */
  this.self_events = []
  
  function initialize(){
    Device.call(that, view)
  }
  
  if (arguments.length)
    initialize()
  
}

BoidEditor.prototype.attend_focus_boid = function(date, mssg){
  this.view.innerHTML = "Following " + mssg.event.focus_boid.data.id + "<br/>"
  mssg.current++
}

/*
WorldInterface.prototype.add_boid = function(boid){
  var gate = this.newGate("Boid_" + boid.id, BoidCollector)
  gate.boid = boid
}



BoidCollector.prototype = new Gate
BoidCollector.prototype.constructor = BoidCollector

function BoidCollector(el, parent){ 
	var that = this	
	var args = arguments
	
	function initialize(){
		that.el = el
		that[el] = {}
		Gate.call(that, el, parent.getAttribute('id'))
		//that[el].edificio_over = that.newEffect(new Edificio_over(that.device, that))
		document.getElementById(el).innerHTML = el.humanize()
	}

	if (arguments.length)
		initialize()
}
	
BoidCollector.prototype.do_onclick = function(event, element){
	//this.device.sendMessage("sync", "focus_boid", this.el, this.device.world)
	
}

BoidCollector.prototype.do_onmouseover = function(event, element){
  this.panel.style.color = "grey"
  this.boid.focused = true
}

BoidCollector.prototype.do_onmouseout = function(event, element){
  this.panel.style.color = "white"
  this.boid.focused = false
}
*/
