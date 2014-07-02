assert( "Complex. Constructor receives no params at all.",
        "z.equals(0)", "true",
	"z = new Complex()" )

assert( "Complex. Constructor receives a binomial representation",
        "z.to_str()", "'1 + 2i'",
	"z = new Complex(1, 2); Complex.sep = 'i'; Complex.prefix_sep = false;" )

assert( "Complex. Parse input (Binomial form)",
        "z.equals(1,2)", "true",
	'z = new Complex("1 + 2i")' )

assert( "Complex. Parse input (Binomial form)",
        "z.equals(1,2)", "true",
	'z = new Complex("1+2i")' )

assert( "Complex. Parse input (Binomial form)",
        "z.equals(1,2)", "true",
	'z = new Complex("1 + 2   i")' )

assert( "Complex. Parse input (Binomial form)",
        "z.equals(1,2)", "false",
	'z = new Complex("1 + 2.5i")' )

assert( "Complex. Parse input (Binomial form)",
        "z.equals(.5, 4)", "true",
	'z = new Complex(".5 + i 4.0");')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(1.7, 4)", "true",
        ' z = new Complex("1.7 + 4. i"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(7, 1.5)", "true",
        ' z = new Complex("1.5i + 7"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(-2, .5)", "true",
        ' z = new Complex("j.5 - 2"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(3, 2.5)", "true",
        ' z = new Complex("2.5j + 3"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(-2, -.5)", "true",
        ' z = new Complex("-j.5 - 2"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(3, -1)", "true",
        ' z = new Complex("-1.j + 3"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(0, -2)", "true",
        ' z = new Complex("-2j"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(0, -1)", "true",
        ' z = new Complex("-j"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(0, 1)", "true",
        ' z = new Complex("j"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(1)", "true",
        ' z = new Complex("1"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(-1, 1)", "true",
        ' z = new Complex("2 + j - 3"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(5, 6)", "true",
        ' z = new Complex("-j7 + 5 + 13j"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(1,2)", "true",
	'z = new Complex("1 + i 2")' )

assert( "Complex. Parse input (Binomial form)",
        "z.equals(3, -1.5)", "true",
        ' z = new Complex("-1,5j + 3"); ')

assert( "Complex. Parse input (Binomial form)",
        "z.equals(1,2)", "true",
	'Complex.sep = "j"; z = new Complex("1 + 2j")', 'Complex.sep = "i"' )

assert( "Complex#to_str",
        "z.to_str()", "'1 + 2i'",
	"z = new Complex(1, 2)")

assert( "Complex#to_str",
        "z.to_str()", "'1 + 2j'",
	' Complex.sep = "j"; z = new Complex(1, 2);', 'Complex.sep = "i"; ')

assert( "Complex#to_str",
        "z.to_str()", "'1 + i2'",
	"Complex.prefix_sep = true; z = new Complex(1, 2)" )

assert( "Complex#to_str",
        "z.to_str()", "'1 - i2'",
	"Complex.prefix_sep = true; z = new Complex(1, -2)" )

assert( "Complex#toString",
        "z.toString()", "z.to_str()", 
	"z = new Complex(1, -2)" )

assert( "Complex#module.",
        "z.module()", "5",
	"z = new Complex(3, 4)")

assert( "Complex#equals. Checks whether one complex equals another.",
        "z.equals(zt)", "true",
	"z = new Complex(1, 2); zt = new Complex(1, 2);" )

assert( "Complex#equals. Checks whether one complex equals another (made of real values).",
        "z.equals(zt)", "true",
	"z = new Complex(1.2, 2); zt = new Complex(1.2, 2);" )

assert( "Complex#equals. Checks whether one complex equals another (mixing real values with int values).",
        "z.equals(zt)", "true",
	"z = new Complex(1, 2); zt = new Complex(1., 2);" )

assert( "Complex#equals. Checks whether one complex differs from other.",
        "z.equals(zt)", "false",
	"z = new Complex(1, 2); zt = new Complex(3, 2);" )

assert( "Complex#equals. Accepts a pair of numbers as a synonym for Complex.",
        "z.equals(1,2)", "true",
	"z = new Complex(1,2)" )

assert( "Complex. Copy contructor.",
        "z2.real()", "z1.real()",
        " z1 = new Complex(1, 2); z2 = new Complex(z1)" )

assert( "Complex. Copy contructor.",
        "z2.img()", "z1.img()",
        " z1 = new Complex(1, 2); z2 = new Complex(z1)" )

assert( "Complex. Copy contructor.",
        "z2.real()", "1",
        " z1 = new Complex(1, 2); z2 = new Complex(z1); z1 = new Complex(3, 4)" )

assert( "Complex. Array input parser",
        "z.equals(1,2)", "true",
        "z = new Complex([1, 2]);" )

assert( "Complex. Array input parser",
        "z.im()", "2",
        "z = new Complex([1, 2]);" )

assert( "Complex. Array input parser",
        "z.is_real$U()", "true",
        "z = new Complex([1]);" )

assert( "Complex. Constructor accepts undefined values.",
        "z.equals(0,1)", "true",
        "z = new Complex(0,1);" )

assert( "Complex#equals. Accets plain strings.",
        "z", '"j"',
        "z = new Complex(0, 1)" )

assert( "Complex. Polar expressed in degrees", 
        "z", "'j'", 
        "z = new Complex('1;;90º')" ) // Duplicate ; when not meaning end of instruction inside the asserts
        
assert( "Complex. Polar expressed in rad", 
        "z", "'j'", 
        "z = new Complex('1;;1.5707963267948966')" )

assert( "Complex. Polar expressed in rad", 
        "z", "'j'", 
        "z = new Complex('1;;pi/2')" )
                
assert( "Complex. Polar expressed in rad", 
        "z", "'j'", 
        "z = new Complex('1;;PI/2')" )

assert( "Complex. Not mixing , and .", 
        "z.equals(new Complex('1.0;;1.5'))", "false", 
        "z = new Complex('1.0;;1,5')" )
        
assert( "Complex. Not mixing , and .", 
        "z2", "z1", 
        "z1 = new Complex('1.5;;2.0'); z2 = new Complex('1,5;;2,0')" )        

assert( "Complex. Polar expressed in rad with spaces", 
        "z", "'j'", 
        "z = new Complex('1 ;; PI/2')" )        
        
assert( "Complex. Polar expressed in rad", 
        "z", "'j'", 
        "z = new Complex('1(PI/2')" )

assert( "Complex. Polar expressed in rad", 
        "z", "'j'", 
        "z = new Complex('1|PI/2')" )        
        
assert( "Complex. Polar expressed in rad accepts some convenient operations.", 
        "z", "'j'", 
        "z = new Complex('1|PI/2 + 4*PI')" )        
        
assert( "Complex. Polar expressed with a flag.", 
        "z", "'j'", 
        "z = new Complex(1, Math.PI/2, 'p')" )                
        
assert( "Complex. Polar expressed with a flag.", 
        "z", "'j'", 
        "z = new Complex(1, Math.PI/2, 'P')" )
        
assert( "Complex. Polar expressed with a flag.", 
        "z", "'j'", 
        "z = new Complex(1, Math.PI/2, 'polar')" )      
        
assert( "Complex. Polar expressed with a flag.", 
        "z", "'j'", 
        "z = new Complex(1, Math.PI/2, 'Polar')" )
        
        
assert( "Complex. Polar expressed with a flag.", 
        "z", "'j'", 
        "z = new Complex(0, 1, 're')" )

assert( "Complex#identic. Equality vs identity.", 
        "z2", "z1", 
        "z1 = new Complex('1;pi/2'); z2 = new Complex('1;2*pi + pi/2');" )
        

assert( "Complex#identic. Equality vs identity.", 
        "z2.identic(z1)", "false", 
        "z1 = new Complex('1;pi/2'); z2 = new Complex('1;2*pi + pi/2');" )        
/*
1;90º
1:30º
1(PI/2
1; pi/2


new Complex(1,2, "p")
new Complex("p", 1,2)
new Complex(1,2, "po")
new Complex(1,2, "polar")
new Complex(1,2, "b")
new Complex(1,2, "bin")
new Complex(j9, "binomial")


La separación por espacios parece un poco tonta
1 90º
1 ; 90º
-2 3 * pi / 2
1 -20º
1 - 20 º
1_-pi/2
1_ - 13º
1 _ -3

La separación por e, sin la i rechina un poco por imprecisa, ¿no te parece?
1e20 
1e -20º
1 e (- 20 º)
1 e (pi / 2)
1 e (3 * pi / 2)
1 e (2*pi + 20º)
No obstante  molaría tener una salida precisa con los superíndices.
A lo mejor, podíamos tener un método to_html y otro to_latex.
*/


