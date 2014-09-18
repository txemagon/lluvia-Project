/*
assert("Func. Creates a new function given a formula.",
       "f.formula", "'3*x+2'",
       "f = new Func('3*x + 2')" )

assert("Func. Creates a new function given a formula.",
       "f", "'3 * x + 2'",
       "f = new Func('3*x + 2')" )
       
assert("Func#value. Evaluates the final value of a function for a given state.",
       "f.value_in()", "30",
       "f = new Func('3*{x}*{x} + 2 * {y} * {y}', {x:2, y:3})" )
       
assert("Func#value. Evaluates the final value of a function for a given state.",
       "f.value_in({x:2, y:3})", "30",
       "f = new Func('3*{x}*{x} + 2 * {y} * {y}')" )
       
assert("Func#value. Evaluates the final value of a function for a given state.",
       "f.value_in({x:2, y:3, g: g})", "78",
       "f = new Func('3*{x}*{g} + 2 * {y} * {y}'); g = new Func('2 * {t}', {t: 5})" )      

assert("Func#value. Evaluates the final value of a function for a given state.",
       "f.value_in({x:2, y:3, g: g.set_param({t:3}) })", "54",
       "f = new Func('3*{x}*{g} + 2 * {y} * {y}'); g = new Func('2 * {t}', {t: 5})" )

assert("Func#value. Evaluates the final value of a function for a given state.",
       "f.value_in({x:2, y:3, g: g._in({t:1}) })", "30",
       "f = new Func('3*{x}*{g} + 2 * {y} * {y}'); g = new Func('2 * {t}', {t: 5})" )

assert("Func#add. Adds two functions.",
       "f.add(g)", "'2*x + 5 + x*x'",
       "f = new Func(' 2*x + 5'); g = new Func(' x*x');")
       
assert("Func#add. Adds two functions.",
       "f.add('x*x')", "'2*x + 5 + x*x'",
       "f = new Func(' 2*x + 5')")

assert("Func#add. Adds n functions.",
       "f.add('x*x', '3*x + 7')", "'2*x + 5 + x*x + 3*x + 7'",
       "f = new Func(' 2*x + 5')")

assert("Func#add$B. Adds n functions.",
       "f", "'2*x + 5 + x*x + 3*x + 7'",
       "f = new Func(' 2*x + 5'); f.add$B('x*x', '3*x + 7')")

assert("Func#sub. Substrac one function from another.",
       "f.sub('x*x', '3*x + 7')", "'2*x + 5 - (x*x) - (3*x + 7)'",
       "f = new Func(' 2*x + 5')")

assert("Func#sub$B. Substrac one function from another.",
       "f", "'2*x + 5 - (x*x) - (3*x + 7)'",
       "f = new Func(' 2*x + 5'); f.sub$B('x*x', '3*x + 7')")
       
assert("Func#mul. Multiplies functions.",
       "f.mul('x*x', '3*x + 7')", "'(2*x + 5) * (x*x) * (3*x + 7)'",
       "f = new Func(' 2*x + 5')")

assert("Func#mul$B. Multiplies functions.",
       "f", "'(2*x + 5) * (x*x) * (3*x + 7)'",
       "f = new Func(' 2*x + 5'); f.mul$B('x*x', '3*x + 7')")
       
assert("Func#div. Divides functions.",
       "f.div('x*x', '3*x + 7')", "'(2*x + 5) / (x*x) / (3*x + 7)'",
       "f = new Func(' 2*x + 5')")

assert("Func#div$B. Divides functions.",
       "f", "'(2*x+5)/(x*x)/(3*x + 7)'",
       "f = new Func('2*x+5'); f.div$B('x*x', '3*x + 7')")       

assert("Func#cos. Functions shall answer to all the Math methods.",
       "f.cos()", "'cos(2*x)'",
       "f = new Func('2*x')")       
    
assert("Func#sin.",
       "f.sin()", "'sin(2*x)'",
       "f = new Func('2*x')")


assert("Func#A. Functions not defined in Math are not allowed",
       "a", "1",
       "a = 0; f = new Func('2*x'); try {; f.A(); } catch(err) {; a++ }")

assert("Func#E. Only Math functions are allowed",
       "a", "1",
       "a = 0; f = new Func('2*x'); try {; f.E(); } catch(err) {; a++ }")

assert("Func#max. When more than one param is given they are appended as explicit arguments of the Func call.",
       "f.max(g)", "'max(2*x, 3*x*x*y)'",
       "f = new Func('2*x'); g = new Func('3*x*x*y');" );
*/
assert("Func#max. When more than one param is given they are appended as explicit arguments of the Func call.",
       "f.max(g, h)", "'max(2*x, 3*x*x*y, y*z)'",
       "f = new Func('2*x'); g = new Func('3*x*x*y'); h = new Func('y*z')" );
       
assert("Delegated functions are also evaluable.",
       "f.value_in({x:2, y:3, z:4})", "f",
       "f = new Func('2*{x}'); g = new Func('3*{x}*{x}*{y}'); h = new Func('{y}*{z}');")
