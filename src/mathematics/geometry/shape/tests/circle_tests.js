alert("Hola")
assert("StraightLine accepts parameters",
    "a.toSource()", '"({center:[1, 1], radius:[2, 3]})"',
    'var a = new Circle([1,1],[2,3])')
assert("center",
    "a.center", '[1, 1]',
    'var a = new Circle([1,1],[2,3])')
assert("radius",
    "a.radius", '[2, 3]',
    'var a = new Circle([1,1],[2,3])')
assert("get inicial point",
    "a.get_inicial_point()", '[1, 1]',
    'var a = new Circle([1,1],[2,3])')
assert("radius at ",
    "a.radius_at(0,1)", '[2, 3]',
    'var a = new Circle([1,1],[2,3])')
assert("get_inicial_point ",
    "a.get_inicial_point()", '[1, 1]',
    'var a = new Circle([1,1],[2,3])')
assert("get_intersection ",
    "a.get_intersection(b, 45)", '[1, 1]',
    'a = new Circle([1,1],[2,3]); \
    b = new StraightLine([2,6], [4,8])')
assert("get_tangent ",
    "a.get_tangent(0,2)", '-0.9272952180016122',
    'a = new Circle([1,1],[2,3])')