function main(){


    var connection = new WebSocket('ws:localhost:8080', ['soap', 'xmpp'])

    connection.onopen = function () {
        connection.send('Ping'); // Send the message 'Ping' to the server
    }

    // Log errors
    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error)
    }

    // Log messages from the server
    connection.onmessage = function (e) {
       alert(e.data)
    }
}