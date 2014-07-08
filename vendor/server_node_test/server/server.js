
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8080})
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
    	
    })
    ws.send("It's works")
})

console.log("Servidor iniciado...")
