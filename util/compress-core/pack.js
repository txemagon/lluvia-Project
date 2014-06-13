var Package = require('./lib/package.js')
var initial_package = __dirname + '/../..'


var p = new Package(initial_package, "/src")

console.dir( c.catalog() )




