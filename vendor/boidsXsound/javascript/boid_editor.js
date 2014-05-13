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
    that.newGate("button_on", OnOptions)
    that.newGate("button_off", OffOptions)
    that.newGate("button_plus", PlusOptions)
    that.newGate("button_less", LessOptions)

    // Nanaobot options
    that.newGate("button_talk", TalkOptions)
      that.newGate("hello_button", HelloOptions)
      that.newGate("back_button", BackOptionsTalk)
    that.newGate("button_games", GamesOptions)
    that.newGate("button_orders", OrdersOptions)
      that.newGate("follow_me_button", FollowMeOptions)
      that.newGate("back_button_orders", BackOptionsOrders)
      that.newGate("go_away_button", GoAwayOptions)

  }
  
  if (arguments.length)
    initialize()
  
}

BoidEditor.prototype.attend_focus_boid = function(date, mssg){
  actual_boid = mssg.event.focus_boid.data

  if(actual_boid instanceof Speaker){
  text_lcd2.innerHTML =  "<div style='margin:0px 0 0 10px;'><big><big>Information</big></big>" + "<br/></div>" + 
                         "Pos (x,y): (" +  Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[0]*10)/10 + "," + Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[1]*10)/10 + ") <br/>" +
                         "This on: " + mssg.event.focus_boid.data.this_on + "<br/>" +
                         "Wave lenght: " + mssg.event.focus_boid.data.wave_lenght + "<br/>" +
                         "Frequency: " + Math.round(actual_boid.get_frequency_music()*100)/100 + "<br/>" +
                         "<div style='margin:0px 0 0 27px;'><big><big>Controls</big></big><br/></div>"

    text_lcd2.style.visibility = "visible"
    talk_options.style.visibility = "hidden"
    speaker_buttons.style.visibility = "visible"
    nanobot_buttons.style.visibility = "hidden"
    orders_options.style.visibility = "hidden"
  }

  if(actual_boid instanceof Nanobot){
      text_lcd2.innerHTML =  "<div style='margin:0px 0 0 10px;'><big><big>Information</big></big>" + "<br/></div>" +
                             //"Id: " + mssg.event.focus_boid.data.id + "<br/>" +
                             "Level emotion: " + Math.round(mssg.event.focus_boid.data.level_emotion) + "<br/>" +
                             "Behaviour: " + mssg.event.focus_boid.data.brain + "<br/>" + 
                             "Pos (x,y): (" +  Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[0]) + "," + Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[1])+ ")" + "<br/>" + "<br/>" +
                             "<div style='margin:0px 0 0 27px;'><big><big>Controls</big></big><br/></div>"

    text_lcd2.style.visibility = "visible"
    talk_options.style.visibility = "hidden"
    speaker_buttons.style.visibility = "hidden"
    nanobot_buttons.style.visibility = "visible"
    orders_options.style.visibility = "hidden"
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

OnOptions.prototype.do_onmouseover = function(){
  button_on.src = "images/button_on_select.png"
}

OnOptions.prototype.do_onmouseout = function(){
  button_on.src = "images/button_on.png"
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

OffOptions.prototype.do_onmouseover = function(){
  button_off.src = "images/button_off_select.png"
}

OffOptions.prototype.do_onmouseout = function(){
  button_off.src = "images/button_off.png"
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

PlusOptions.prototype.do_onmouseover = function(){
  button_plus.src = "images/button_plus_select.png"
}

PlusOptions.prototype.do_onmouseout = function(){
  button_plus.src = "images/button_plus.png"
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

LessOptions.prototype.do_onmouseover = function(){
  button_less.src = "images/button_less_select.png"
}

LessOptions.prototype.do_onmouseout = function(){
  button_less.src = "images/button_less.png"
}





TalkOptions.prototype = new Gate
TalkOptions.prototype.constructor = TalkOptions

function TalkOptions(element){
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

TalkOptions.prototype.do_onclick = function(){
  text_lcd2.style.visibility = "hidden"
  nanobot_buttons.style.visibility = "hidden"
  talk_options.style.visibility = "visible"

  talk_initial_msg.innerHTML = "<big><big>Talk options</big></big>"
  hello_button.innerHTML = "1. Greet"
}

TalkOptions.prototype.do_onmouseover = function(){
   button_talk.src = "images/button_talk_select.png"
}

TalkOptions.prototype.do_onmouseout = function(){
  button_talk.src = "images/talk.png"
}



BackOptionsTalk.prototype = new Gate
BackOptionsTalk.prototype.constructor = BackOptionsTalk

function BackOptionsTalk(element){
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

BackOptionsTalk.prototype.do_onclick = function(){
  text_lcd2.style.visibility = "visible"
  nanobot_buttons.style.visibility = "visible"
  talk_options.style.visibility = "hidden"
  /*

  talk_initial_msg.innerHTML = "<big><big>Talk options</big></big>"
  hello_button.innerHTML = "1. Greet"
  */
}

BackOptionsTalk.prototype.do_onmouseover = function(){
   back_button.src = "images/button_back_select.png"
}

BackOptionsTalk.prototype.do_onmouseout = function(){
  back_button.src = "images/button_back.png"
}



GamesOptions.prototype = new Gate
GamesOptions.prototype.constructor = GamesOptions

function GamesOptions(element){
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

GamesOptions.prototype.do_onclick = function(){
  var original_vision = actual_boid.vision
  actual_boid.vision = 100000
  var array_boids = actual_boid.visible_objects()

  for(var i=0; i<array_boids.length; i++){
    array_boids[i].brain.activate('seek')
    array_boids[i].brain.get_behavior('seek').set_target(array_boids[i+1])
}
 array_boids[16].brain.activate('seek')
    array_boids[16].brain.get_behavior('seek').set_target(array_boids[0])

  actual_boid.vision = original_vision
}

GamesOptions.prototype.do_onmouseover = function(){
   button_games.src = "images/button_games_select.png"
}

GamesOptions.prototype.do_onmouseout = function(){
  button_games.src = "images/button_games.png"
}




OrdersOptions.prototype = new Gate
OrdersOptions.prototype.constructor = OrdersOptions

function OrdersOptions(element){
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

OrdersOptions.prototype.do_onclick = function(){
  text_lcd2.style.visibility       = "hidden"
  nanobot_buttons.style.visibility = "hidden"
  orders_options.style.visibility  = "visible"

  orders_initial_msg.innerHTML = "<big><big>Orders options</big></big>"
  follow_me_button.innerHTML   = "1. Follow me"
  go_away_button.innerHTML     = "2. Go away"
}

OrdersOptions.prototype.do_onmouseover = function(){
   button_orders.src = "images/button_orders_select.png"
}

OrdersOptions.prototype.do_onmouseout = function(){
  button_orders.src = "images/button_orders.png"
}


BackOptionsOrders.prototype = new Gate
BackOptionsOrders.prototype.constructor = BackOptionsOrders

function BackOptionsOrders(element){
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

BackOptionsOrders.prototype.do_onclick = function(){
  text_lcd2.style.visibility = "visible"
  nanobot_buttons.style.visibility = "visible"
  orders_options.style.visibility = "hidden"
}

BackOptionsOrders.prototype.do_onmouseover = function(){
   back_button_orders.src = "images/button_back_select.png"
}

BackOptionsOrders.prototype.do_onmouseout = function(){
  back_button_orders.src = "images/button_back.png"
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

HelloOptions.prototype.do_onmouseover = function(){
  hello_button.style.fontSize = "18px"
}

HelloOptions.prototype.do_onmouseout = function(){
  hello_button.style.fontSize = "15px"
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

FollowMeOptions.prototype.do_onmouseover = function(){
  follow_me_button.style.fontSize = "18px"
}

FollowMeOptions.prototype.do_onmouseout = function(){
  follow_me_button.style.fontSize = "15px"
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

GoAwayOptions.prototype.do_onmouseover = function(){
  go_away_button.style.fontSize = "18px"
}

GoAwayOptions.prototype.do_onmouseout = function(){
  go_away_button.style.fontSize = "15px"
}
