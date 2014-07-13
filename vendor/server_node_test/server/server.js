var util = require('util')
var fs = require('fs')
var Path = require('path')
var Package = require('../../../util/compress-core/lib/package.js')
var FileReader = require('../../../util/compress-core/lib/file_reader.js')
var Sanitize = require('../../../util/compress-core/lib/sanitize.js')
var initial_package = __dirname + '/../../..'

var root_package = new Package(initial_package, "/src")
root_package.catalog()

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8081
    })
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        var msg = JSON.parse(message)
        
        switch(msg.type){
            case "charge_packages":
                var text = ""
                var packages = msg.body.length ? msg.body.split(",") : []

                for(var i=0; i<packages.length; i++){
                    var pk = root_package.find_package(packages[i])
                    var filelist = pk.get_files()

                    text += FileReader.cat(filelist, process.stdout)
                }

                text = (new Sanitize(text)).multilines().singles().empty().text
                ws.send(text)
                break
        }



    })
})

console.log("Servidor iniciado...")