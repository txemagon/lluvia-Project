var util = require('util')
var Package = require('./lib/package.js')
var initial_package = __dirname + '/../..'

var p = new Package(initial_package, "/src")

p.catalog()

var list = []

p.through(function(pk){
        list.push(pk)
    }, {last_package: this, prune: [], already_there: []})

console.dir(Package.get_files(list))

 





