/*
assert("Create new CodeBlockFinder without parameters.",
    "typeof a.value", "'function'",
    "a = new CodeBlockFinder()")

assert("Pass one parameter in CodeBlockFinder method.",
  // Deja un espacio al final del string!!
  "a.source", "'1,2,3,4,5 '",
  "a = new CodeBlockFinder('1,2,3,4,5')")

assert("Start the Pushdown Automaton.",
  "a.text", "'{return 1+2}'",
  "a = new CodeBlockFinder('function sum(){return 1+2}');  \
  a.start()")

assert("CodeBlockFinder can be reseted",
      "a.toString()", "'function (){ \
this.initial    = this.search_start \
   this.final      = this.search_start \
   this.status     = CodeBlockFinder.States.searching \
   this.delimiter  = this.delimiters.open  \
   this.nested     = 0 \
   this.lines_read = 0 \
} '",
      "a = new CodeBlockFinder().reset")

assert("Use of start function when creating new CodeBlockFinder",
  "a.text", "'{return 1+2}'",
  "a = new CodeBlockFinder('function sum(){return 1+2}'); \
  a.start()")

assert("Use of start function when pasing variables to the function",
  "a.text", "'{return num1+num2}'",
  "a = new CodeBlockFinder('function sum(num1, num2){return num1+num2}'); \
  a.start()")

*/
/*
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

assert("Use of start function when pasing two functions and variables (it should be working!!)",
  "a.text", "'{ sq_radious = function {return r*r}, sum = function {return r+r}, pi_num = 3.141516, return sq * pi_num}'",
  "a = new CodeBlockFinder('function pi(){ \
    sq_radious = function {return r*r}, \
    sum = function (){return r+r}, \
    pi_num = 3.141516, \
    return sq * pi_num}'); \
  a.start()")

assert("Count lines having the counted_character as line break.",
  "a.lines_read", "4",
  "numbers = '1,2,3,4,5';  \
   a = new CodeBlockFinder(numbers, null, null, ',');  \
   a.start();")

assert("Count line inside a block.",
  "a.lines_read", "2",
  "fun = 'function sum(){var a = 1,  \
                         var b = 2,  \
                         return a+b}';  \
   a = new CodeBlockFinder(fun, '{', null, ',');  \
   a.start();")

assert('CodeBlockFinder.parse_params returns an Object',
      'typeof a', '"object"',
      'a = new CodeBlockFinder.parse_params("2");')

assert('CodeBlockFinder.parse_params can receive a parameter',
      'a.toString()', '"2"',
      'a = new CodeBlockFinder.parse_params("2");')

assert('CodeBlockFinder.parse_params can receive a simple string of parameter',
      'a.toString()', '"2,3"',
      'a = new CodeBlockFinder.parse_params("2, 3");')

assert('CodeBlockFinder.parse_params can receive a simple function string of parameters',
      'a.toString()', '"function(a, b){ return a + b }"',
      'a = new CodeBlockFinder.parse_params("function(a, b){\
                         return a + b }");')

assert('CodeBlockFinder.parse_params can receive a complex function string of parameters',
      'a.toSource()', '"2, 3, a + 2 * b / 5, function(a, b){\
                          var j = 0; \
                          for (var i=0; i<3; i++);}"',
      'a = new CodeBlockFinder.parse_params("2, 3, a + 2 * b / 5, function(a, b){\
                        var j = 0; \
                        for (var i=0; i<3; i++);}");')

assert('CodeBlockFinder.parse_params can receive a complex function string of parameters',
      'a.toString()', '"2, 3, a + 2 * b / 5, function(a, b){\
                          var j = 0; \
                          for (var i=0; i<3; i++, j+=2*i % 3)}"',
      'a = new CodeBlockFinder.parse_params("2, 3, a + 2 * b / 5, function(a, b){\
                        var j = 0; \
                        for (var i=0; i<3; i++, j+=2*i % 3)}");')
*/

assert("Obtain parameters within brackets.",
  "a.text", "'{function() {this.name = name}}'",
  "fun = 'function sum(name){function() {this.name = name}}';  \
   a = new CodeBlockFinder(fun, /function/, {open: '{', close: '}'}, ',');  \
   a.start();")


assert("Obtain parameters within brackets.",
  "a.text", "'(function(name){this.name = name}, \
                function initialize(name){ this.name = name }, \
                function greet(name){ return class_name } )'",
  "fun = 'Class_Person(function(name){this.name = name}, \
                function initialize(name){ this.name = name }, \
                function greet(name){ return class_name } )'; \
   a = new CodeBlockFinder(fun, 'Class', {open: '(', close: ')'}, ',');  \
   a.start();")

assert("Obtain parameters within brackets.",
  "a.text", "'(function(name){this.name = name}, \
                function initialize(name){ this.name = name }, \
                function self_initialize(name){ return class_name } )'",
  "fun = 'Class_Person(function(name){this.name = name}, \
                function initialize(name){ this.name = name }, \
                function self_initialize(name){ return class_name } )'; \
   a = new CodeBlockFinder(fun, 'Class', {open: '(', close: ')'}, ',');  \
   a.start();")
assert("Obtain parameters with two initialize methods",
  "a.toSource()", "",
  "fun = 'function(name){this.name = name}, \
                     function self_number(){ return self.people }, \
                     function self_initialize(){self.people = 0}, \
                     function initialize(){self.people++}'; \
   a = new CodeBlockFinder.parse_params(fun);")                        

