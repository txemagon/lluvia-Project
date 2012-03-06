assert( "A simple coordinate transformation (Vector).",
        "rf.coord_of(v)", "[0,1,1]",
        "rf = new ReferenceFrame(1, 0, 0); v = new Vector(1,1,1);"
)

assert( "A simple coordinate transformation (Another case).",
        "rf.coord_of(v)", "[1,1,1]",
        "rf = new ReferenceFrame(1, 0, 0); v = new Vector(2,1,1);"
)

assert( "A simple coordinate transformation (floating point coordinates).",
        "rf.coord_of(v)", "[0,.5,1]",
        "rf = new ReferenceFrame(1, 1, 0); v = new Vector(1,1.5,1);"
)

assert( "A simple coordinate transformation (single coordinates).",
        "rf.coord_of(1,1,1)", "[0,1,1]",
        "rf = new ReferenceFrame(1, 0, 0);"
)

assert( "A simple coordinate transformation (Array).",
        "rf.coord_of([1,1,1])", "[0,1,1]",
        "rf = new ReferenceFrame(1, 0, 0);"
)

assert( "The rotation of the trihedron is allowed",
        "rf.coord_of(v)", "[1, 1, 0]",
        "rf = new ReferenceFrame(1, 0, 0, [[0, 1, 0], [0, 0, 1], [1, 0, 0]] ); v = new Vector(1,1,1);"
)

assert( "The trihedron is normalized by default.",
        "rf.get_transformation_matrix()", "[ [1 / rt, 2/rt, 0], [-2/rt, 1/rt, 0], [0, 0, 1] ]",
        "rf = new ReferenceFrame(1, 0, 0, [[1, 2, 0], [-2, 1, 0], [0, 0, 1]] ); rt = Math.sqrt(5) "
)

assert( "The trihedron is not normalized when frozen.",
        "rf.get_transformation_matrix()", "[ [1, 2, 0], [-2, 1, 0], [0, 0, 1] ]",
        "rf = new ReferenceFrame(1, 0, 0, [[1, 2, 0], [-2, 1, 0], [0, 0, 1]].freeze() );"
)

assert( "One simple rotation with Array.",
        "rf.coord_of(v)", "[1, 1, 0]",
        "rf = new ReferenceFrame(1, 0, 0, [[0, 1, 0], [0, 0, 1], [1, 0, 0]] ); v = new Vector(1,1,1);"
)

assert( "One simple rotation with Vectors.",
        "rf.coord_of(v)", "[1, 0, 1]",
        "e1 = new Vector(0, 1, 0);\
         e2 = new Vector(1, 0, 0);\
         e3 = new Vector(0, 0, 1);\
	rf = new ReferenceFrame(1, 0, 0, [e1, e2, e3] ); v = new Vector(1,1,1);"
)

assert( "The rotation of the trihedron in a non trivial way.",
        "rf.coord_of(1,1,1)", "[1/rt, 1/rt,1]",
	"rf = new ReferenceFrame(1, 0, 0, [ [1,1,0], [-1, 1, 0], [0, 0, 1] ]); rt = Math.sqrt(2);"
	)

assert( "The rotation of the trihedron in a non trivial way, but vectors are not cartesian (The same case as previous).",
        " point[0] == point[1] ", "true",
	"rt = Math.sqrt(2); rf = new ReferenceFrame(1, 0, 0, 'cyl', [ [rt, Math.PI / 4, 0, 'cyl'], [rt, 3 * Math.PI / 4, 0, 'cyl'], [1, 0, 0, 'sph'] ]);\
         point = rf.coord_of(1,1,1)"
	)

assert( "The trihedron is self autocompleted.",
        "rf.get_transformation_matrix()[2][2]", "-1",
        "rf = new ReferenceFrame(1, 0, 0, [[1, 1, 0], [-1, 1, 0]] ) "
)

assert("ReferenceFrame provides a copy constructor",
       "rf.drift", "nrf.drift",
       "rf = new ReferenceFrame(1, 0, 0, [[0, 1, 0], [0, 0, 1], [1, 0, 0]]); nrf = new ReferenceFrame(rf);")

assert("ReferenceFrame provides a copy constructor",
       "rf.get_transformation_matrix()", "nrf.get_transformation_matrix()",
       "rf = new ReferenceFrame(1, 0, 0, [[0, 1, 0], [0, 0, 1], [1, 0, 0]]); nrf = new ReferenceFrame(rf);")

assert("ReferenceFrame a copy constructor really copies de values (do not reference them)",
       "nrf.drift", "[1, 0, 0]",
       "rf = new ReferenceFrame(1, 0, 0, [[0, 1, 0], [0, 0, 1], [1, 0, 0]]); nrf = new ReferenceFrame(rf); rf.drift = [1, 1, 1]")

assert("ReferenceFrame a copy constructor really copies de values (do not reference them)",
       "nrf.get_transformation_matrix()", "[[0, 1, 0], [0, 0, 1], [1, 0, 0]]",
       "rf = new ReferenceFrame(1, 0, 0, [[0, 1, 0], [0, 0, 1], [1, 0, 0]]); nrf = new ReferenceFrame(rf); rf.transformation_matrix = [[1, 1, 0], [0, 0, 1], [1, -1, 0]]")

assert("ReferenceFrame a copy constructor really copies de values (do not reference them)",
       "nrf.get_transformation_matrix()", "[[0, 1, 0], [0, 0, 1], [1, 0, 0]]",
       "rf = new ReferenceFrame(1, 0, 0, [[0, 1, 0], [0, 0, 1], [1, 0, 0]]); \
        nrf = new ReferenceFrame(rf); \
	rf.transformation_matrix[0][2]	= 2")


assert("When the transformation is linearly dependent an error is thrown",
       "a", "true",
       "a=false; \
         try{ \
           rf = new ReferenceFrame(1, 0, 0, [[0, 1, 0], [1, 0, 0], [1, 1, 0]]); \
	 } catch(e) {\
	   if (/dependent/.test(e)) \
	     a = true; \
	 }; ")
       
