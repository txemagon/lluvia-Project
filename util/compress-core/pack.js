var util = require('util')
var fs = require('fs')
var Path = require('path')
var Package = require('./lib/package.js')
var FileReader = require('./lib/file_reader.js')
var Sanitize = require('./lib/sanitize.js')
var initial_package = __dirname + '/../..'

var root_package = new Package(initial_package, "/src")
var filelist = []

root_package.catalog()
root_package.through(function(pk) {
    filelist = filelist.concat(pk.get_files())
}, {
    prune: ["offers"]
})

root_package.save({
    files: ["lluvia.js"],
    path: Path.join(__dirname, "../../dist")
})

var text = FileReader.cat(filelist, process.stdout)
text = (new Sanitize(text)).multilines().singles().empty().text

var bring_lluvia = "function bring_lluvia(){" + "\n" +
    "    var p = new PackageManager('" + initial_package + "')" + "\n" +
    "    p.get_catalog(p.create_catalog)" + "\n" +
    "    // Esta parte esta dentro de create_catalog()" + "\n" +
    "    //if(typeof required_packages == 'function')" + "\n" +
    "    //    required_packages()" + "\n" +
    "    PackageManager.download(main)" + "\n" +
    "}"

FileReader.create_file(Path.join(__dirname, "../../dist/lluvia.js"), text + bring_lluvia)
FileReader.create_file(Path.join(__dirname, "../../dist/catalog.js"), "var $K_script_response = " + root_package.inspect())