function Socket(uri, protocols){
	this.uri = uri || ""
	this.protocols = protocols || ['soap', 'xmpp']
	this.connection = new WebSocket(this.uri, this.protocols)
	this.is_connect$U = false
}

/**
 * [method_name description]
 * @param  {[type]} first_argument [description]
 * @return {[type]}                [description]
 */
Socket.prototype.send_msg = function(message) {
	this.connection.onopen = function () {
        connection.send(message)
    }
}

