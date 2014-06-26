var util = require('util')
var Package = require('./lib/package.js')
var initial_package = __dirname + '/../..'

var p = new Package(initial_package, "/src")

p.catalog()

var list = []

p.through(function(pk){
        list.push(pk)
    }, {last_package: this, prune: ["requires","offers"], already_there: []})




//var utils = p.find_package("kernel")
//var files = utils.get_files()


//util.puts(files)

 





