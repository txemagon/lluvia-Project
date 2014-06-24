var util = require('util')
var Package = require('./lib/package.js')
var initial_package = __dirname + '/../..'

var p = new Package(initial_package, "/src")
p.catalog()
var pk = p.find_package("Core Extensions")

p.through(p)




