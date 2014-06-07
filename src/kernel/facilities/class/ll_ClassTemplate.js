/**
 * @method get_constructor
 * Creates a function constructor to generate object like this.
 * Default values are those present in this object.
 *
 * ### Example
 *
 *     var C = ({
 *         package: "Boid",
 *         description: "lluvia loader. User application loader. Booter.",
 *         path: "/kernel",
 *         requires: ["loader-v1.0"],
 *         provides: ["utils", "kernel~v2.0", "engine>v3.5", "browser", "mathematics"],
 *         offers:   [],
 *         files:    ["ClassSmthing.js", "main.js"]
 *     }).get_constructor()
 *
 *     var pack = new C()
 *     pack.toSource()
 *     // => {
 *     // =>     package:"Boid",
 *     // =>     description:"lluvia loader. User application loader. Booter.",
 *     // =>     path:"/kernel", requires:["loader-v1.0"],
 *     // =>     provides:["utils", "kernel~v2.0", "engine>v3.5", "browser", "mathematics"],
 *     // =>     offers:[], files:["ClassSmthing.js", "main.js"]
 *     // => }
 *
 * @return {Function}
 */
Object.defineProperty(Object.prototype, "get_constructor", {
    value: function() {
        var that = this
        return function() {
            var index = 0
            for (var i in that)
                this[i] = that[i] || arguments[index++]
        }
    },
    enumerable: false
})

/**
 * @method to_class
 * Creates a constructor function to generate objects like this.
 *
 * ### Example
 *
 *     ({
 *         package: "Boid",
 *         description: "lluvia loader. User application loader. Booter.",
 *         path: "/kernel",
 *         requires: ["loader-v1.0"],
 *         provides: ["utils", "kernel~v2.0", "engine>v3.5", "browser", "mathematics"],
 *         offers:   [],
 *         files:    ["ClassSmthing.js", "main.js"]
 *     }).to_class("Package")
 *
 *     var p = new Package()
 *
 * @param  {String}    class_name
 * @return {Function}  Class constructor
 */
Object.defineProperty(Object.prototype, "to_class", {
    value: function(class_name) {
        return window[class_name] = this.get_constructor()
    },
    enumerable: false
})