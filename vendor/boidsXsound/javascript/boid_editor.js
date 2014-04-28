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
  var actual_boid
  /* Events */
  this.self_events = ["set_instructions"]
  
  function initialize(){
    Device.call(that, view)
    that.newGate("speaker_buttons", BoidOptions)
  }
  
  if (arguments.length)
    initialize()
  
}

BoidEditor.prototype.attend_focus_boid = function(date, mssg){
// this.view.innerHTML = "Id: " + mssg.event.focus_boid.data.id + "<br/>" +
//                       "Vel_max: " + mssg.event.focus_boid.data.vel_max + "<br/>" +
//                       "Colour: " + mssg.event.focus_boid.data.colour + "<br/>" +
//                       "Mass: " + mssg.event.focus_boid.data.mass + "<br/>" +
//                       "Vision: " + mssg.event.focus_boid.data.vision + "<br/>" + 
//                       "Position X: " +  Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[0]*100)/100 + "<br/>" +
//                       "Position Y: " + Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[1]*100)/100 + "<br/>" +
//                       "Vision: " + mssg.event.focus_boid.data.vision + "<br/>" +
//                       "Vision: " + mssg.event.focus_boid.data.vision + "<br/>" +
  
  //alert("focus_boid " +mssg.event.focus_boid.data)
  actual_boid = mssg.event.focus_boid.data
  mssg.current++
}

BoidOptions.prototype = new Gate
BoidOptions.prototype.constructor = BoidOptions

function BoidOptions(element){
  var that = this
  this.name = element

  function initialize(){
    try{
      if(element){
        that.element = element
        that[element] = {}
        Gate.call(that, element)
      }
    } catch(e){
        if ($K_debug_level >= $KC_dl.DEVELOPER)
          alert("No event handlers were found.\nException: " + e.toSource())
    }
  }

  if(arguments.length)
    initialize()
}

BoidOptions.prototype.do_onclick = function(){
  actual_boid.off()
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
