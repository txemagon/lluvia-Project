var conversation = ""
var users = []
var n = 0
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8082
    })
wss.on('connection', function(ws) {
    users.push(ws)
    ws.on('message', function(message) {

        var msg = JSON.parse(message)

        switch (msg.type) {
            case "new_msg":
                conversation += msg.body + "\n"
                for (var i = 0; i < users.length; i++)
                    users[i].send(conversation)
                break
        }
    })
})

console.log("Servidor iniciado...")