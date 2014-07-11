function Socket(open_func, received_func, uri, protocols) {
    var that = this
    this.uri = uri || ""
    this.protocols = protocols || ['soap', 'xmpp']
    this.connection = new WebSocket(this.uri, this.protocols)

    this.connection.onopen = function() {
        open_func(that.connection)
    }
    this.connection.onmessage = function(e) {
        received_func(new String(e.data))
    }
}



Socket.prototype.close_socket = function() {
    connection.onclose = function() {
        connection.send('socket closed')
    }
}