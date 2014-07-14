ChatDevice.prototype = new Device
ChatDevice.prototype.constructor = ChatDevice

function ChatDevice(view){
    var that = this
    var args = arguments

    /* Events */
    this.self_events = []

    function initialize(){
        Device.call(that, view)

        that.newGate("button_send", Gate, {
            do_onclick : function(){ comunication("new_msg", text_area.value)}
        })
    }

    if (arguments.length)
        initialize()
}