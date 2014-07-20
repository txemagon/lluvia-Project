ChatDevice.prototype = new Device
ChatDevice.prototype.constructor = ChatDevice

function ChatDevice(view){
    var that = this
    var args = arguments
    this.socket = new Socket()
    this.user = ""

    /* Events */
    this.self_events = []

    function initialize(){
        Device.call(that, view)       

        that.newGate("button_send", Gate, {
            do_onclick : function(){ 
                that.new_msg(text_area.value)
                text_area.value = ""
            }
        })

        that.newGate("text_area", Gate, {
            do_onkeypress : function(event){ 
                if(event.keyCode == 13){
                    that.new_msg(text_area.value)
                    text_area.value = ""
                }
            }
        })

           
    }

    if (arguments.length)
        initialize()
}

ChatDevice.prototype.new_user = function(body){
    this.user = body
    this.socket.communication('{"type": "new_user", "body":"' + body + '"}', 
        function(e){document.getElementById("reading_area").innerHTML += e + "<br>"},
        function(){reading_area.scrollTop = 180000}
    )
    text_area.focus()
}

ChatDevice.prototype.new_msg = function(msg){
    this.socket.communication('{"type": "new_msg", "user": "' + this.user + '" ,"body": "'+ msg +'"}',
        function(e){document.getElementById("reading_area").innerHTML += e + "<br>"},
        function(){reading_area.scrollTop = 180000}
    )
}