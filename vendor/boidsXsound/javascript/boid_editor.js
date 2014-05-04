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
  var speaker_buttons = document.getElementById("speaker_buttons")
  var nanobot_buttons = document.getElementById("nanobot_buttons")
  var that = this
  var args = arguments
  var actual_boid
  /* Events */
  this.self_events = []
  
  function initialize(){
    Device.call(that, view)
    // speaker options
    that.newGate("on_button", OnOptions)
    that.newGate("off_button", OffOptions)
    that.newGate("plus_button", PlusOptions)
    that.newGate("less_button", LessOptions)

    // Nanaobot options
    that.newGate("hello_button", HelloOptions)
    that.newGate("follow_me_button", FollowMeOptions)
    that.newGate("go_away_button", GoAwayOptions)
  }
  
  if (arguments.length)
    initialize()
  
}

BoidEditor.prototype.attend_focus_boid = function(date, mssg){
  actual_boid = mssg.event.focus_boid.data

  properties.innerHTML = "Id: " + mssg.event.focus_boid.data.id + "<br/>" +
                         "Position X: " +  Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[0]*100)/100 + "<br/>" + 
                         "Position Y: " + Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[1]*100)/100 + "<br/>" +
                         "Wave lenght: " + mssg.event.focus_boid.data.wave_lenght

  if(actual_boid instanceof Speaker){
    speaker_buttons.style.visibility = "visible"
    nanobot_buttons.style.visibility = "hidden"
  }
  if(actual_boid instanceof Nanobot){
    speaker_buttons.style.visibility = "hidden"
    nanobot_buttons.style.visibility = "visible"
  }


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
  actual_boid.volume_up(10)
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
  actual_boid.volume_down(10)
}


HelloOptions.prototype = new Gate
HelloOptions.prototype.constructor = HelloOptions

function HelloOptions(element){
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

HelloOptions.prototype.do_onclick = function(){
  actual_boid.talk("hola")
}

FollowMeOptions.prototype = new Gate
FollowMeOptions.prototype.constructor = FollowMeOptions

function FollowMeOptions(element){
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

FollowMeOptions.prototype.do_onclick = function(){
  actual_boid.talk("seguirme")
}


GoAwayOptions.prototype = new Gate
GoAwayOptions.prototype.constructor = GoAwayOptions

function GoAwayOptions(element){
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

GoAwayOptions.prototype.do_onclick = function(){
  actual_boid.talk("iros")
}