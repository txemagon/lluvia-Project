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
}


PackageManager.all_packages = []
PackageManager.offers = []

PackageManager.wait = function() {
    //if(!$K_script_response)
    setTimeout(10, PackageManager.wait)
}

PackageManager.include_script = function(src) {
    $K_script_response = 0
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.src = src
    script.async = false
    document.getElementsByTagName('head')[0].appendChild(script)
    this.wait()
}

PackageManager.prototype.get_catalog = function() {
    if (!this.catalog.length)
        PackageManager.include_script(this.uri + "/dist/" + "catalog.js")
}

PackageManager.prototype.create_catalog = function(initial_package) {
    var that = this
    var pk = new Package(initial_package)
    PackageManager.all_packages.push(pk)
    pk.catalog()
    pk.through(function(pk) {
        for (var i = 0; i < pk.offers.length; i++) {
            PackageManager.offers.push(pk.offers[i].package)
        }
    })
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

PackageManager.prototype.what_offers = function() {
    var offers = ""

    for (var i = 0; i < this.offers.length; i++) {
        offers += this.offers[i]
        if (i != this.offers.length - 1)
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

PackageManager.drop = function(server, name_package) {
    if (PackageManager.is_offer$U(name_package)) {
        var package = PackageManager.find_package(name_package)
        for (var i = 0; i < package.files.length; i++) {
            PackageManager.include_script(server.uri + package._path + package.files[i].name)
        }
    }
}