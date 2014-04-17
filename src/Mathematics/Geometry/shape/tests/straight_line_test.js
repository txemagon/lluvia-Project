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

