var util = require('util')
var Package = require('./lib/package.js')
var initial_package = __dirname + '/../..'

var p = new Package(initial_package, "/src")
p.catalog()

//util.puts(p.is_in$U("Core Extensions"))

//util.puts(p.type_dependency("Facilities"))

/*
for(var i=0; i<p.list_package.length; i++){
	console.dir(p.list_package[i].package.package + ": " + p.list_package[i].dependency)
}
*/

//util.puts(p.all_files())

//console.dir(p.list_package.length)
util.puts(  p.inspect() )




