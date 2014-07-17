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
    this.socket = new Socket('ws:localhost:8081')
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
            PackageManager.package_uncharged.push(name_packages[i])
        }
    }

    if (callback)
        PackageManager.download(callback)
}


PackageManager.package_uncharged = []

// download debe diferenciar entre servidoer con websocket y sin ellos
// download debe elegir entre uno de ellos en funcion de las capacidades del cliente
PackageManager.download = function(callback) {
    if (PackageManager.package_uncharged.length == 0)
        callback()
        //if (window.WebSocket)
    for (var i = 0; i < PackageManager.package_uncharged.length; i++) {
        var pk = PackageManager.find_package(PackageManager.package_uncharged[i])
        pk.my_manager.socket.open_socket()
        pk.my_manager.socket.communication('{"type": "charge_packages", "body":"' + PackageManager.package_uncharged[i] + '"}', eval, callback)
        pk.my_manager.socket.close_socket()
    }
}