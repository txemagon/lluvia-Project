assert("Check if two lines intersect",
    "inter", 'true',  
  'l1 = new StraightLine(new Vector(0,1), new Vector(1,0)),  \
   l2 = new StraightLine(new Vector(0,2), new Vector(1,0)),  \
   inter = Line.intersects$U(l1, l2)')






/*


assert("Use of start function when creating new CodeBlockFinder",
  "a.text", "'{return 1+2}'",
  "a = new CodeBlockFinder('function sum(){return 1+2}'); \
  a.start()")

assert("Use of start function when pasing variables to the function",
  "a.text", "'{return num1+num2}'",
  "a = new CodeBlockFinder('function sum(num1, num2){return num1+num2}'); \
  a.start()")

assert("Use of start function when pasing a function",
  "a.text", "'{sq_radious = function {return r*r}}'",
  "a = new CodeBlockFinder('function pi(){sq_radious = function {return r*r}}'); \
  a.start()")

assert("Use of start function when pasing a function and variables (it should be working!!)",
  "a.text", "'{ sq_radious = function {return r*r}, pi_num = 3.141516, return sq * pi_num}'",
  "a = new CodeBlockFinder('function pi(){ \
    sq_radious = function {return r*r}, \
    pi_num = 3.141516, \
    return sq * pi_num}'); \
  a.start()")

assert("Use of start function when pasing two functions (it should be working!!)",
  "a.text", "'{ power = function {return r*r}; sum = function {return r+r}}'",
  "a = new CodeBlockFinder('function(){ \
    power = function {return r*r}, \
    sum = function {return r+r}}'); \
  a.start()")


*/

