function Socket(uri, protocols) {
    var that = this
    this.uri = uri || ""
    this.protocols = protocols || ['soap', 'xmpp']
    this.connection = new WebSocket("ws:localhost:8081")

    this.received_msg = ""
}

Socket.prototype.open_socket = function(callback) {
    var that = this

    this.connection.onopen = function() {
        callback()
        //callback.bind(this)
    }
}

Socket.prototype.close_socket = function(msg) {
    var that = this

    this.connection.onclose = function() {
        that.connection.send(msg)
    }
}

// Hacer alguna combpobacion de que el socket esta abierto!!!!
Socket.prototype.communication = function(msg){
alert(msg)
    var that = this 

    this.connection.send(msg)

    this.connection.onmessage = function(e) {
        that.received_msg = e.data
        if (typeof block === 'function')
            block(e.data)
        if (typeof callback === 'function')
            callback()
    }

    this.connection.onerror = function(error) {
        console.log('WebSocket Error ' + error)
    }

}

Socket.prototype.send_msg = function(msg, block, callback) {
    if (this.connection.readyState != 1) 
        this.open_socket(this.communication.bind(this,msg, block, callback))
    else 
        this.communication(msg, block, callback)
}
/*
Socket.prototype.communication = function(msg, block, callback) {
    var that = this
    var message = msg

    function aux() {
        this.connection.send(message)

        this.connection.onmessage = function(e) {
            that.received_msg = e.data
            if (typeof block === 'function') {
                block(e.data)
            }
            if (typeof callback === 'function')
                callback()
        }

        this.connection.onerror = function(error) {
            console.log('WebSocket Error ' + error)
        }

    }

    if (this.connection.readyState != 1) {
        this.open_socket(aux.bind(this))
    } else {
        aux.bind(this)
    }

}
*/