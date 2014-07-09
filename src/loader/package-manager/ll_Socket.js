function Socket(uri, protocols){
	this.uri = uri || ""
	this.protocols = protocols || ['soap', 'xmpp']
	this.connection = new WebSocket(this.uri, this.protocols)
	this.is_connect$U = false
	this.reply = "h"
}


Socket.prototype.communication = function(message){
	var that = this

    this.connection.onopen = function () {
        that.connection.send('shape')
    }

    this.is_connect$U = true

    this.connection.onmessage = function (e) {
       that.reply = e.data
    }

    return this.reply
}


Socket.prototype.close_socket = function(){
    connection.onclose = function () {
        connection.send('socket closed')
    }

    this.is_connect$U = false
}

Socket.prototype.send_msg = function(message) {
	this.connection.onopen = function () {
        connection.send(message)
    }
}

