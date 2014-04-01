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
/*
assert('CodeBlockFinder.parse_params can receive a complex function string of parameters',
      'a.toSource()', '"2, 3, a + 2 * b / 5, function(a, b){\
                          var j = 0; \
                          for (var i=0; i<3; i++, j+=2*i % 3)}"',
      'a = new CodeBlockFinder.parse_params("2, 3, a + 2 * b / 5, function(a, b){\
                        var j = 0; \
                        for (var i=0; i<3; i++, j+=2*i % 3)}");')
*/