var conversation = ""
var users = []
var n = 0
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        //port: 443
        port: 8081
    })

wss.broadcast = function(data) {
    for (var i in this.clients)
        this.clients[i].send(data);
};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        var msg = JSON.parse(message)

        switch (msg.type) {
            case "new_user":
                users.push({
                    name: msg.body,
                    ws: ws
                })
                var last_msg = ".: " + msg.body + " is connected :." + "\n"
                conversation += last_msg
                //ws.send(last_msg)
                wss.broadcast(last_msg)
                break

            case "new_msg":
                var last_msg = msg.user + ": " + msg.body + "\n"
                conversation += last_msg
                wss.broadcast(last_msg)
                //ws.send(last_msg)
                break
            case "socket_closed":
                console.log("Socket cerrado")
                break

        }
    });
});
/*

wss.on('connection', function(ws) {
    ws.on('message', function(message) {

        var msg = JSON.parse(message)

        switch (msg.type) {
            case "new_user":
                users.push({name: msg.body, ws: ws})
                var last_msg = msg.body + " connected" + "\n"
                conversation += last_msg
                for (var i = 0; i < users.length; i++)
                    users[i].ws.send(last_msg)
                break

            case "new_msg":
                var last_msg = msg.user +": "+  msg.body + "\n"
                conversation += last_msg
                wss.broadcast(last_msg)
                break
        }
    })
})
*/
console.log("Servidor iniciado...")