/**
 * App Device Group
 *
 * @author Txema
 * @version 1.00 Sept, 2009
 */
Fondo_App.prototype = new Device
Fondo_App.prototype.constructor = Fondo_App

function Fondo_App(view){
    var that = this
    var args = arguments

    /* Events */
    this.self_events = ["go_to"]

    function initialize(){
        Device.call(that, view)
        that.pant = new Enumeration("home_App", "llaveEnMano_App", "servicios_App", "plantillas_App", "portafolio_App")
        that.threads.push(that.home_App = new Home_App("home_App", null, null, that))
        that.threads.push(that.llaveEnMano_App = new ll_App("llaveEnMano_App", null, null, that))
        that.threads.push(that.servicios_App = new ll_App("servicios_App", null, null, that))
        that.threads.push(that.plantillas_App = new ll_App("plantillas_App", null, null, that))
        that.threads.push(that.portafolio_App = new ll_App("portafolio_App", null, null, that))
        that.activeApp = that.home_App
        that.destinyApp = null
        that.threads.push(that.transit = new App_transit(that))
    }

    if (arguments.length)
        initialize()

}

Fondo_App.prototype.attend_go_to = function(date, mssg){
        this.destinyApp = this[mssg.event.go_to.data + "_App"]
        this.transit.switch("killing")
}

App_transit.prototype = new ThreadAutomata
App_transit.prototype.constructor = App_transit

function App_transit(app_mgr){
    var that = this

    this.v = 2
    this.v0 = 12
    this.k = 1.7
    this.k2 = 0.4
    this.dv = 50
    this.dx = 5
    this.etha = 10
    this.now = new Date()
    this.before = new Date()
    var state = this.state = new Enumeration("killing", "transit", "activating", "working")
    this.currentState = {
        previous: state.working,
        current: state.working,
        requested: state.working
    }

        var solicitors = {
        "killing.up": function(){
        },
        killing: function(){
            that.switch("transit")
        },
        "killing.down": function(){
            that.x = that.x0 = that.app_mgr.activeApp._x(that.app_mgr.activeApp.view, that.app_mgr.view)
            that.x1 = that.app_mgr.destinyApp._x(that.app_mgr.destinyApp.view, that.app_mgr.view)
            that.x1 = that.x1? that.x1: 0
            that.x = that.x0 = that.x0? that.x0: 0
            that.v = that.v0
        },
        "transit.up": function(){
            that.before = that.now
            that.time = that.now
        },
        transit: function(){
            that.v += (that.now - that.before) / 1000 * that.k * (that.x1 - that.x) - 0.009 * that.v * (1 - (that.x1 - that.x) / (that.x1 - that.x0))
            that.x += ((that.now - that.before) / 1000 * that.v)
            that.app_mgr.view.style.left = -that.x + "px"
            if (Math.abs(that.x1 - that.x) <= that.etha)
            that.switch("activating")

        },
        "transit.down": function(){
    
        },
        "activating.up": function(){
            that.app_mgr.activeApp = that.app_mgr.destinyApp
            that.app_mgr.destinyApp = null
            that.x = that.x1;
            that.app_mgr.view.style.left = -that.x + "px"
            that.switch("working")

        },
        activating: function(){
    
        },
        "activating.down": function(){
            that.v = -that.v0
        },
        "working.up": function(){
            that.before = that.now
            that.time = that.now
        },
        working: function(){

        },
        "working.down": function(){
    
        }
    }

    function initialize(){
        ThreadAutomata.call(that, ["killing", "transit", "activating", "working"], solicitors, app_mgr)
        that.app_mgr = app_mgr
    }
    if (arguments.length)
        initialize()
}

