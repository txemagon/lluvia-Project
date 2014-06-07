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

/**
 * @method constructor
 *
 */
PackageList.prototype = new AutoHash
PackageList.prototype.constructor = PackageList

function PackageList() {

}

/**
 * @method to_a
 * Converts to array.
 *
 * @return {Array} List with all packages.
 */
Object.defineProperty(PackageList.prototype, "to_a", {
        value: function() {
            var packages = []
            for (var i in this)
                packages.push(this[i])
            return packages
        },
        enumerable: false
    }
}

Object.defineProperty(PackageList.prototype, "add", {
    value: function(package) {
        if (!package["package"])
            throw "Can't find package name."
        this[package["package"]] = package
    },
    enumerable: false
})