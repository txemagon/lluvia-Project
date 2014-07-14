
function required_packages() {
    PackageManager.drop("engine")
}

function main() {
    var chat_device = new ChatDevice("chat")
}




//todo: Refactorizar cuando tenga la clase socket
function comunication(type, body){
    var connection = new WebSocket('ws:localhost:8082', ['soap', 'xmpp'])

    connection.onopen = function() {
        connection.send('{"type": "' + type + '", "body":"' + body + '"}')
    }

    connection.onmessage = function(e) {
        document.getElementById("reading_area").value = e.data
    }

    connection.onerror = function(error) {
        document.getElementById("reading_area").value = "Server not found"
    }
}