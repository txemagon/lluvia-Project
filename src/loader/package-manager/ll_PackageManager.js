/**
 * @class PackageManager
 * Description.
 */

/**
 * @method constructor
 * Description.
 *
 * @param
 */
function PackageManager(uri) {
    this.uri = uri
    this.packages_server = []
    this.catalog = []
    this.offers = []
    this.socket = new Socket('ws:novaws.es:443/lluvia-Project/vendor/server_node_test/server/')
    this.package_uncharged = []

    PackageManager.all_packages_managers.push(this)
}

PackageManager.all_packages = []
PackageManager.offers = []

PackageManager.include_script = function(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript"

    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null
                callback($K_script_response)
            }
        }
    } else { //Others
        script.onload = function() {
            callback($K_script_response)
        }
    }
    script.src = url
    document.getElementsByTagName("head")[0].appendChild(script)
}

PackageManager.prototype.get_catalog = function(callback) {
    if (!this.catalog.length)
        PackageManager.include_script(this.uri + "/dist/" + "catalog.js", callback.bind(this))
}

PackageManager.prototype.test = function() {
    alert(this.socket)
}

PackageManager.prototype.create_catalog = function(initial_package) {
    var that = this

    var pk = new Package(initial_package, this)
    PackageManager.all_packages.push(pk)
    pk.catalog()
    pk.through(function(pk) {
        for (var i = 0; i < pk.offers.length; i++) {
            PackageManager.offers.push(pk.offers[i].package)
        }
    })

    if (typeof required_packages == 'function')
        required_packages()

    PackageManager.download(main)
}

PackageManager.prototype.is_in$U = function(name_package) {
    var exist = false

    for (var i = 0; i < this.catalog.length; i++)
        this.catalog[i].through(function(pk) {
            if (pk.package == name_package)
                exist = true
        })

    return exist
}

PackageManager.is_offer$U = function(name_package) {
    var is_offer = false

    for (var i = 0; i < PackageManager.offers.length; i++)
        if (PackageManager.offers[i] == name_package) {
            is_offer = true
        }


    return is_offer
}

PackageManager.what_offers = function() {
    var offers = ""

    for (var i = 0; i < offers.length; i++) {
        offers += offers[i]
        if (i != offers.length - 1)
            offers += ","
    }

    return offers
}

PackageManager.find_package = function(name_package) {
    var package = {}

    for (var i = 0; i < PackageManager.all_packages.length; i++)
        PackageManager.all_packages[i].through(function(pk) {
            if (pk.package == name_package)
                package = pk
        })

    return package
}


PackageManager.drop = function() {
    if (typeof arguments[arguments.length - 1] === 'function')
        var callback = arguments[arguments.length - 1]
    var name_packages = arguments

    for (var i = 0; i < name_packages.length; i++) {
        if (PackageManager.is_offer$U(name_packages[i])) {
            var pk = PackageManager.find_package(name_packages[i])
            pk.my_manager.package_uncharged.push(pk.package)
        }
    }

    if (callback)
        PackageManager.download(callback)
}

PackageManager.all_packages_managers = []
PackageManager.package_uncharged = []

// download debe diferenciar entre servidoer con websocket y sin ellos
// download debe elegir entre uno de ellos en funcion de las capacidades del cliente
PackageManager.download = function(callback) {
    //if (window.WebSocket)
    for (var i = 0; i < PackageManager.all_packages_managers.length; i++) {
        if (PackageManager.all_packages_managers[i].package_uncharged.length) {
            var packages = PackageManager.all_packages_managers[i].package_uncharged.join()
            var pm = PackageManager.all_packages_managers[i]
            pm.socket.open_socket()
            if (i == PackageManager.all_packages_managers.length - 1)
                pm.socket.communication('{"type": "charge_packages", "body":"' + packages + '"}', eval, callback)
            else
                pm.socket.communication('{"type": "charge_packages", "body":"' + packages + '"}', eval)
            pm.socket.close_socket()

            PackageManager.all_packages_managers[i].package_uncharged = []
        } else {
            callback()
        }
    }
}