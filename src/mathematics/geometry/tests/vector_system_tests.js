alert("cargaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, borbabor")
assert("A new VectorSystem can be created",
    'b', 'true',
    'var a = new VectorSystem(new Vector(2,3), new Vector(5,9)); \
        if(a instanceof VectorSystem); \
            var b = true')

assert("VectorSystem#get_vectors returns an instance of Array",
    'c', 'true',
    'var a = new VectorSystem(new Vector(25,9), new Vector(1,4)); \
        var b = a.get_vectors(); \
        if(b instanceof Array); \
            var c = true')

assert("A new VectorSystem can be created",
    'a.get_vectors()', '[ [5, 3], [1, 2] ]',
    'var a = new VectorSystem(new Vector(25,9), new Vector(1,4)); \
        a.map$B(Math.sqrt)')

assert("A new VectorSystem can be created",
    'a.get_vectors()', '[ [2, 3], [4, 7], [5, 6] ]',
    'var a = new VectorSystem(new Vector(2,3), new Vector(4,7)); \
        a.inject(new Vector(5,6))')

assert("A new VectorSystem can be created",
    'a.get_vectors()', '[[2, 3], [4, 7], [5, 6], [9, 8]]',
    'var a = new VectorSystem(new Vector(2, 3), new Vector(4, 7)); \
        a.inject(new Vector(5,6), new Vector(9,8))')