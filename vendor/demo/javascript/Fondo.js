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
    if (this.transit.currentState.current == this.transit.state.working) {
        this.destinyApp = this[mssg.event.go_to.data + "_App"]
        this.transit.currentState.requested = this.transit.state.killing

    }
    
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
    this.solicitors = [    /* killing */
    [function(){
        ;
    }, function(){
        this.currentState.requested = state.transit
    }, function(){
        this.x = this.x0 = this.app_mgr.activeApp._x(this.app_mgr.activeApp.view, this.app_mgr.view)
        this.x1 = this.app_mgr.destinyApp._x(this.app_mgr.destinyApp.view, this.app_mgr.view)
		this.x1 = this.x1? this.x1: 0
		this.x = this.x0 = this.x0? this.x0: 0
        this.v = this.v0
    }
],    /* transit */
    [function(){
        this.before = this.now
        this.time = this.now
    }, function(){
        this.v += (this.now - this.before) / 1000 * this.k * (this.x1 - this.x) - 0.009 * this.v * (1 - (this.x1 - this.x) / (this.x1 - this.x0))
        this.x += ((this.now - this.before) / 1000 * this.v)
        this.app_mgr.view.style.left = -this.x + "px"
        if (Math.abs(this.x1 - this.x) <= this.etha) 
            this.currentState.requested = state.activating
    }, function(){
        ;
    }
],    /* activating */
    [function(){
        this.app_mgr.activeApp = this.app_mgr.destinyApp
        this.app_mgr.destinyApp = null
        this.x = this.x1;
        this.app_mgr.view.style.left = -this.x + "px"
        this.currentState.requested = state.working
    }, function(){
        ;
    }, function(){
        this.v = -this.v0
    }
],    /* working */
    [function(){
        this.before = this.now
        this.time = this.now
    }, function(){
        ;
    }, function(){
        ;
    }
]]
    
    function initialize(){
        ThreadAutomata.call(that, that.state, that.currentState, that.solicitors, app_mgr)
        that.app_mgr = app_mgr
    }
    if (arguments.length) 
        initialize()
}

