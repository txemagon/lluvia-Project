/**
 * @classDescription Creates a Interface to interact with boids.
 *
 * @param  {view} Button holder panel.
 * @return {WorldInterface}
 * @constructor
*/


WorldInterface.prototype = new Device
WorldInterface.prototype.constructor = WorldInterface

function WorldInterface(view){
  var that = this
  var args = arguments
  this.nanobot_id = 0
  this.speaker_id = 0  
  /* Events */
  this.self_events = ["focus_boid", "face_boid_animation"]
  
  function initialize(){
    Device.call(that, view)
  }
  
  if (arguments.length)
    initialize()
  
}

WorldInterface.prototype.add_boid = function(boid){
  var gate = this.newGate("Boid_" + boid.id, BoidCollector)
  gate.boid = boid
}


WorldInterface.prototype.attend_new_boid = function(date, mssg){
  // logger.innerHTML += mssg.received.id + ": " + mssg.status[mssg.current] + " => " + mssg.event.new_boid.data.self_keys() + "<br/>"
  mssg.current++
  var boid = mssg.event.new_boid.data
  //if(boid instanceof Boid)
    //var gate = this.newGate("Boid_" + boid.id, BoidCollector)
  if(boid instanceof Nanobot){
    this.nanobot_id++
    // if(this.nanobot_id<10){
    //   if(this.nanobot_id == 1){
    //  //   text_lcd.innerHTML += "-------- <br>" 
    //     text_lcd.innerHTML += "Nanobot list:" 
    //   }
    //   var gate = this.newGate("Nanobot_0" + this.nanobot_id, BoidCollector)
    // }
    // else
      var gate = this.newGate("Nanobot_" + this.nanobot_id, BoidCollector)
  }
  if(boid instanceof Speaker){
    this.speaker_id++

      var gate = this.newGate("Speaker_" + this.speaker_id, BoidCollector)
  }
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
		document.getElementById(el).innerHTML = el.humanize()
	}

	if (arguments.length)
		initialize()
}
	
BoidCollector.prototype.do_onclick = function(event, element){
  this.device.fireEvent(this.device.newMessage("sync", "focus_boid", this.boid))
  this.device.fireEvent(this.device.newMessage("sync", "face_boid_animation", this.boid))
}

BoidCollector.prototype.do_onmouseover = function(event, element){
//  this.panel.style.color = "white"
  this.panel.style.fontSize = "18px"
  this.boid.focused = true
}

BoidCollector.prototype.do_onmouseout = function(event, element){
//  this.panel.style.color = "black"
this.panel.style.fontSize = "15px"
this.boid.focused = false
}
