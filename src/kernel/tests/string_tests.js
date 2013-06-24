assert ("String#capitalize 1. Normal string",
        "a.capitalize()", '"Hello"',
        'a = "hello"')

assert ("String#capitalize 2. String with numbers at the first.",
        "a.capitalize()", '"123hello"',
        'a = "123hello"')

assert ("String#capitalize 3. String without changes",
        "a.capitalize()", '"Hello"',
        'a = "Hello"')

assert("String#index 1. Letter position in the word.",
       '"hello".index("e")', '1',
       '"hello".index("e")')

assert("String#index 2. Letters position.",
       '"hello".index("lo")', '3',
       '"hello".index("lo")')

assert("String#index 3. Position array in the word.",
       '"hello".index(a)', '0',
       'a = "hello"; "hello".index(a) ')

assert("String#index 4. Letter isn't word.",
       '"hello".index("a")', "null",
       '"hello".index("a")')

assert("String#index 5. Set of letters in the word.",
       '"hello".index(/[aeiou]/, -3)', '4',
       '"hello".index(/[aeiou]/, -3)')

assert("String#insert 1. Insert one letter",
       '"hello".insert(1,"X")', '"hXello"',
       '"hello".insert(1,"X")')
       
assert("String#insert 2. Insert string",
       '"hello".insert(-3,"XY")', '"helXYlo"',
       '"hello".insert(-3,"XY")')

assert("String#ljust 1. Without letters.",
       '"hello".ljust(10)', '"hello     "',
       '"hello".ljust(10)')

assert("String#ljust 2. With one letter.",
       '"hello".ljust(10,"p")', '"helloppppp"',
       '"hello".ljust(10,"p")')

assert("String#ljust 3. with string.",
       '"hello".ljust(10,"pe")', '"hellopepep"',
       '"hello".ljust(10,"pe")')

assert("String#ljust 4. with blanks.",
       'a.ljust(10)', '"hello     "',
       'a = "hello"')

assert("String#swapcase 1. Simple sample.",
       'a.swapcase()','"Hello"',
       'a = "hELLO"')

assert("String#swapcase 2. Another string.",
       'a.swapcase()','"MoUnTaIn"',
       'a = "mOuNtAiN"')

assert("String#empty$U 1. Stream full",
      'a.empty$U()', "false",
      'a = "Full"')

assert("String#empty$U 2. Stream empty",
      'a.empty$U()', "true",
      'a = ""')

assert("String#lstrip 1. with spaces.",
       '"    hello    ".lstrip()', '"hello    "',
       '"    hello    ".lstrip()')

assert("String#lstrip 2. without spaces.",
       '"hello".lstrip()', '"hello"',
       '"hello".lstrip()')

assert("String#downcase 1. Replace all letter uppercase for letter downcase or return null if not changes were made",
      'a.downcase()', '"hello"',
      'a = "Hello"')

assert("String#downcase 2. Replace all letter uppercase for letter downcase or return null if not changes were made",
      'a.downcase()', 'null',
      'a = "hello"')

assert("String#downcase 3. Replace all letter uppercase for letter downcase or return null if not changes were made",
      'a.downcase()', '"hello 1 2 3 ) ? "',
      'a = "Hello 1 2 3 ) ? "')

assert("String#downcase 4. Replace all letter uppercase for letter downcase or return null if not changes were made",
      'a.downcase()', 'null',
      'a = ""')

assert("String#casecmp.",
      'a.casecmp("abcde")', '1',
      'a = "abcdef"')

assert("String#casecmp.",
      'a.casecmp("abcdef")', '0',
      'a = "abcdef"')

assert("String#casecmp.",
      'a.casecmp("abcdefg")', '-1',
      'a = "abcdef"')

assert("String#casecmp.",
      'a.casecmp("ac")', '-1',
      'a = "abcdef"')

assert("String#casecmp.",
      'a.casecmp("a")', '1',
      'a = "abcdef"')

assert("String#casecmp.",
      'a.casecmp("aBcD")', '1',
      'a = "abcdef"')

assert("String#ord . Return an integer value of string",
      'a.ord()','97',
      'a = "a"')

assert("String#reverse. Return the reverse of string",
      'a.reverse()','"aloh"',
      'a = "hola"')

assert("String#include$U 1. Check is string contains the given string or character. the arguments is one character",
      'a.include$U("i")', "true",
      'a = "adios"')

assert("String#include$U 2. Check is string contains the given string or character. Argumenst empty ",
      'a.include$U("")', "true", 
      'a = "adios"')

assert("String#include$U 3. Check is string contains the given string or character. Argumenst is a string and find it",
      'a.include$U("io")', "true", 
      'a = "adios"')

assert("String#include$U 4. Check is string contains the given string or character. Argumenst is a string and not find it",
      'a.include$U("hio")', "false", 
      'a = "adios"')

assert("String#rindex 1. Returns the position of the last occurrence of the given character",
      'a.rindex("e")', "1", 
      'a = "hello"')

assert("String#rindex 2. Returns the position of the last occurrence of the given other variable",
      'a.rindex(b)', "4", 
      'a = "hello"; b = "o" ')

assert("String#rindex 3. Returns the position of the last occurrence of the given other string",
      'a.rindex("el")', "1", 
      'a = "hello"')

assert("String#rindex 4. Returns the position of the last occurrence of the given not arguments",
      'a.rindex()', "null", 
      'a = "hello"')

assert("String#center 1.",
       'a.center(3)', '"hello"',
       'a = "hello"')

assert("String#center 2.",
       'a.center(5)', '"hello"',
       'a = "hello"')

assert("String#center 3.",
       'a.center(11)', '"   hello   "',
       'a = "hello"')

assert("String#center 4.",
       'a.center(11, "12")', '"121hello121"',
       'a = "hello"')

assert("String#center 5.",
       'a.center(11, "1")', '"111hello111"',
       'a = "hello"')

assert("String#chr 1. Return the first character from a string",
       'a.chr()', '"h"',
       'a = "hello"')

assert("String#chr 2. Return the string if unique character",
       'a.chr()', '"h"',
       'a = "h"')

assert("String#chr 3. Return the string void",
       'a.chr()', '""',
       'a = ""')

assert("String#chomp 1.", 
       'a.chomp()', '"hello"',
       'a= "hello"')

assert("String#chomp 2.", 
       'a.chomp()', '"hello"',
       'a= "hello\\n"')

assert("String#chomp 3.", 
       'a.chomp()', '"hello"',
       'a= "hello\\r"')

assert("String#chomp 4.", 
       'a.chomp()', '"hello"',
       'a= "hello\\r\\n"')

assert("String#chomp 5.", 
       'a.chomp("llo")', '"he"',
       'a= "hello"')

assert("String#chomp 6.", 
       'a.chomp()', '"hello \\n there"',
       'a= "hello \\n there"')

/* todo:
assert("String#clear. Returns a clear string",////////////////////////// PENDIENTE REVISION
       'a.clear()', '""',
       'a = "hello"')
*/

assert("String#chop 1.",
       'a.chop()', '"hell"',
       'a= "hello"')

assert("String#chop 2.",
       'a.chop()', '"hello"',
       'a= "hello\\n"')

assert("String#chop 3.",
       'a.chop()', '"hello"',
       'a= "hello\\r"')

assert("String#chop 4.",
       'a.chop()', '"hello"',
       'a= "hello\\r\\n"')

assert("String#chop 5.",
       'a.chop("llo")', 'null',
       'a= "hello"')

assert("String#hex 1. String numeric",
       'a.hex()', '19',
       'a= "13"')
       
assert("String#hex 2. String numeric hexadecimal",
       'a.hex()', '19',
       'a= "0x13"')

assert("String#hex 3. String whith caracter hexadecimal",
       'a.hex()', '10',
       'a= "algo"')

assert("String#hex 4. String negative numeric",
       'a.hex()', '-19',
       'a= "-13"')

assert("String#hex 5. String",
       'a.hex()', '0',
       'a= "hello"')

assert("String#rjust 1.",
       'a.rjust(4)', '"hello"',
       'a= "hello"')
       
assert("String#rjust 2.",
       'a.rjust(10)', '"     hello"',
       'a= "hello"')

assert("String#rjust 3.",
       'a.rjust(10,"123")', '"12312hello"',
       'a= "hello"')

assert("String#rjust 4.",
       'a.rjust(10,"1")', '"11111hello"',
       'a= "hello"')

assert("String#succ 1.",
       'a.succ()', '"abce"',
       'a = "abcd"')

assert("String#succ 2.",
       'a.succ()', '"aaaaa"',
       'a = "zzzz"')

assert("String#succ 3.",
       'a.succ()', '"ibA0"',
       'a = "iaZ9"')

assert("String#succ 4.",
       'a.succ()', '"<<ibA0>>"',
       'a = "<<iaZ9>>"')

assert("String#to_i 1.Returns the result of interpreting leading characters in str as an integer base base (between 2 and 36)  Only numbers and not base",
      'a.to_i()', "1234",
      'a = "1234"')

assert("String#to_i 2.Returns the result of interpreting leading characters in str as an integer base base (between 2 and 36)  first numbers after character and not base",
      'a.to_i()', "1234",
      'a = "1234abce\t"')

assert("String#to_i 3.Returns the result of interpreting leading characters in str as an integer base base (between 2 and 36)  first character after numbers and character and not base",
      'a.to_i()', "0",
      'a = "abc1234abce\t"')

assert("String#to_i 4.Returns the result of interpreting leading characters in str as an integer base base (between 2 and 36)  first numbers and character and base= 2",
      'a.to_i(2)', "100",
      'a = "1100100abc"')

assert("String#to_i 5.Returns the result of interpreting leading characters in str as an integer base base (between 2 and 36)  first numbers and character and base= 16",
      'a.to_i(16)', "410",
      'a = "19ahd"')

assert("String#to_f 1.Returns the result of interpreting leading characters in str as a floating point number. Only numbers",
      'a.to_f()', "12345.0",
      'a = "12345"')

assert("String#to_f 2. First numbers after character",
      'a.to_f()', "45.67",
      'a = "45.67 degrees\t"')

assert("String#to_f 3.First character after numbers and characters",
      'a.to_f()', "0.0",
      'a = "thx1138"')

assert("String#to_f 4.First numbers and exponent",
      'a.to_f()', "1234.5",
      'a = "123.45e1"')

assert("String#to_f 5.First negative numbers and exponent",
      'a.to_f()', "-1234.5",
      'a = "-123.45e1"')

assert("String#to_f 6.First negative numbers and negative exponent",
      'a.to_f()', "-123.45",
      'a = "-1234.5e-1"')

assert("String#to_f 7.First numbers - character - numbers",
      'a.to_f()', "123",
      'a= "123abc56"')

assert("String#strip 1.Returns a copy of str with leading and trailing whitespace removed. Only character ",
      'a.strip()', "123",
      'a = "123"')

assert("String#strip 2.Returns a copy of str with leading and trailing whitespace removed. Whitespace - character - ",
      'a.strip()', "123",
      'a = "  \\\t \\\n  123"')

assert("String#strip 3.Returns a copy of str with leading and trailing whitespace removed. character - Whitespace",
      'a.strip()', "123",
      'a = "123 \\\t \\\r \\\n \t"')

assert("String#setbyte. Receive an index and and int. Returns the str with the character of the index changed ascii code",
      'a.setbyte(2,99)','"hoca"',
      'a = "hola"')

assert("String#each_line 1. Split a string in substring without argument to split string",
      'a.each_line(function(obj){return "" + obj + ""})', '["Hello\\n","world"]',
      'a = "Hello\\nworld"')

assert("String#each_line 2. Split a string in substring by an argument[0]",
      'b', '["Hel", "l", "o \\n worl", "d"]',
      'a = "Hello \\n world"; b = []; a.each_line("l",function(obj){b.push(obj)})')

assert("String#each_line 3.Split a string in substring by argument ''  ",
      'a.each_line("",function(obj){return "" + obj + ""})', '["Hello \\n\\n\\n"," world"]',
      'a = "Hello \\n\\n\\n world"')

assert("String#each_line 4.Split a string in substring by an argument that is not found  ",
      'a.each_line("g",function(obj){return "" + obj + ""})', '"Hello \\n\\n world"',
      'a = "Hello \\n\\n world"')

assert("String#strip 1.Returns a copy of str with leading and trailing whitespace removed. character - Whitespace - character - whitespace",
      'a.strip()', "123",
      'a = "  \t  123   \t"')

assert("String#partition 1.", 
       'a.partition("l")', '["he", "l", "lo"]',
       'a = "hello"')

assert("String#partition 2.",
       'a.partition("x")', '["hello", "", ""]',
       'a = "hello"')
     
assert("String#partition 3.",
       'a.partition(/.l/)', '["h", "el", "lo"]',
       'a = "hello"')

assert("String#rstrip 1. Delete the spaces to right the string.",
      'a.rstrip()', '"  Hello"',
      'a = "  Hello  "')

assert("String#rstrip 2. Delete the spaces to right the string.",
      'a.rstrip()', '"Hello"',
      'a = "Hello \t  \\\r   "')

assert("String#oct 1.  Returns an octal value from a string ",
      'a.oct()', '"83"',
      'a = "123"')

assert("String#oct 2.  Returns a negative octal value from a string",
      'a.oct()', '"-255"',
      'a = "-377"')

assert("String#oct 3. Returns a null value from a character string",
      'a.oct()', '"0"',
      'a = "bad"')

assert("String#oct 4. Only returns the octal value of a string",
      'a.oct()', '"255"',
      'a = "0377bad"')

assert("String#sum 1.",
       'a.sum()', '99',
       'a = "12"')

assert("String#sum 2.",
       'a.sum()', '195',
       'a = "ab"')

assert("String#upto 1.", 
       'a.upto("b6", function(obj){return obj + " "})', '"a8 a9 b0 b1 b2 b3 b4 b5 b6 "' ,
       'a = "a8"')

assert("String#upto 2.", 
       'a.upto("a8", function(obj){return obj + " "})', '"b6 "' ,
       'a = "b6"')

assert("String#upto 3.", 
       'a.upto("zz", function(obj){return obj + " "})', '"1z 2a 2b 2c 2d 2e 2f 2g 2h 2i 2j 2k 2l 2m 2n 2o 2p 2q 2r 2s 2t 2u 2v 2w 2x 2y 2z 3a 3b 3c 3d 3e 3f 3g 3h 3i 3j 3k 3l 3m 3n 3o 3p 3q 3r 3s 3t 3u 3v 3w 3x 3y 3z 4a 4b 4c 4d 4e 4f 4g 4h 4i 4j 4k 4l 4m 4n 4o 4p 4q 4r 4s 4t 4u 4v 4w 4x 4y 4z 5a 5b 5c 5d 5e 5f 5g 5h 5i 5j 5k 5l 5m 5n 5o 5p 5q 5r 5s 5t 5u 5v 5w 5x 5y 5z 6a 6b 6c 6d 6e 6f 6g 6h 6i 6j 6k 6l 6m 6n 6o 6p 6q 6r 6s 6t 6u 6v 6w 6x 6y 6z 7a 7b 7c 7d 7e 7f 7g 7h 7i 7j 7k 7l 7m 7n 7o 7p 7q 7r 7s 7t 7u 7v 7w 7x 7y 7z 8a 8b 8c 8d 8e 8f 8g 8h 8i 8j 8k 8l 8m 8n 8o 8p 8q 8r 8s 8t 8u 8v 8w 8x 8y 8z 9a 9b 9c 9d 9e 9f 9g 9h 9i 9j 9k 9l 9m 9n 9o 9p 9q 9r 9s 9t 9u 9v 9w 9x 9y 9z "' ,
       'a = "1z"')

assert("String#each_char.",
       'a.each_char(function(obj){return obj + " "})', '"h e l l o "',
       'a = "hello"')

assert("String#intersection 1. Returns the matches letters in the string.",
      'a.intersection("l")', '"ll"',
      'a = "hello"')

assert("String#intersection 2. Returns the matches letters in the string given a letters range.",
      'a.intersection("a-i")', '"he"',
      'a = "hello"')

assert("String#intersection 3. Returns the string without matches letters.",
      'a.intersection("^l")', '"heo"',
      'a = "hello"')

assert("String#intersection 4. Returns an intersection between the arguments.",
      'a.intersection("l","lo")', '"ll"',
      'a = "hello"')

assert("String#intersection 5. Returns the letters between the range and the matches letters",
      'a.intersection("a-il")', '"hell"',
      'a = "hello"')
/* todo:
assert("String#sub 1. ",
      'a.sub(/[aeiou]/, "*" )', '"H**lloo"',//////////////////////// PENDIENTE REVISIÓN
      'a = "Heelloo"')
*/

assert("String#bytes.",
      'a.bytes()', '104',
      'a = "hello"')

assert("String#ascii_only$U 1.",
      'a.ascii_only$U()', "true",
      'a = "hello"')

assert("String#ascii_only$U 2.",
      'a.ascii_only$U()', "false",
      'a = "-1.25"')

assert("String#each_codepoint.",
       'a.each_codepoint(function(obj){return obj + " "})', '"104 101 108 108 111 1593 "',
       'a = "hello\u0639"')

assert("String#rpartition 1.", 
       'a.rpartition("l")', '["hel", "l", "o"]',
       'a = "hello"')

assert("String#rpartition 2.",
       'a.rpartition("x")', '["","","hello"]',
       'a = "hello"')
     
assert("String#rpartition 3.",
       'a.rpartition(/.l/)', '["he", "ll", "o"]',
       'a = "hello"')

assert("String#scan.",
      'a.scan(/.../)', '["Hel"]',
      'a = "Hello World"')

assert("String#scan.",
      'a.scan(/(..)(.)/)', '["He","l"]',
      'a = "Hello World"')

assert("String#scan.",
      'b', '["Hel", "lo ", "Wor"]',
      'a = "Hello World"; b= []; a.scan(/.../, function(el){ b.push(el) })')

assert("String#scan.",
      'b', '["He", "l", "lo", " ", "Wo", "r"]',
      'a = "Hello World"; b= []; a.scan(/(..)(.)/, function(el1, el2){; b.push(el1); b.push(el2); })')


assert("String#end_With$U. Returns true if str ends with a suffix given.",
    'a.end_With$U("llo")',"true",
    'a = "hello"')

assert("String#eql$U. Returns true or false by comparing  object and the argument.",
      'a.eql$U("hello")',"true",
      'a = "hello"')

assert("String#to_str. Returns a duplicate, but not the string itself.",
      "a.to_str()", "'Hello'",
      "a = 'Hello'; b = a.to_str(); b = 'Bye'")

assert("String#getbyte .Returns the indexth byte as an integer.",
      'a.getbyte(1)',"101",
      'a = "hello"')

assert("String#erase 1. Erases a letter from a string.",
       'a.erase("l")', '"heo"',
       'a = "hello"')

assert("String#erase 2. Erases an intersection between the arguments.",
       'a.erase("l", "lo")', '"heo"',
       'a = "hello"')	

assert("String#erase 3. Erases an intersection between the arguments.",
       'a.erase("aeiou", "^e")', '"hell"',
       'a = "hello"')

assert("String#erase 4. Erases a group of letters.",
       'a.erase("a-i")', '"llo"',
       'a = "hello"')

assert("String#erase 5. Erases an intersection between a group of letters and a single letter.",
        'a.erase("a-io")', '"ll"',
        'a = "hello"')

assert("String#to_r 1. Return a rational number which denotes the string form. String only number .",
        'a.to_r()', '"12/1"',
        'a = "12"')

assert("String#to_r 2. Return a rational number which denotes the string form. String only number and charater .",
        'a.to_r()', '"61/5"',
        'a = "  12.2__a212  _"')



assert("String#to_r 3. Return a rational number which denotes the string form. String only number and charater at firts string .",
        'a.to_r()', '"0/1"',
        'a = "  _12.2__a212  _"')

assert("String#to_r 4. Return a rational number which denotes the string form. String with number / number  .",
        'a.to_r()', '"150/1"',
        'a = "  300/2_"')
assert("String#to_r 5. Return a rational number which denotes the string form. String with number / number and other character .",
        'a.to_r()', '"7/2"',
        'a = "  21/06/09_"')

assert("String#to_r 6. Return a rational number which denotes the string form. String with negative number.",
        'a.to_r()', '"-920/1"',
        'a = "  -9.2e2_"')

assert("String#to_r 7. Return a rational number which denotes the string form. String with character + number.",
        'a.to_r()', '"0/1"',
        'a = "  kike-9.2e2_"')

assert("String#to_r 8. Return a rational number which denotes the string form. String with number / number + character + number.",
        'a.to_r()', '"460/1"',
        'a = "  9.2e2/2_kike12"')

assert("String#to_r 9. Return a rational number which denotes the string form. String with number / number with decimal character .",
        'a.to_r()', '"460/1"',
        'a = "  9.2e2/2.2_kike"')

assert("String#bytesize",
       'a.bytesize()', '"5"',
       'a = "hello"')

assert("String#humanize",
       '"the_rolling_stones".humanize()', '"the rolling stones"',
       ''
      )

assert("String#humanize",
       '"the______rolling______stones".humanize()', '"the rolling stones"',
       ''
      )

assert("String#humanize",
       '"theRollingStones".humanize()', '"the rolling stones"',
       ''
      )      

assert("String#humanize",
       '"TheRollingStones".humanize()', '"The rolling stones"',
       ''
      )


assert("String#humanize",
       '"   the_rolling_stones   ".humanize()', '"the rolling stones"',
       ''
      )
      

assert("String#humanize",
       '"   theRollingStones  ".humanize()', '"the rolling stones"',
       ''
      )      
      
assert("String#humanize",
       '"  TheRollingStones  ".humanize()', '"The rolling stones"',
       ''
      )
      
assert("String#underscore",
       '"the rolling stones".underscore()', '"the_rolling_stones"',
       ''
      )
      
assert("String#underscore",
       '"  the rolling stones  ".underscore()', '"the_rolling_stones"',
       ''
      )

assert("String#underscore",
       '"theRolling stones".underscore()', '"the_rolling_stones"',
       ''
      )
      
assert("String#underscore",
       '"TheRolling _stones".underscore()', '"The_rolling_stones"',
       ''
      )


assert("String#underscore",
       '"  TheRolling   ____stones".underscore()', '"The_rolling_stones"',
       ''
      )      


assert("String#camel_case",
       '"the rolling stones".camel_case()', '"theRollingStones"',
       '')
       
assert("String#camel_case",
       '"the rolling   stones".camel_case()', '"theRollingStones"',
       '')
       
assert("String#camel_case",
       '"the_rolling___stones".camel_case()', '"theRollingStones"',
       '')            
       
assert("String#camel_case",
       '"  the _rolling  _  ___ _ stones".camel_case()', '"theRollingStones"',
       '')         
       
assert("String#camel_case",
       '"  The _rolling  _  ___ _ stones".camel_case()', '"TheRollingStones"',
       '')                
       
assert("String#camel_case",
       '"The _rolling  _  ___ _ stones".camel_case()', '"TheRollingStones"',
       '')        
/*
assert("String#squeeze 1. ",
       'a.squeeze()', '"helo"',
       'a = "heello"')

assert("String#squeeze 2. ",
       'a.squeeze("l")', '"heelo"',
       'a = "heello"')

assert("String#squeeze 3. ",
       'a.squeeze("g-m")', '"abcdefzz"',////////////////////////////////// PENDIENTE REVISION
       'a = "abcdefgghhiijjkkzz"')
*/


assert("String#normalize_index 1.",
       'a.normalize_index(-1)', '4',
       'a="hello"')

assert("String#normalize_index 2",
       'a.normalize_index(-6)', 'null',
       'a="hello"')

assert("String#normalize_index 3",
       'a.normalize_index(-2,5)', '3',
       'a="hello"')
