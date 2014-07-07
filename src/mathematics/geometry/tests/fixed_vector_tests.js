alert("cargaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa, borbabor")
assert("Fixed Vector can create an instance of itself.",
    'is_a_fixed_vector', 'true',
    'var a = new FixedVector(); \
        if(a instanceof FixedVector); \
        is_a_fixed_vector = true')

assert("Fixed Vector accepts different parameters.",
    'a.Coord', '[1,1]',
    'var a = new FixedVector( new Vector(1,1), [2,6] )')

assert("Fixed Vector 'abs' can be in any position 1.",
    'a.Coord', '[1,2]',
    'var a = new FixedVector( new Vector(3,8), [2,6], "abs" )')

assert("Fixed Vector 'abs' can be in any position 2.",
    'a.Coord', '[1,2]',
    'var a = new FixedVector( new Vector(3,8), "abs", [2,6] )')

assert("Fixed Vector 'abs' can be in any position 3.",
    'a.Coord', '[1,2]',
    'var a = new FixedVector( "abs", new Vector(3,8), [2,6] )')

assert("Fixed Vector accepts an array of arguments",
    'a.Coord', '[1,2]',
    'var a = new FixedVector( ["abs", new Vector(3,8), [2,6]] )')

assert("Fixed Vector accepts one parameter.",
    'a.Coord', '[2,3]',
    'var a = new FixedVector( new Vector(2,3) )')

assert("Fixed Vector accepts free_vector and foot",
    'a._head', '[6,9]',
    'var a = new FixedVector( new Vector(2,3), new Vector(4,6) )')

assert("Fixed Vector also accepts _head and foot.",
    'a.Coord', '[1,1]',
    'var a = new FixedVector( [3,5], [2,4], "abs" )')

assert("Fixed Vector can give the foot vector.",
    'a.foot', '[4,6]',
    'var a = new FixedVector( new Vector(2,3), new Vector(4,6) )')

assert("Fixed Vector can give the free vector.",
    'a.Coord', '[2,3]',
    'var a = new FixedVector( new Vector(2,3), new Vector(4,6) )')

assert("Fixed Vector can give the _head vector.",
    'a._head', '[6,9]',
    'var a = new FixedVector( new Vector(2,3), new Vector(4,6) )')

assert("Fixed Vector accepts vectors with different dimensions.",
    'a._head', '[5,11,4,7]',
    'var a = new FixedVector( new Vector(2,3,4,7), new Vector(3,8) )')

assert("Fixed Vector can accept array parameters.",
    'a._head', '[6,9]',
    'var a = new FixedVector( [2,3], [4,6] )')

assert("Fixed Vector can accept array parameters with different dimensions.",
    'a._head', '[6,9,5,8]',
    'var a = new FixedVector( [2,3,5,8], [4,6] )')

assert("Fixed Vector can be equal to another.",
    'a.eql$U(b)', 'true',
    'var a = new FixedVector( [2,3,5,8], [4,6] ); \
        var b = new FixedVector( [2,3,5,8], [4,6] )')

assert("Fixed Vector can be different from another.",
    'a.eql$U(b)', 'false',
    'var a = new FixedVector( [2,3,5,8], [4,6] ); \
        var b = new FixedVector( [4,6], [2,3,5,8] )')

assert("Fixed Vector can substracts another.",
    'c.Coord', '[0,-4]',
    'var a = new FixedVector( [1,5], [2,6] ); \
        var b = new FixedVector( [1,3], [2,4] ); \
        var c = a.subs(b)')

assert("Fixed Vector can substracts several others.",
    'd.Coord', '[4,8]',
    'var a = new FixedVector( [1,9], [2,4] ); \
        var b = new FixedVector( [2,2], [3,13] ); \
        var c = new FixedVector( [2,6], [5,15] ); \
        var d = a.subs( [b, c] )')

assert("Fixed Vector can add another when a._head equals to b.foot.",
    'c.Coord', '[2,2]',
    'var a = new FixedVector( [1,1], [2,6] ); \
        var b = new FixedVector( [1,1], [3,7] ); \
        var c = a.add(b)')

assert("Fixed Vector can add several others when first._head equals to next.foot.",
    'd.Coord', '[5,9]',
    'var a = new FixedVector( [1,1], [2,6] ); \
        var b = new FixedVector( [2,2], [3,7] ); \
        var c = new FixedVector( [2,6], [5,9] ); \
        var d = a.add( [b, c] )')

assert("Fixed Vector can't add another when a._head doesn't equals to b.foot.",
    'c', 'false',
    'var a = new FixedVector( [1,1], [2,6] ); \
        var b = new FixedVector( [1,1], [3,8] ); \
        var c = a.eql$U(b)')

assert("Fixed Vector can return the virial of itself.",
    'c', '46',
    'var a = new FixedVector( [2,5], [3,8] ); \
        var c = a.virial()')