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

/**
 *
 */
PackageManager.all_packages = []

PackageManager.prototype.wait = function() {
    //if(!$K_script_response)
    setTimeout(10, PackageManager.prototype.wait)
}

/**
 *
 */
PackageManager.prototype.include_script = function(src) {
    $K_script_response = 0
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.src = src
    script.async = false
    document.getElementsByTagName('head')[0].appendChild(script)
    this.wait()
}

/**
 *
 */
PackageManager.prototype.get_catalog = function() {
    if (!this.catalog.length)
        this.include_script(this.uri + "/dist/" + "catalog.js")
}

/**
 *
 */
PackageManager.prototype.create_catalog = function() {
    var that = this
    var pk = new Package($K_script_response)
    this.catalog.push(pk)
    pk.catalog()
    pk.through(function(pk) {
        for (var i = 0; i < pk.offers.length; i++) {
            that.offers.push(pk.offers[i].package)
        }
    })
}

/**
 *
 */
PackageManager.prototype.is_in$U = function(name_package) {
    var exist = false

    for (var i = 0; i < this.catalog.length; i++)
        this.catalog[i].through(function(pk) {
            if (pk.package == name_package)
                exist = true
        })

    return exist
}

/**
 *
 */
PackageManager.prototype.is_offer$U = function(name_package) {
    var is_offer = false

    for (var i = 0; i < this.offers.length; i++)
        if (this.offers[i] == name_package) {
            is_offer = true
        }


    return is_offer
}

PackageManager.prototype.find_package = function(name_package) {
    var package = {}

    for (var i = 0; i < this.catalog.length; i++)
        this.catalog[i].through(function(pk) {
            if (pk.package == name_package)
                package = pk
        })

    return package
}

/**
 *
 */
PackageManager.prototype.drop = function(name_package) {
    if (this.is_offer$U(name_package)) {
        var package = this.find_package(name_package)
        for (var i = 0; i < package.files.length; i++)
            this.include_script(this.uri + "/src/mathematics/geometry/shape/" + package.files[0].name)
    }
}