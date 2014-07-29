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

var bring_lluvia = "function bring_lluvia() {" + "\n" +
    "    function init_program() {" + "\n" +
    "        if (typeof required_packages == 'function')" + "\n" +
    "            required_packages()" + "\n" +
    "        PackageManager.download(main)" + "\n" +
    "    }" + "\n" +
    "    function load_dependencies() {" + "\n" +
    "        if (typeof $K_app_dependencies != 'undefined') {" + "\n" +
    "            var app_path = location.pathname.replace(/\\/[^\\/]*\\.html?/, '')" + "\n" +
    "            var app_rel_path = '/javascript/'" + "\n" +
    "            var app_package = new PackageManager(app_path + app_rel_path)" + "\n" +
    "            app_package.create_catalog($K_app_dependencies)" + "\n" +
    "            for (var i = 0; i < $K_app_dependencies.files.length; i++) {" + "\n" +
    "                if (i != $K_app_dependencies.files.length - 1)" + "\n" +
    "                    PackageManager.include_script(app_path + app_rel_path + $K_app_dependencies.path + $K_app_dependencies.files[i].name)" + "\n" +
    "                else {" + "\n" +
    "                    PackageManager.include_script(app_path + app_rel_path + $K_app_dependencies.path + $K_app_dependencies.files[i].name, init_program)" + "\n" +
    "                }" + "\n" +
    "            }" + "\n" +
    "        } else {" + "\n" +
    "            init_program()" + "\n" +
    "        }" + "\n" +
    "    }" + "\n" +
    "    function load_packages() {" + "\n" +
    "        var p = new PackageManager('" + initial_package + "', 'localhost:8081')" + "\n" +
    "        p.create_catalog($K_script_response, load_dependencies)" + "\n" +
    "    }" + "\n" +
    "    PackageManager.include_script('../../dist/catalog.js', load_packages)" + "\n" +
    "}"



FileReader.create_file(Path.join(__dirname, "../../dist/lluvia.js"), text + bring_lluvia)
FileReader.create_file(Path.join(__dirname, "../../dist/catalog.js"), "var $K_script_response = " + root_package.inspect())