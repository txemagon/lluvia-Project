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
  var properties = document.getElementById("properties")
  var that = this
  var args = arguments
  var actual_boid
  /* Events */
  this.self_events = []
  
  function initialize(){
    Device.call(that, view)
    that.newGate("on_button", OnOptions)
    that.newGate("off_button", OffOptions)
    that.newGate("plus_button", PlusOptions)
    that.newGate("less_button", LessOptions)
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
  
  actual_boid = mssg.event.focus_boid.data

  properties.innerHTML = "Id: " + mssg.event.focus_boid.data.id + "<br/>" +
                         "Position X: " +  Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[0]*100)/100 + "<br/>" + 
                         "Position Y: " + Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[1]*100)/100 + "<br/>" +
                         "Wave lenght: " + mssg.event.focus_boid.data.wave_lenght
  mssg.current++
}

OnOptions.prototype = new Gate
OnOptions.prototype.constructor = OnOptions

function OnOptions(element){
  var that = this
  thisname = element

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

OnOptions.prototype.do_onclick = function(){
  actual_boid.on()
}


OffOptions.prototype = new Gate
OffOptions.prototype.constructor = OffOptions

function OffOptions(element){
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

OffOptions.prototype.do_onclick = function(){
  actual_boid.off()
}


PlusOptions.prototype = new Gate
PlusOptions.prototype.constructor = PlusOptions

function PlusOptions(element){
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

PlusOptions.prototype.do_onclick = function(){
  actual_boid.subir_volumen(10)
}


LessOptions.prototype = new Gate
LessOptions.prototype.constructor = LessOptions

function LessOptions(element){
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

LessOptions.prototype.do_onclick = function(){
  actual_boid.bajar_volumen(10)
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
