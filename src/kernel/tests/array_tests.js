assert("Array.isArray 1. With argument", 
	"b", 'true',  
      'a = [1,2,3,4,5]; b=Array.isArray(a)' )

assert("Array.isArray 1. No argument", 
	"b", 'false',  
      'a = [1,2,3,4,5]; b=Array.isArray()' )

assert("Array#take 1. Single numeric argument", 
	"b", '[1,2,3]',  
      'a = [1,2,3,4,5]; b = a.take(3)' )

assert("Array#take 2. No argument", 
	"b", 'null',  
      'a = [1,2,3,4,5]; b = a.take()' )

assert("Array#take 3. Single numeric negative argument", 
	"b", '[]',  
      'a = [1,2,3,4,5]; b = a.take(-3)' )

assert( "Array#take_while #1.",
        "r", "[1,2,2]",
        "a = [1,2,2,3,4,2,5]; r = a.take_while( \
          function(el){ return el < 3 } )"
      )

assert("Array.reflect 1. Single argument",
       "a", "[1, 1, 1]",
       "Array.prototype.oneize = function(){;\
            var result = []; \
            for (var i=0; i<this.length; i++) result[i] = 1;\
            return result; \
        }; \
        Array.reflect('oneize'); \
        a = [1, 2, 3]; a.oneize$B()" )

assert("Array.reflect 2. Single argument",
       "a", "[1, 1, 1]",
       "Array.prototype.oneize = function(){;\
            var result = []; \
            for (var i=0; i<this.length; i++) result[i] = 1;\
            return result; \
        }; \
        Array.prototype.twoize = function(){;\
            var result = []; \
            for (var i=0; i<this.length; i++) result[i] = 2;\
            return result; \
        }; \
        Array.reflect('oneize', 'twoize'); \
        a = [1, 2, 3]; a.oneize$B()" )


assert("Array.reflect 3. List of arguments",
       "a", "[2, 2, 2]",
       "Array.prototype.oneize = function(){;\
            var result = []; \
            for (var i=0; i<this.length; i++) result[i] = 1;\
            return result; \
        }; \
        Array.prototype.twoize = function(){;\
            var result = []; \
            for (var i=0; i<this.length; i++) result[i] = 2;\
            return result; \
        }; \
        Array.reflect('oneize', 'twoize'); \
        a = [1, 2, 3]; a.twoize$B()" )

assert("Array.reflect 4. Array argument",
       "a", "[2, 2, 2]",
       "Array.prototype.oneize = function(){;\
            var result = []; \
            for (var i=0; i<this.length; i++) result[i] = 1;\
            return result; \
        }; \
        Array.prototype.twoize = function(){;\
            var result = []; \
            for (var i=0; i<this.length; i++) result[i] = 2;\
            return result; \
        }; \
        Array.reflect(['oneize', 'twoize']); \
        a = [1, 2, 3]; a.twoize$B()" )

assert("Array.reflect 5. Array argument",
       "a", "[1, 1, 1]",
       "Array.prototype.oneize = function(){;\
            var result = []; \
            for (var i=0; i<this.length; i++) result[i] = 1;\
            return result; \
        }; \
        Array.prototype.twoize = function(){;\
            var result = []; \
            for (var i=0; i<this.length; i++) result[i] = 2;\
            return result; \
        }; \
        Array.reflect(['oneize', 'twoize']); \
        a = [1, 2, 3]; a.oneize$B()" )

assert("Array#uniq 1. Ordered elements", 
      "a", '["a", "b", "c"] ',  
      'a = ["a", "a", "b", "b", "c"].uniq()' )

assert("Array#uniq 2. Unordered elements", 
      "a", '["a", "b", "c"] ',  
      'a = ["a", "b", "a", "b", "c"].uniq()' )

assert("Array#uniq 3. Integers", 
      "a", '[2, 1, 3] ',  
      'a = [2, 1, 2, 1, 2, 2, 3, 1, 1].uniq()' )

assert("Array#uniq 4. A Block is Given.",
	"a.uniq( function(element){ return element[0] })", "[['male', 'john'], ['female', 'deborah']]",
	"a = [['male', 'john'], ['male', 'paul'], ['female', 'deborah']]")

assert("Array#uniq$B 1. With changes.", 
      "a", "[1, 2, 3]", 
      "a = [ 1, 2, 1, 2, 2, 3, 1, 2, 3]; a.uniq$B()")

assert("Array#uniq$B 2. With no changes.",
       "a.uniq$B()", "null", "a = [1, 2, 3]")

assert("Array#clear.",
      "a", "[]",
      "a = [1,2,3]; a.clear()")
      
assert("Array#equals$U 1. Identic arrays",
      "a.equals$U(b)", "true",
      "a = [1,2,3]; b = [1,2,3]") 
      
assert("Array#equals$U 2. Distinct arrays",
      "a.equals$U(b)", "false",
      "a = [1,2,3]; b = [3,4,5]")
      
assert("Array#equals$U 3. Arrays with distinct length",
      "a.equals$U(b)", "false",
      "a = [1,2,3]; b = [1,2,3,4]")
      
assert("Array#first 1. without parameters",
      "a.first()", "1",
      "a = [1,2,3]")            

assert("Array#first 2. with parameters",
      "a.first(3)", "[1,2,3]",
      "a = [1,2,3,4,5,6]")

assert("Array#first 3. Empty array with parameters",
      "a.first(2)", "null",
      "a = []")

assert("Array#first 4. Empty array without parameters",
      "a.first()", "null",
      "a = []")

assert("Array#first 5. The parameter is greater than the length of the array.",
      "a.first(20)", "[1, 3, 5]",
      "a = [1, 3, 5]")

assert("Array#last 1. without parameters",
      "a.last()", "3",
      "a = [1,2,3]")            

assert("Array#last 2. with parameters",
      "a.last(3)", "[4,5,6]",
      "a = [1,2,3,4,5,6]")

assert("Array#last 3. Empty array with parameters",
      "a.last(2)", "null",
      "a = []")

assert("Array#last 4. Empty array without parameters",
      "a.last()", "null",
      "a = []")

assert("Array#last 5. with parametres",
      "a.last(4)", "[3,4,5,6]",
      "a = [1,2,3,4,5,6]")

assert("Array#last 6. with parametres",
      "a.last(2)", "[5,6]",
      "a = [1,2,3,4,5,6]")

assert("Array#include$U 1. Search a item in array with parameter",
      "a.include$U(2)", "true",
      "a = [1, 2, 3, 4, 5]")

assert("Array#include$U 2. Search a item in array with parameter and it don't found ",
      "a.include$U(9)", "false",
      "a = [1, 2, 3, 4, 5]")

assert("Array#include$U 3. Search a item in array with parameter. Wrong number of arguments",
      "a.include$U(9, 2)", "null",
      "a = [1, 2, 3, 4, 5]")

assert("Array#replace 1. with parameters",
       'a.replace(["y","z"])', '["y","z"]',
       'a = ["a","b","c"]') 
       
assert("Array#replace 2. without parameters",
       'a.replace()', "null",
       'a = ["a","b","c"]') 

assert("Array#replace 3. Empty array",
       "a.replace([])", "[]",
       'a = ["a","b","c"]') 

assert("Array#replace 4. with other array",
       "a.replace(b)", '["f","g"]',
       'a = ["a","b","c"]; b = ["f","g"]')

assert("Array#replace 5. Errors, more than one array.", 
       'a.replace(a,b)', "null",
       'a = ["a","b","c"]; b = ["f","g"]') 

assert("Array#replace 6. Errors, parameter is not array.", 
       'a.replace("a")', "null",
       'a = ["a","b","c"]') 

assert("Array#erase$B 1. Delete array's elements with parameter",// Problemas con la comprobación. El test da failed cuando debería de dar Ok.
      "a", '[1, 3]',
      "a = [1, 2, 2, 2, 3]; a.erase$B(2)")

assert("Array#erase$B 2. Delete array's elements with parameter and not found",
      "r", "null",
      "a = [1, 2, 2, 2, 3]; r=a.erase$B(4); ")

assert("Array#erase$B 3. Delete array's elements with parameter and not found",
      "a", "[1, 2, 2, 2, 3]",
      "a = [0, 1, 2, 2, 2, 3, 0]; a.erase$B(0)")

assert( "Array#delete$B #1. Something is found",
        "a", "[1,3,4]",
        "a = [1, 2, 2, 3, 2, 4]; a.delete$B(2);"
      )

assert( "Array#delete$B #2. Something is found",
        "r", "2",
        "a = [1, 2, 2, 3, 2, 4]; r = a.delete$B(2)"
      )

assert( "Array#delete$B #3. Anything found",
        "a.delete$B(5)", "null",
        "a = [1, 2, 2, 3, 2, 4];"
      )

assert( "Array#delete$B #4. Anything found and block given",
        "r", "'Not found'",
        "a = [1, 2, 2, 3, 2, 4]; r = a.delete$B(5, function(){ return 'Not found' })"
      )

assert( "Array#delete$B #4. Something found and block given",
        "r", "2",
        "a = [1, 2, 2, 3, 2, 4]; r = a.delete$B(2, function(){ return 'Not found' })"
      )

assert("Array#erase_at$B 1. Delete array's elements with parameters",// Problemas con la comprobación. El test da failed cuando debería de dar Ok.
      "a", "['ant', 'bat', 'dog']",
      "a = [ 'ant', 'bat', 'cat', 'dog']; a.erase_at$B(2)")

assert("Array#erase_at$B 2. Delete array's elements with parameters higher than the array",
      "a", 'a = [ "ant", "bat", "cat", "dog"]',
      'a = [ "ant", "bat", "cat", "dog"]; a.erase_at$B(6)')

assert("Array#assoc 1. with existing parameter",
       'ary.assoc("animals")','["animals","cat","dog"]',
       'a = ["letters","a","b"]; b = ["animals","cat","dog"]; ary = [a, b]')

assert("Array#assoc 2. without existing parameter",
       'ary.assoc("cars")','null',
       'a = ["letters","a","b"]; b = ["animals","cat","dog"]; ary = [a, b]')

assert("Array#at 1. with a positive index.",
       'a.at(1)','"cat"',
       'a = ["dog","cat","hamster","fish"]')
       
assert("Array#at 2. with a negative index.",
       'a.at(-1)','"fish"',
       'a = ["dog", "cat", "hamster","fish"]')
 
assert("Array#at 3. with a negative index.",
       'a.at(-7)','null',
       'a = ["dog", "cat", "hamster","fish"]')

assert("Array#compact 1. with any null elements",
       'a.compact()','[1,2,3]',
       'a = [1,null,2,3,null]')
       
assert("Array#compact 2. with only null elements",
       'a.compact()','[]',
       'a = [null,null,null]')

assert("Array#drop.",
       "a.drop(2)","[3,4,5]",
       "a = [1,2,3,4,5]")       

assert("Array#drop.",
       "a.drop(-3)","[1,2,3,4,5]",
       "a = [1,2,3,4,5]")  

assert("Array#flatten 1. without parameter",
       "a.flatten()","[11,12,21,22,31,32]",
       "a = [11,12,[21,22,[31,32]]]")

assert("Array#flatten 2. with level",
       "a.flatten(1)","[11,12,21,22,[31,32]]",
       "a = [11,12,[21,22,[31,32]]]")

assert("Array#flatten 3. with level",//Problemas con la comprobación. El test da failed cuando debería ser Ok.
       "a.flatten(3)","[11,12,21,22,[31,32]]",
       "a = [11,12,[21,22,[31,32]]]")


assert("Array#index 1. with a existing object",
       'a.index("c")',"2",
       'a = ["a","b","c"]')

assert("Array#index 2. with a unexisting object",
       'a.index("z")',"null",
       'a = ["a","b","c"]')

assert("Array#index 3. Criteria",
       "a.index( function(element){ return element > 6 ? true : false })", "3",
       "a = [4, 5, 2, 8, 7, 1]")
       
assert("Array#product.",
      "a.product([4,5])","[[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]]",
      "a = [1,2,3]")

assert("Array#rassoc 1. With a existing element.",
       'a.rassoc("two")','[2, "two"]',
       'a = [[1, "one"],[2, "two"],[3, "three"]]')

assert("Array#rassoc 2. Without existing element.",
       'a.rassoc("four")','null',
       'a = [[1, "one"],[2, "two"],[3, "three"]]')

assert("Array#rindex 1. With a existing element",
       'a.rindex("b")',"3",
       'a = ["a","b","c","b","d"]')

assert("Array#rindex 2. Without existing element.",
       'a.rindex("z")',"null",
       'a = ["a","b","c","b","d"]')

assert("Array#rotate 1. With negative index.",
       "a.rotate(-2)",'["c","d","a","b"]',
       'a = ["a","b","c","d"]')

assert("Array#rotate 2. Other example.",
       "a.rotate(-3)",'["b","c","d","a"]',
       'a = ["a","b","c","d"]')
              
assert("Array#rotate 3. Whithout argument", //Problemas con la comprobación. El test muestra void.
       "a.rotate()", '["b","c","d","a"]',
       'a = ["a","b","c","d"]')
       
assert("Array#rotate 4. Whith positive arguments", 
       "a.rotate(2)", '["c","d","a","b"]',
       'a = ["a","b","c","d"]')

assert("Array#rotate 5. Whith positive arguments", 
       "a.rotate(3)", '["d","a","b","c"]',
       'a = ["a","b","c","d"]')

assert("Array#rotate 6. Whith null arguments", 
       "a.rotate(3)", 'null',
       'a = []')

assert("Array#count 1. Without parameters.",
       "a.count()",'3',
       'a = ["a","b","c"]')
      
assert("Array#count 2. With paremeter.",
       "a.count('a')",'1',
       'a = ["a","b","c"]')

assert("Array#count 2a. With paremeter.",
       "a.count('a')",'2',
       'a = ["a","b","a"]')
       
assert("Array#count 3. With condition.",
       "a.count(function(obj){ return obj > 'a' })",'2',
       'a = ["a","b","c"]')
      
assert("Array#take 1.",
       "a.take(3)","[1,2,3]",
       "a = [1,2,3,4,5,6]") 
       
assert("Array#take_while",
       "a.take_while(function(obj){return obj<3? obj: null})","[1,2]",
       "a = [1,2,3,4,5,6]")       
      
assert("Array#shuffle",
       "a.shuffle() == a","false",
       "a = [1,2,3,4]")
       
assert("Array#collect.",
       'a.collect(function(obj){ return obj + "!" })','["a!","b!","c!"]',
       'a = ["a","b","c"]')

assert("Array#map. Array#collect alias",
       'a.map(function(obj){ return obj + "!" })','["a!","b!","c!"]',
       'a = ["a","b","c"]')

assert("Array#collect$B.",
       'a','["a!","b!","c!"]',
       'a = ["a","b","c"]; a.collect$B(function(obj){ return obj + "!" })')
       
assert("Array#map$B.",
       'a','["a!","b!","c!"]',
       'a = ["a","b","c"]; a.map$B(function(obj){ return obj + "!" })')

assert("Array#transpose 1. With non-square matrices",//problemas con los assert
       "a.transpose()","[[1,3,5],[2,4,6]]",
       "a = [[1,2],[3,4],[5,6]]") 
       
assert("Array#transpose 2. With square matrices",
       "a.transpose()","[[1,1,1],[2,2,2],[3,3,3]]",//problemas con los assert
       "a = [[1,2,3],[1,2,3],[1,2,3]]")
                        
assert("Array#transpose 3. With words matrices",
       "a.transpose()","[['hola', 'adios'],['pedro','juan'],['cristobal','colon']]",//problemas con los assert
       "a = [['hola','pedro','cristobal'],['adios','juan','colon']]")
                          

assert("Array#zip 1. ",//Problemas con la comprobación. El test da failed cuando debería ser Ok.
       'a.zip(b, c)','[[1, 4, 7], [2, 5, 8], [3, 6, 9]]',
       'a = [1,2,3]; b = [4,5,6]; c = [7,8,9]')

assert("Array#zip 2. Other sample ",//Problemas con la comprobación. El test da failed cuando debería ser Ok.
       'a.zip(b, c)','[[1, 4, 7], [2, 5, 8]]',
       'a = [1,2]; b = [4,5,6]; c = [7,8,9]')

assert("Array#zip 3. Other sample",//Problemas con la comprobación. El test da failed cuando debería ser Ok.
       'a.zip(b, c)','[[1, 4, 7], [2, 5, null], [3, null, null]]',
       'a = [1,2,3]; b = [4,5]; c = [7]')

assert("Array#empty$U",
       "a.empty$U()","true",
       "a = []")

assert("Array#eql$U 1. Compare identic simple arrays",
       "a.eql$U(b)","true",
       "a = [1,2,3]; b = [1,2,3]")

assert("Array#eql$U 2. Compare identic array of arrays",
       "a.eql$U(b)","true",
       "a = [[1],[2],[3]]; b = [[1],[2],[3]]")

assert("Array#eql$U 3. Comparte distinc array of arrays",
       "a.eql$U(b)","false",
       "a = [[1],[2],[3]]; b = [[1],[2],[8]]")
       

assert("Array#drop_while",
       "a.drop_while(function(obj){ return obj < 5})",
       "[5,6,7,8,9]",
       "a = [1,2,3,4,5,6,7,8,9]")


assert("Array#drop_while",
       "a.drop_while(function(obj){ return obj < 7 })","[7,8,9]",
       "a = [1,2,3,4,5,6,7,8,9]")

assert("Array#erase_if",
       "a.erase_if(function(obj){ return obj > 2 })","[1,2]",
       "a = [1,2,3,4,5]")

assert("Array#erase_if$B",
       "a.erase_if(function(obj){ return obj == 2 })","[1,3,4,5]",
       "a = [1,2,2,3,2,4,5]")

assert("Array#reverse",
       "a.reverse()","[4,3,2,1]",
       "a = [1,2,3,4]")

assert("Array#values_at 1",
       'a.values_at(1,2)','["b","c"]',
       'a = ["a","b","c","d"]')

assert("Array#values_at 2. With negative params",
       'a.values_at(-1)','["d"]',
       'a = ["a","b","c","d"]')

assert("Array#values_at 3. With positive and negative params",
       'a.values_at(-1,1)','["d","b"]',
       'a = ["a","b","c","d"]')

assert("Array#values_at 4. With over length of Array index",
       'a.values_at(1,2,-8)','["b","c",null]',
       'a = ["a","b","c","d"]')

assert("Array#each 1. Without code inside",
       'a.each(function(obj){  })','undefined',
       'a = [1]')

assert("Array#each_index 1. Without code inside",
       'a.each_index(function(obj){  })','undefined',
       'a = [1]')

assert("Array#each_with_index 1. Without code inside",
       'a.each_index(function(obj){  })','undefined',
       'a = [1]')

assert("Array#each_with_index 1. Without code inside",
       'a.each_index(function(obj){  })','undefined',
       'a = [1]')

assert("Array#clone 2. With sample array",
       'b = a.clone()',
       'a',
       'a = ["John","David","Peter"]')

assert("Array#collect 1. Names with dot",
       'names.collect(function(obj){ return obj+"."})',
       '["Peter.","John.","David."]',
       'var names = ["Peter","John","David"]')

assert("Array#collect 2. Calculate discount",
       'number.collect(function(obj){ return obj-(obj*0.25)})',
       '[187.5,375,857.25]',
       'var number = [250,500,1143]')

assert("Array#select_if 1. Sample condition",
       'number.select_if(function(obj){if(obj > 300){ return true }else{ return false}})',
       '[500,1143]',
       'var number = [250,500,1143]')

assert("Array#indexOf 1. Search an string",
       'number.indexOf("David", 0)',
       '0',
       'var number = ["David", "Rachel"]')

assert("Array#indexOf 2. Search an integer",
       'number.indexOf(56, 0)',
       '1',
       'var number = [34,56,78,98]')

assert("Array#indexOf 3. Search an integer that does not exist ",
       'number.indexOf(36, 0)',
       'null',
       'var number = [34,56,78,98]')


assert("Array#sort_by 1. When no block is given, Array#sort_by acts as Array#sort.",
       "cities.sort_by()", "cities.sort()",
       "var cities = ['Madrid', 'barcelona', 'Valencia', 'alicante']")

assert("Array#sort_by 2. When a block is given, Array#sort_by maps the elements with the block return value.",
       "cities.sort_by(function(el){ return el.length })", "['Madrid', 'Valencia', 'Barcelona']",
       "var cities = ['Madrid', 'Barcelona', 'Valencia']")

assert("Array#sort_by 2. When a block is given, Array#sort_by maps the elements with the block return value.",
       "cities.sort_by(function(el){ return el.toLowerCase() })", "['alicante', 'barcelona', 'Madrid', 'Valencia']",
       "var cities = ['Madrid', 'barcelona', 'Valencia', 'alicante']")

assert("Array#strip_all 1. Sample testing ",
       'number.strip_all()', '[1,2,3,"4"]',
       'var number = [1,2,3,"   4"]')

assert("Array#inject 1. Sample testing ",
       'number.inject(1)',
       'null',
       'var number = [1,2,3,4]; var num2 = [1,2,3,4]')

assert("Array#to_a.",
       "a[0].to_a()","[1]",
       "a = [O(1), 2, 3, 4]")

assert("Array#collect$B.",
       'a','["a!","b!","c!"]',
       'a = ["a","b","c"]; a.collect$B(function(obj){ return obj + "!" })')

assert("Array#combination 1.",
       'a.combination(1)',"[[1],[2],[3],[4]]",
       "a = [1,2,3,4]")

assert("Array#combination 2. Other example",
       "r","[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]",
       "a = [1,2,3,4]; r=a.combination(2)")

assert("Array#combination 3.",
        "a.combination(3)","[[1,2,3],[1,2,4],[1,3,4],[2,3,4]]",
        "a = [1,2,3,4]")

assert("Array#combination 4.",
        "a.combination(5)",
        " [[1,2,3,4,5],[1,2,3,4,6],[1,2,3,4,7],[1,2,3,5,6],[1,2,3,5,7],[1,2,3,6,7],[1,2,4,5,6],[1,2,4,5,7],[1,2,4,6,7],[1,2,5,6,7],[1,3,4,5,6],[1,3,4,5,7],[1,3,4,6,7],[1,3,5,6,7],[1,4,5,6,7],[2,3,4,5,6],[2,3,4,5,7],[2,3,4,6,7],[2,3,5,6,7],[2,4,5,6,7],[3,4,5,6,7]]",
        "a = [1,2,3,4,5,6,7]")

assert("Array#combination 5.",
       "a.combination(4)","[[1,2,3,4]]",
       "a = [1,2,3,4]")

assert("Array#combination 6.",
       "a.combination(0)","[[]]",
       "a = [1,2,3,4]")

assert("Array#combination(5) 7.",
       "a.combination(5)","[]", //no combinations of length 5
       "a = [1,2,3,4]")

assert("Array#compact$B.",
      "a","[1,2,3,4]",
      "a = [1, null, 2, 3, null, 4]; a.compact$B()")
