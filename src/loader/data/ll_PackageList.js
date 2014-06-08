/**
 * @class PackageList
 * Hash with all packages.
 *
 * ### Example
 *     {
 *     Boid: {
 *       package: "Boid",
 *       description: "lluvia loader. User application loader. Booter.",
 *       path: "/kernel",
 *       requires: ["loader-v1.0"],
 *       provides: ["utils", "kernel~v2.0", "engine>v3.5", "browser", "mathematics"],
 *       offers:   [],
 *       files:    [File, File]
 *     }
 *    }
 */


PackageList.prototype = new AutoHash
PackageList.prototype.constructor = PackageList
/**
 * @method constructor
 *
 */
function PackageList() {

}


/**
 * @method to_a
 * Converts to array.
 *
 * @return {Array} List with all packages.
 */
PackageList.prototype.to_a = function() {
    var packages = []
    for (var i in this)
        packages.push(this[i])
    return packages
}
PackageList.prototype.stop_enumerating("to_a")


/**
 * @method add
 * Adds a package to the package list.
 *
 * @param  {Object} package    A Hash with package attribute
 *                             containing the name of the package.
 */
PackageList.prototype.add = function(package) {
    if (!package["package"])
        throw "Can't find package name."
    this[package["package"]] = package
}
PackageList.prototype.stop_enumerating("add")