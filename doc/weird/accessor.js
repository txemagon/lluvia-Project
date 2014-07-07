function Delegate(Class) {
    this.length = 0
    var $$F$$ = new Function
    $$F$$.prototype = Class.prototype
    return $$F$$
}

function V() {


    _Coord = []

    var coord_temp = []
    var coordinate_system
    var that = this
    this.Coord = new(Delegate(Array))


    for (var i = 0; i < 20; i++)
        Object.defineProperty(this.Coord, i, {
            get: (function() {
                var j = i
                return function() {
                    return _Coord[j] || 0
                }
            })(),
            set: (function() {
                var j = i
                return function(value) {
                    _Coord[j] = value + 5
                }
            })()
        })


    var argument = []
    /*
    for (var i = 0; i < arguments.length; i++)
        this.Coord[i] = arguments[i]
  */
}

v = new V()
v.Coord[1] = 7
v.Coord[2] = 9
v.Coord.push(1)
v.Coord.push(2)
v.Coord[1]
v.Coord.toString()
/*
6,7
*/

_Coord.toString()


/*
6,7,14
*/

//push uses accessor writing simultanesously in _Coord and in v.Coord