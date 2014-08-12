alert("Interpolator tests")
assert("New Interpolator can be created",
    "b", "true",
    "var a = new Interpolator(new Vector(2,3), new Vector(5,6), new Vector(1,1)); \
    if(a instanceof Interpolator) \
        b = true")

assert("New Interpolator can be created",
    "b", "true",
    "var a = new Interpolator(2, 5, 1); \
    if(a instanceof Interpolator) \
        b = true")

assert("New Interpolator can be created",
    "a.current_point", "2",
    "var a = new Interpolator(2, 5, 1)")

assert("New Interpolator can be created",
    "a.final_point", "5",
    "var a = new Interpolator(2, 5, 1)")

assert("New Interpolator can be created",
    "a.variation", "1",
    "var a = new Interpolator(2, 5, 1)")

assert("Interpolator can call run method",
    "a.current_point", "5",
    "a = new Interpolator(2, 5, 1); \
    while(a.current_point < a.final_point) \
    a.run()")

assert("Interpolator can call run method with vectors",
    "a.current_point.get_coord()", "[5,6]",
    "a = new Interpolator(new Vector(2,3), new Vector(5,6), new Vector(1,1)); \
    while(a.current_point.module() < a.final_point.module()) \
    a.run()")