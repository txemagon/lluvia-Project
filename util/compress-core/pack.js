var util = require('util')
var Package = require('./lib/package.js')
var initial_package = __dirname + '/../..'

var p = new Package(initial_package, "/src")
p.catalog()

//console.dir(p.list_package[0])
//util.puts(p.type_dependency("Facilities"))
util.puts(p.get_files())
//console.dir(p.is_in$U("test"))
//console.dir(p.find_package("test"))
//console.dir(p.find_package("kernel"))
//console.dir(p.get_path("kernel"))

//util.puts(  p.inspect() )




