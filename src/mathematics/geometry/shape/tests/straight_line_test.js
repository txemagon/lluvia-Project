assert("StraightLine accepts parameters",
    "a.toSource()", '"({initial_point:{Coord:[4, 6], _module:7.211102550927978, uVector:[0.5547001962252291, 0.8320502943378437]}, director:{Coord:[2, 4], _module:4.47213595499958, uVector:[0.4472135954999579, 0.8944271909999159]}})"',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

assert("StraightLine returns director Vector",
    "a.director", '[2,4]',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

assert("StraightLine returns initial parameters",
    "a.get_initial_point()", '[4,6]',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

assert("StraightLine returns first coordinate of director Vector",
    "a.director.get_coord(0)", '2',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

assert("StraightLine returns last coordinate of director Vector",
    "a.director.get_coord(1)", '4',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

assert("StraightLine returns the tangent to the Vector",
    "a.get_tangent(0.1)", ' [0.4472135954999579, 0.8944271909999159]',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

assert("StraightLine returns first coordinate of the tangent to the Vector",
    "a.get_tangent(0.1).get_coord(0)", '0.4472135954999579',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

assert("StraightLine returns last coordinate of the tangent to the Vector",
    "a.get_tangent(0.1).get_coord(1)", '0.8944271909999159',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

assert("StraightLine returns a defined point given by lambda",
    "a.at(0.5)", '[5,8]',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

assert("StraightLine returns perpendicular Vector to the Vector",
    "a.get_normal()", '[-0.8944271909999159, 0.4472135954999579]',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')


assert("StraightLine returns first coordinate of the perpendicular Vector to the Vector",
    "a.get_normal(0.1).get_coord(0)", '-0.8944271909999159',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

assert("StraightLine returns last coordinate of the perpendicular Vector to the Vector",
    "a.get_normal(0.1).get_coord(1)", '0.4472135954999579',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

// Saber la distancia desde el origen a un punto de una recta normal con parametro
assert("Find the distance from the origin of the straight to the point with lambda.",
    "a.get_arc_length(0.5)", ' 2.23606797749979',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

// Saber la distancia desde el origen a un punto de una recta normal sin parametro
assert("Find the distance from the origin of the straight to the point without lambda(default 1).",
    "a.get_arc_length()", ' 4.47213595499958',
  'var a = new StraightLine(new Vector(4, 6), new Vector(6, 10))')

// Saber la distancia desde el origen a un punto de una recta horizontal
assert("Find the distance from the origin of the straight to the point in horizontal line",
    "a.get_arc_length(0.5)", '2',
  'var a = new StraightLine(new Vector(4, 2), new Vector(8, 2))')
// Saber la distancia desde el origen a un punto de una recta vertiacal
assert("Find the distance from the origin of the straight to the point in vertical line",
    "a.get_arc_length(0.25)", '2.5',
  'var a = new StraightLine(new Vector(2, 0), new Vector(2, 10))')

// Comprobar el error minimo permitido para calcular distancias dando true
assert("Check the minimum error for calculating distances",
    "a.belongs_to$U(new Vector(2.000000001, 0))", 'true',
  'var a = new StraightLine(new Vector(2, 0), new Vector(2, 10))')
// Comprobar el error minimo permitido para calcular distancias dando false
assert("Check the minimum error for calculating distances",
    "a.belongs_to$U(new Vector(2.1, 0))", 'false',
  'var a = new StraightLine(new Vector(2, 0), new Vector(2, 10))')

// Calcular la linea perpendicular a otra pasando un vector
assert("Calculate the line perpendicular to another by passing a vector",
    "b.director", 'a.get_normal()',
  'var a = new StraightLine(new Vector(2, 0), new Vector(2, 10));  b = a.get_perpendicular(new Vector(2,0))')

// Calcular la linea perpendicular a otra pasando un punto
assert("Calculate the line perpendicular to another by passing a point",
    "b.director", 'a.get_normal()',
  'var a = new StraightLine(new Vector(2, 0), new Vector(2, 10));  b = a.get_perpendicular(2)')

// Calcular la linea perpendicular a otra siendo la primera vertical
assert("Calculating the line being perpendicular to a first vertical",
    "b.director", 'a.get_normal()',
  'var a = new StraightLine(new Vector(3, -10), new Vector(3, 7));  b = a.get_perpendicular(new Vector(2,0))')

// Calcular la linea perpendicular a otra siendo la primera horizontal
assert("Calculating the line being perpendicular to a first horizontal",
    "b.director", 'a.get_normal()',
  'var a = new StraightLine(new Vector(-7, 10), new Vector(-1, 10));  b = a.get_perpendicular(new Vector(2,0))')

