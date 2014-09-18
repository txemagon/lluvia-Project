Triangle.prototype = new Path
Triangle.prototype.constructor = Triangle
Triangle.super = Path


function Triangle() {
    if (arguments.length != 3)
        alert("Invalid number of arguments. A triangle can only be made by three lines")

    for (var i = 0; i < arguments.length; i++) {
        if (!arguments[i] instanceof StraightLine)
            throw "Triangle only accepts StraightLines"
    }

}

Triangle.prototype.check_points = function() {}