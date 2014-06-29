var util = require('util')
var fs = require('fs')
var Package = require('./lib/package.js')
var FileReader = require('./lib/file_reader.js')
var initial_package = __dirname + '/../..'

var p = new Package(initial_package, "/src")

p.catalog()

var filelist = []

p.through(function(pk){
        filelist = filelist.concat(pk.get_files())
    }, {prune: ["offers"]})

//FileReader.compress(FileReader.cat(filelist))

FileReader.create_file(FileReader.compress(FileReader.cat(filelist)))