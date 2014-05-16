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

    // Speaker options    
    that.newGate("button_on", Gate, {
      do_onclick     : function(){ actual_boid.on()},
      do_onmouseover : function(){ button_on.src = "images/button_on_select.png"},
      do_onmouseout  : function(){ button_on.src = "images/button_on.png"}
    })
    that.newGate("button_off", Gate, {
      do_onclick     : function(){ actual_boid.off()},
      do_onmouseover : function(){ button_off.src = "images/button_off_select.png"},
      do_onmouseout  : function(){ button_off.src = "images/button_off.png"}
    })
    that.newGate("button_plus", Gate, {
      do_onclick     : function(){ actual_boid.volume_up(10)},
      do_onmouseover : function(){ button_plus.src = "images/button_plus_select.png"},
      do_onmouseout  : function(){ button_plus.src = "images/button_plus.png"}
    })
    that.newGate("button_less", Gate, {
      do_onclick     : function(){ actual_boid.volume_down(10)},
      do_onmouseover : function(){ button_less.src = "images/button_less_select.png"},
      do_onmouseout  : function(){ button_less.src = "images/button_less.png"}
    })



    // Nanaobot options
    that.newGate("button_talk", Gate, {
      do_onclick     : function(){ text_lcd2.style.visibility = "hidden"
                                   nanobot_buttons.style.visibility = "hidden"
                                   talk_options.style.visibility = "visible"

                                   talk_initial_msg.innerHTML = "<big><big>Talk options</big></big>"
                                   greet_button.innerHTML     = "1. Greet"
                                   teach_button.innerHTML     = "2. Teach"
                                   joke_button.innerHTML      = "3. Joke"
                                   argue_button.innerHTML     = "4. Scare"
                                   insult_button.innerHTML    = "5. Insult"
                                   threaten_button.innerHTML  = "6. Threaten" },

      do_onmouseover : function(){ button_talk.src = "images/button_talk_select.png" }, 
      do_onmouseout  : function(){ button_talk.src = "images/talk.png" }
    })


    that.newGate("greet_button", Gate, {
      do_onclick     : function(){ actual_boid.talk("hello") },
      do_onmouseover : function(){ greet_button.style.fontSize = "18px" },
      do_onmouseout  : function(){ greet_button.style.fontSize = "15px" }
    })

    that.newGate("teach_button", Gate, {
      do_onclick     : function(){ actual_boid.talk("2+2=4") },
      do_onmouseover : function(){ teach_button.style.fontSize = "18px" },
      do_onmouseout  : function(){ teach_button.style.fontSize = "15px" }
    })

    that.newGate("joke_button", Gate, {
      do_onclick     : function(){ actual_boid.talk("joke") },
      do_onmouseover : function(){ joke_button.style.fontSize = "18px" },
      do_onmouseout  : function(){ joke_button.style.fontSize = "15px" }
    })

    that.newGate("argue_button", Gate, {
      do_onclick     : function(){ actual_boid.talk("bu!!!") },
      do_onmouseover : function(){ argue_button.style.fontSize = "18px" },
      do_onmouseout  : function(){ argue_button.style.fontSize = "15px" }
    })

    that.newGate("insult_button", Gate, {
      do_onclick     : function(){ actual_boid.talk("idiot") },
      do_onmouseover : function(){ insult_button.style.fontSize = "18px" },
      do_onmouseout  : function(){ insult_button.style.fontSize = "15px" }
    })

    that.newGate("threaten_button", Gate, {
      do_onclick     : function(){ actual_boid.talk("i kill you!") },
      do_onmouseover : function(){ threaten_button.style.fontSize = "18px" },
      do_onmouseout  : function(){ threaten_button.style.fontSize = "15px" }
    })

    that.newGate("back_button", Gate, {
      do_onclick     : function(){ text_lcd2.style.visibility = "visible"
                                   nanobot_buttons.style.visibility = "visible"
                                   talk_options.style.visibility = "hidden" },
      do_onmouseover : function(){ back_button.src = "images/button_back_select.png" },
      do_onmouseout  : function(){ back_button.src = "images/button_back.png" }
    })


    that.newGate("button_games", Gate, {
      do_onclick     : function(){},
      do_onmouseover : function(){ button_games.src = "images/button_games_select.png" },
      do_onmouseout  : function(){ button_games.src = "images/button_games.png" }
    })

    that.newGate("button_orders", Gate, {
      do_onclick     : function(){ text_lcd2.style.visibility       = "hidden"
                              nanobot_buttons.style.visibility = "hidden"
                              orders_options.style.visibility  = "visible"

                              orders_initial_msg.innerHTML = "<big><big>Orders options</big></big>"
                              follow_me_button.innerHTML   = "1. Follow me"
                              go_away_button.innerHTML     = "2. Go away" },
      do_onmouseover : function(){ button_orders.src = "images/button_orders_select.png" },
      do_onmouseout  : function(){ button_orders.src = "images/button_orders.png" }
    })

      


    that.newGate("follow_me_button", Gate, {
      do_onclick     : function(){ actual_boid.talk("seguirme") },
      do_onmouseover : function(){ follow_me_button.style.fontSize = "18px" },
      do_onmouseout  : function(){ follow_me_button.style.fontSize = "15px" }
    })




    that.newGate("back_button_orders", Gate, {
      do_onclick     : function(){ text_lcd2.style.visibility = "visible"
                                   nanobot_buttons.style.visibility = "visible"
                                   orders_options.style.visibility = "hidden" },
      do_onmouseover : function(){ back_button_orders.src = "images/button_back_select.png" },
      do_onmouseout  : function(){ back_button_orders.src = "images/button_back.png" }
    })
  



    that.newGate("go_away_button", Gate, {
      do_onclick     : function(){ actual_boid.talk("iros") },
      do_onmouseover : function(){ go_away_button.style.fontSize = "18px" },
      do_onmouseout  : function(){ go_away_button.style.fontSize = "15px" }
    })



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

    text_lcd2.style.visibility       = "visible"
    talk_options.style.visibility    = "hidden"
    speaker_buttons.style.visibility = "visible"
    nanobot_buttons.style.visibility = "hidden"
    orders_options.style.visibility  = "hidden"
  }

  if(actual_boid instanceof Nanobot){
      text_lcd2.innerHTML =  "<div style='margin:0px 0 0 10px;'><big><big>Information</big></big>" + "<br/></div>" +
                             //"Id: " + mssg.event.focus_boid.data.id + "<br/>" +
                             "Level emotion: " + Math.round(mssg.event.focus_boid.data.level_emotion) + "<br/>" +
                             "Behaviour: " + mssg.event.focus_boid.data.brain + "<br/>" + 
                             "Pos (x,y): (" +  Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[0]) + "," + Math.round(mssg.event.focus_boid.data.geo_data.position.Coord[1])+ ")" + "<br/>" + "<br/>" +
                             "<div style='margin:0px 0 0 27px;'><big><big>Controls</big></big><br/></div>"

    text_lcd2.style.visibility       = "visible"
    talk_options.style.visibility    = "hidden"
    speaker_buttons.style.visibility = "hidden"
    nanobot_buttons.style.visibility = "visible"
    orders_options.style.visibility  = "hidden"
  }

  mssg.current++
}

/*
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
*/