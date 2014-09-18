ConveyorBelt.prototype = new Device
ConveyorBelt.prototype.constuctor = ConveyorBelt
function ConveyorBelt(view){
    var that = this
    var args = arguments

    /* Events */
    this.self_events = []

    function initialize(){
        Device.call(that, view)
        that.threads.push(that.transit = new App_transit(that, view))
    }

    if (arguments.length)
        initialize()
}

ConveyorBelt.prototype.attend_go_to = function(date, mssg){
    this.transit.set_objective(mssg.event.go_to.data)
    this.transit.switch("transiting")

}