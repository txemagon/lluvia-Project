alert("cargaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, borbabor")
assert( "Fixed Vector can create an instance of itself.",
        'b', 'true',
        'var a = new FixedVector(); \
        if(a instanceof FixedVector) \
        	var b = true' )

assert( "Fixed Vector can create an instance of itself 2.",
        'a.toSource()', '"({foot:{Coord:[0, 0], _module:0, uVector:[NaN, NaN]}, free_vector:{Coord:[0, 0], _module:0, uVector:[NaN, NaN]}, fixed_vector:{Coord:[0, 0], _module:0, uVector:[NaN, NaN]}, Coord:[0, 0], _module:0, uVector:[NaN, NaN]})"',
        'var a = new FixedVector()' )

assert( "Fixed Vector accepts one parameter.",
        'a.fixed_vector', '[2,3]',
        'var a = new FixedVector( new Vector(2,3) )' )

assert( "Fixed Vector accepts two parameters",
        'a.fixed_vector', '[6,9]',
        'var a = new FixedVector( new Vector(2,3), new Vector(4,6) )' )

assert( "Fixed Vector can give the foot vector.",
        'a.foot', '[2,3]',
        'var a = new FixedVector(new Vector(2,3), new Vector(4,6) )' )

assert( "Fixed Vector can give the free vector.",
        'a.free_vector', '[4,6]',
        'var a = new FixedVector(new Vector(2,3), new Vector(4,6) )' )

assert( "Fixed Vector can give the _head vector.",
        'a._head', '[6,9]',
        'var a = new FixedVector(new Vector(2,3), new Vector(4,6) )' )
