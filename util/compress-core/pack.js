
var FileReader = require('./lib/file_reader.js')
var initial_package = __dirname + '/../../src/package.json'

var f = new FileReader(initial_package)
console.dir( f.read() )


