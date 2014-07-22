function Socket(uri, protocols) {
    this.uri = uri || ""
    this.protocols = protocols || ['soap', 'xmpp']
    this.connection = new WebSocket("ws:" + this.uri)
}

Socket.prototype.open_socket = function(msg, block, callback) {
    var that = this

    this.connection.onopen = function() {
        that.communication(msg, block, callback)
    }
}

Socket.prototype.close_socket = function(msg) {
    var that = this

    this.connection.onclose = function() {
        that.connection.send(msg)
    }
}

Socket.prototype.is_open$U = function() {
    if (this.connection.readyState == 1)
        return true
    return false
}

// Hacer alguna combpobacion de que el socket esta abierto!!!!
Socket.prototype.communication = function(msg, block, callback) {
    var that = this

    this.connection.send(msg)

    this.connection.onmessage = function(e) {
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
    if (!this.is_open$U())
        this.open_socket(msg, block, callback)
    else
        this.communication(msg, block, callback)
}