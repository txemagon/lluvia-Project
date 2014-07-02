var util = require('util')
var fs = require('fs')
var Package = require('./lib/package.js')
var FileReader = require('./lib/file_reader.js')
var Sanitize = require('./lib/sanitize.js')
var initial_package = __dirname + '/../..'

var root_package = new Package(initial_package, "/src")
var filelist = []

root_package.catalog()
root_package.through(function(pk){
        filelist = filelist.concat(pk.get_files())
    }, {prune: ["offers"]})

root_package.save({files: ["all.js"], path: "../../dist"})

var text = FileReader.cat(filelist, process.stdout)
text = (new Sanitize(text)).multilines().singles().empty().text
FileReader.create_file("../../dist/all.js", text)