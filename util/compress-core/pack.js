var util = require('util')
var fs = require('fs')
var Package = require('./lib/package.js')
var FileReader = require('./lib/file_reader.js')
var Sanitize = require('./lib/sanitize.js')
var initial_package = __dirname + '/../..'

var root_package = new Package(initial_package, "/src")
var filelist = []

root_package.catalog()
root_package.through(function(pk){
        filelist = filelist.concat(pk.get_files())
    }, {prune: ["offers"]})

root_package.save({files: ["lluvia.js"], path: "../../dist"})

var text = FileReader.cat(filelist, process.stdout)
text = (new Sanitize(text)).multilines().singles().empty().text

var load_package_manager = "var p = new PackageManager(\""+ initial_package +"\")\n" + 
                           "p.include_script('../../dist/catalog.js')\n" + 
                           "alert(1)\n" +
                           "p.create_catalog($K_script_response)"

FileReader.create_file("../../dist/lluvia.js",text + load_package_manager)
FileReader.create_file("../../dist/catalog.js", "var $K_script_response = " + root_package.inspect())

