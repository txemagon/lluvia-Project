function required_packages() {
    //PackageManager.drop("engine")
}

function main() {
    var user = prompt("Who you are?", Your name)
    var chat_device = new ChatDevice("chat")
}




//todo: Refactorizar cuando tenga la clase socket
function comunication(type, body) {
    var connection = new WebSocket('ws:novaws.es:443/lluvia-Project/vendor/chat/server', ['soap', 'xmpp'])

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