function Socket(uri, protocols) {
    var that = this
    this.uri = uri || ""
    this.protocols = protocols || ['soap', 'xmpp']
    //this.connection = new WebSocket("ws:localhost:8081")

    this.received_msg = ""
}

Socket.prototype.open_socket = function() {
    //this.connection = new WebSocket(this.uri, this.protocols)
}

Socket.prototype.close_socket = function() {
    var that = this

    this.connection.onclose = function() {
        that.connection.send('socket closed')
    }
}




Socket.prototype.communication = function(msg, block, callback) {
    var that = this
    this.connection = new WebSocket("ws:localhost:8081")
    
    this.connection.onopen = function() {
        that.connection.send(msg)
    }

    this.connection.onmessage = function(e) {
        that.received_msg = e.data
        if (typeof block === 'function'){
            block(e.data)
        }
        if (typeof callback === 'function')
            callback()
    }

    this.connection.onerror = function(error) {
        that.console.log('WebSocket Error ' + error)
    }
}