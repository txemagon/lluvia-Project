var util = require('util')
var Package = require('./lib/package.js')
var initial_package = __dirname + '/../..'

var p = new Package(initial_package, "/src")
p.catalog()

//util.puts(p.type_dependency("Facilities"))
//util.puts(p.all_files())
//console.dir(a.is_in$U("Mathematics"))
//console.dir(p.browse_package("Mathematics"))
console.dir(p.get_path("Facilities"))

//util.puts(  p.inspect() )




