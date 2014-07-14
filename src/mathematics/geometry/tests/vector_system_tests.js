alert("cargaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, borbabor")
assert("A new VectorSystem can be created",
    'b', 'true',
    'var a = new VectorSystem(new Vector(2,3), new Vector(5,9)); \
        if(a instanceof VectorSystem); \
            var b = true')

assert("VectorSystem#to_a returns an instance of Array",
    'c', 'true',
    'var a = new VectorSystem(new Vector(25,9), new Vector(1,4)); \
        var b = a.to_a(); \
        if(b instanceof Array); \
            var c = true')

assert("A new vector can be added to VectorSystem",
    'a.to_a()', '[ [2, 3], [4, 7], [5, 6] ]',
    'var a = new VectorSystem(new Vector(2,3), new Vector(4,7)); \
        a.push(new Vector(5,6))')

assert("A group of vectors can be added to VectorSystem",
    'a.to_a()', '[[2, 3], [4, 7], [5, 6], [9, 8]]',
    'var a = new VectorSystem(new Vector(2, 3), new Vector(4, 7)); \
        a.push(new Vector(5,6), new Vector(9,8))')

assert("A VectorSystem can be mapped",
    'a.to_a()', '[ [5, 3], [1, 2] ]',
    'var a = new VectorSystem(new Vector(25,9), new Vector(1,4)); \
        a.map$B(Math.sqrt)')

assert("A new vector can be pushed with index to a VectorSystem",
    'a.to_a()', '[ [2, 3], [25, 9], [4, 7] ]',
    'var a = new VectorSystem(new Vector(2, 3), new Vector(4, 7)); \
        a.push_with_index(1, new Vector(25, 9))')

assert("A group of vectors can be pushed with index to a VectorSystem",
    'a.to_a()', '[ [2, 3], [25, 9], [10, 6], [4, 7] ]',
    'var a = new VectorSystem(new Vector(2, 3), new Vector(4, 7)); \
        a.push_with_index(new Vector(25, 9), 1, new Vector(10,6))')

assert("An Array can be transformed into an array of vectors and create a VectorSystem",
    'c.to_a()', '[ [2, 3], [5, 4], [6, 8] ]',
    'var a = [2,3,5,4,6,8]; \
        var b = a.to_v(); \
        var c = new VectorSystem(b)')

assert("An Array can be transformed into an array of vectors and create a VectorSystem - 2",
    'c.to_a()', '[ [2, 3], [5, 4], [6, 8], [1, 1] ]',
    'var a = [2,3,5,4,6,8]; \
        var b = a.to_v(); \
        var c = new VectorSystem(b, new Vector(1,1))')

assert("An Array can be transformed into an array of vectors and create a VectorSystem - 3",
    'c.to_a()', '[ [2, 3], [5, 4], [6, 8], [1, 1] ]',
    'var c = new VectorSystem([2,3,5,4,6,8].to_v(), new Vector(1,1))')

assert("Uniq$B",
    'c.to_a()', '[ [1, 1] ]',
    'var c = new VectorSystem(new Vector(1,1), new Vector(1,1)); \
     c.uniq$B()')

assert("Uniq$B",
    'c.to_a()', '[ [1, 1] ]',
    'var c = new VectorSystem(new Vector(1,1), new Vector(1,1), new Vector(1,1)); \
     c.uniq$B()')

assert("Uniq$B",
    'a.to_a()', '[ [2,3], [1, 6] ]',
    'var a = new VectorSystem(new Vector(2,3), new Vector(2,3), new Vector(2,3), new Vector(1,6), new Vector(1,6)); \
     a.uniq$B()')


assert("Uniq$B",
    'b.to_a()', '[ [2, 3], [1, 6], [5, 9], [7, 1] ]',
    'var a = new VectorSystem(new Vector(2,3), new Vector(1,6), new Vector(2,3), new Vector(2,3), new Vector(1,6), new Vector(7,1)); \
     var b = a.splice(2, 3, new Vector(5,9))')