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

var text = FileReader.cat(filelist)

var a = new Sanitize(text).multilines().singles().empty()

FileReader.create_file("packages_lluvia.js", a.text)
