var util = require('util')
var fs = require('fs')
var Path = require('path')
var Package = require('../../../util/compress-core/lib/package.js')
var FileReader = require('../../../util/compress-core/lib/file_reader.js')
var Sanitize = require('../../../util/compress-core/lib/sanitize.js')
var initial_package = __dirname + '/../../..'


var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8080})
wss.on('connection', function(ws) {
    ws.on('message', function(message) {

        var root_package = new Package(initial_package, "/src")
        var filelist = []

        root_package.catalog()
        root_package.through(function(pk){
            filelist = filelist.concat(pk.get_files())
        }, {prune: ["offers"]})

        root_package.save({files: ["lluvia.js"], path: Path.join(__dirname, "../../../dist")})

        var text = FileReader.cat(filelist, process.stdout)
        text = (new Sanitize(text)).multilines().singles().empty().text

        var load_package_manager = "var p = new PackageManager(\""+ initial_package +"\")\n" + 
                                   "p.get_catalog()\n" //+ 
                                 //"p.create_catalog()" 

        FileReader.create_file(Path.join(__dirname, "../../../dist/lluvia.js"),text + load_package_manager)
        FileReader.create_file(Path.join(__dirname, "../../../dist/catalog.js"), "var $K_script_response = " + root_package.inspect())
    	
    })
    ws.send("It's works")
})

console.log("Servidor iniciado...")





