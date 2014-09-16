
App_transit.prototype = new ThreadAutomata
App_transit.prototype.constructor = App_transit

function App_transit(app_mgr, view, actual_app, separation, step){
    var that = this
    this.view = document.getElementById(view) || {}
    this.margin = 0
    this.actual_app = actual_app || 1
    this.objective = 0
    this.separation = separation || 350
    this.step = step || 50
    
    this.distance = 0
    this.margin_initial = 0
    this.lock = false
    var solicitors = {
        transiting: function(){
            if(that.objective > that.actual_app){
                that.distance = that.separation * (that.objective - that.actual_app)
                if(!that.lock){
                    that.margin_initial = that.margin
                    that.lock = true
                }
                that.distance = that.distance - that.margin_initial
        		if(that.distance > -that.margin){
        		    that.margin -= that.step
        		    that.view.style.marginLeft = that.margin + "px"
        		}
        		else{
        			that.actual_app = that.objective
                    that.lock = false
        		}
        	}
        	else if(that.objective < that.actual_app){
                that.distance = that.separation * (that.actual_app - that.objective)
                if(!that.lock){
                    that.margin_initial = that.margin
                    that.lock = true
                }
                that.distance = that.distance + that.margin_initial
        		if(that.distance > that.margin){
        		    that.margin += that.step
        		    that.view.style.marginLeft = that.margin + "px"
        		}
        		else{
        			that.actual_app = that.objective
                    that.lock = false
        		}
        	}
        }
    }

    function initialize(){
        ThreadAutomata.call(that, ["transiting"], solicitors, app_mgr)
        that.app_mgr = app_mgr
    }
    if (arguments.length)
        initialize()
}

App_transit.prototype.set_objective = function(objective){
	this.objective = objective
}