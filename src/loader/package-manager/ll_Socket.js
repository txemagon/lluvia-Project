function Socket(uri, protocols) {
    var that = this
    this.uri = uri || ""
    this.protocols = protocols || ['soap', 'xmpp']
    this.connection = new WebSocket("ws:localhost:8081")

    this.received_msg = ""

    //this.connection.onopen = function() {}

    //alert(1)
}

Socket.prototype.open_socket = function(callback) {
    this.connection.onopen = function() {
        callback()
    }
}

Socket.prototype.close_socket = function() {
    var that = this

    this.connection.onclose = function() {
        that.connection.send('socket closed')
    }
}




Socket.prototype.communication = function(msg, block, callback) {
    var that = this

    function msg() {
        alert("msg")
        this.connection.send(msg)

        this.connection.onmessage = function(e) {
            that.received_msg = e.data
            if (typeof block === 'function') {
                block(e.data)
                //alert("llego")
            }
            if (typeof callback === 'function')
                callback()
        }

        this.connection.onerror = function(error) {
            console.log('WebSocket Error ' + error)
        }
    }

    if (this.connection.readyState != 1) {
        this.open_socket(msg.bind(this))
    } else {
        this.connection.send(msg)

        this.connection.onmessage = function(e) {
            that.received_msg = e.data
            if (typeof block === 'function') {
                block(e.data)
                //alert("llego")
            }
            if (typeof callback === 'function')
                callback()
        }

        this.connection.onerror = function(error) {
            console.log('WebSocket Error ' + error)
        }
    }

}