var util = require('util')
var fs = require('fs')
var Package = require('./lib/package.js')
var initial_package = __dirname + '/../..'

var p = new Package(initial_package, "/src")

p.catalog()

var filelist = []

//TODO:
//Quitar las comas de filelist

p.through(function(pk){
        filelist = filelist.concat(pk.get_files())
    }, {prune: ["offers"]})

console.dir(filelist)



