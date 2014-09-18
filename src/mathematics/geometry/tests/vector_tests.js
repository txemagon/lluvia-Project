_clean_tests()
assert( "Vector 1 .Create vector sending 3 single coordinates.",
        "v._module", "3.7416573867739413",
        "v = new Vector(1,2,3)" )

assert( "Vector 2. Generate vector sending a coordinates array",
        "v1._module","3.7416573867739413",
        "v1 = new Vector([1,2,3])")

assert( "Vector 3. Generates vector sending a vector",
        "v1 = new Vector(v2)._module", "3.7416573867739413",
	"v2 = new Vector([1,2,3])")

assert( "Vector 4. Generate vector  coordinates sending 2 loose.",
        "v4._module","2.23606797749979",
        "v4 = new Vector(1,2)")

assert( "Vector 5. Generates vector sending a two coordinates array",
        "v1._module", "2.23606797749979",
	"v1 = new Vector([1,2])")

assert( "Vector 6. Generate vector sending a two coordinates vector.",
        "v1 = new Vector(v2)._module","2.23606797749979",
        "v2 = new Vector(1,2)")

assert( "Vector 7. Generates vector sending a string",
        "v1._module", "0",
	'v1 = new Vector("hello")')

assert( "Vector 8. Generate vector sending 7 singles coordinates.",
        "v1._module","11.832159566199232",
        "v1 = new Vector(1,2,3,4,5,6,7)")

assert( "Vector 9. Generates vector sending cylindrical coordinates",
        "v._module","3.1622776601683795",
        'v = new Vector(1,2,3, "cyl")')

assert( "Vector 10. Generate vector sending array  of cylindrical coordinates.",
        "(new Vector(1,2,3, 'cyl'))._module","v2._module",
        'v2 = new Vector([1,2,3], "cyl")')

assert( "Vector 11. Generate vector with one coordinate only.",
        "v._module","1",
        'v = new Vector(1)')

assert( "Vector 12. Calculate angle  of a vector onto another  with three dimensions.",
        "v2.angle(0,1,0)","1.5707963267948966",
        "v2 = new Vector(1,0,0)")

assert( "Vector 13. Calculates the angle for a vector onto another vector.",
        "v2.angle(1,0,0)","Math.PI/2",
        "v2 = new Vector(0,1,0)")

assert( "Vector 13. Calculates the angle for a vector onto another vector.",
        "v2.angle(1,0)","-Math.PI/2",
        "v2 = new Vector(0,1)")

assert( "Vector#angle", 
        "v.angle(0,1,0)", "Math.PI / 2",  
        "v = new Vector(1,0,0);" )

assert( "Vector coordinates",
        "v.get_coord(1)", "2",
        "v = new Vector(1, 2, 3) ")

assert( "Vector coordinates",
        'v.get_coord("z")', "3",
        "v = new Vector(1, 2, 3) ")

assert( "Vector coordinates",
        "v.get_coord('X')", "1",
        "v = new Vector(1, 2, 3) ")
        

assert( "Vector coordinates",
        "v.get_coord()", "[1, 2, 3]", // value_of
        "v = new Vector(1, 2, 3) ")        

assert( "Vector coordinates",
        "v.get_coord(0)", "'2*t'",
        "v = new Vector('2*t', '3*t', '-5*t + 1') ")

assert( "Transform Cartesian coordinates in spherical coordinates",
        "v.toSpherical()[1]", "Math.PI/3",
        "v = new Vector(1,Math.PI/3, Math.PI/4, 'sph');")


