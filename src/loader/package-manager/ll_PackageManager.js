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
    this.catalog.push(new Package($K_script_response))
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
PackageManager.prototype.drop = function(name_package) {
    if (this.is_in$U(name_package));

}