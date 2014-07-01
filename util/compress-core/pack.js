var util = require('util')
var fs = require('fs')
var Package = require('./lib/package.js')
var FileReader = require('./lib/file_reader.js')
var Sanitize = require('./lib/sanitize.js')
var initial_package = __dirname + '/../..'

var p = new Package(initial_package, "/src")
var filelist = []

p.catalog()
p.through(function(pk){
        filelist = filelist.concat(pk.get_files())
    }, {prune: ["offers"]})

//var distro = new Package(..., ...)
// p.path == "/kernel/dist"
//distro.save({package: "distribution", files: ["all.js"], path: "../../"})

var text = FileReader.cat(filelist, process.stdout)

var a = new Sanitize(text).multilines().singles().empty()

p.save({files: ["all.js"], path: "../../dist", text: a.text})