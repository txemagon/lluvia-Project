/*
assert("There is a factory for /Class_[a-zA-Z_$][a-zA-Z_$0-9]* /",
       "MyClass instanceof Function", "true",
       "Class_MyClass()")
       
assert("The framework should track new generated classes.",
       "$classes.include$U(MyClass)", "true",
       "Class_MyClass()")

assert("The Class factory generates a truly usable class.",
       "return_value.name", "'q'",
       "Class_MyClass(function() {this.name ='q'}); \
        return_value = new MyClass()")


assert("The Class factory returns the new created class.",
       "return_value.name", "'q'",
       "return_value = new Class_MyClass(function() {this.name ='q'})();")
      

assert("The returned class contains the appropriate code.",
       "MyClass.toSource()", "return_value.toSource()",
       "return_value = Class_MyClass()")

assert("New classes accept parameters in the initializer.",
       "return_value.name", "'pepe'",
       "return_value = new Class_MyClass(function(name) {this.name = name})('pepe');")

assert("The self keyword references the class.",
       "MyClass.data", "'class data'",
       "Class_MyClass(function(){;\
           self.data = 'class data';\
       });" );

assert("Whenever function initialize is present from second place onwards it is automatically called as an object instance initializer.",
       "obj.name", "'pepe'",
       "Class_Person(function(){this.name = 'juan' }, \
                     function initialize(name){ this.name = 'pepe' }, \
                     function(){this.name = 'luis'}); \
        obj = new Person()")

assert("Object initializer accepts parameters.",
       "obj.name", "'pepe'",
       "Class_Person(function(name){this.name = 'juan'}, \
                     function initialize(name){ this.name = name }, \
                     function(){this.name = 'luis'}); \
        obj = new Person('pepe')")        
        
assert("The object initializer is valid even in the third position.",
       "obj.name", "'pepe'",
       "Class_Person(function(name){this.name = 'juan'}, \
                     function(){this.name = 'luis'}, \
                     function initialize(name){ this.name = name });\
        obj = new Person('pepe')")                
        
assert("Anonymous functions don't cause any problems.",
       "obj.name", "'pepe'",
       "Class_Person(function(name){this.name = 'juan'}, \
                     function(){this.name = 'luis'}, \
                     function initialize(name){ this.name = name });\
        obj = new Person('pepe')")                
                

assert("Extra params are considered as object instance methods.",
       "obj.greet()", "'hello. I am pepe'",
       "Class_Person(function(name){this.name = 'juan'}, \
                     function greet(){ return 'hello. I am ' + this.name }, \
                     function initialize(name){ this.name = name });\
        obj = new Person('pepe');")        
        

assert("self_initialize is a convenience method for initializing class variables.",
       "Person.people", "2",
       "Class_Person(function(name){this.name = name}, \
                     function self_number(){ return self.people }, \
                     function self_initialize(){self.people = 0 }, \
                     function initialize(){ self.people++ });\
        new Person('pepe'); new Person('juan');")                
 

assert("Whenever a function name starts with self_ is considered as a class method.",
       "Person.number()", "11",
       "Class_Person(function(name){this.name = name}, \
                     function self_number(){ return self.people }, \
                     function self_initialize(){self.people = 10 }, \
                     function initialize(){ self.people++ });\
         new Person('juan')")

assert("self_initialize doesn't run on parent class as a default.",
       "Freaky.number()", "1",
       "Class_Person(function(name){this.name = 'person'}, \
                     function self_number(){ return self.people }, \
                     function self_initialize(){self.people = 5 }, \
                     function initialize(){ self.people++ });\
         Class_Freaky$$Person(function(name){this.name = 'surperson'}, \
                     function self_number(){ return self.people }, \
                     function self_initialize(){self.people = 0 }, \
                     function initialize(){ self.people++} );\
         new Freaky('juan');")        

 assert("The word after two dollars is considered the parent class.",
        "cow.lives", "true",
        "Class_Animal(function(){ this.lives = true });\
         Class_Cow$$Animal(function(){ });\
         cow = new Cow();\
         ")

assert( "Each function has a legacy scope (self means different things depending on the environment).",
          "a", "'Animal'",
          "Class_Animal( function(){ a = self.name } ) " )

assert( "Each function has a legacy scope (self doesn't mean different things depending on the environment).",
          "a", "'Animala'",
          "Class_Animala( function(){}, function greet(){ a = self.name} ); (new Animala()).greet() ")

assert( "Each function has a legacy scope (self doesn't mean different things depending on the environment).",
          "a", "'Animalb'",
          "Class_Animalb( function(){}, function self_greet(){ a = self.name} ); Animalb.greet() ")

assert( "Each function has a legacy scope(self doesn't mean different things depending on the environment).",
          "a", "'Animal'",
          "Class_Animal( function(){;}, function self_initialize(){ a = self.name } ) " )

assert( "Each function has a legacy scope(Self means different things depending on the environment).",
          "a", "'Cow'",
          "Class_Animal( function(){;}, function self_initialize(){ a = this.Self().name });\
           Class_Cow$$Animal(function(){;}, function self_initialize(){ self.superclass().initialize.apply(this) } ) " )

assert( "Each function has a legacy scope(Self means different things depending on the environment).",
          "cow.a", "'Cow'",
          "Class_Animalc( function(){;}, function self_initialize(){ a = this.Self().name });\
           Class_Cow$$Animalc(function(){;}, function peep(){this.a = this.Self().name} );\
           cow = new Cow(); cow.peep() " )

assert("Inheritance is possible at class level.",
        "Cow.lives", "true",
        "Class_Animal(function(){;}, function self_initialize(){ this.lives = true });\
         Class_Cow$$Animal(function(){ }, function self_initialize(){ self.superclass().initialize.call(this) });\
         ") 

assert("Object#Self always refers to the class being executed (from the object point of view).",
       "a", "'Bee'",
       "Class_Bee(function(){;}, function buzz(){ a = Self.name});\
        (new Bee()).buzz()")

assert("Object#Self always refers to the class being executed.",
       "a", "'Yellow'",
       "Class_Bee(function(){;}, function buzz(){ a = Self.name});\
        Class_Yellow$$Bee(function(){;}, function say(){ Bee.prototype.buzz.call(this) } );\
        (new Yellow()).say()")

assert("Inheritance accepts methods from the outside.",
       "a", "'Yellow'",
       "Class_Bee(function(){;}, function buzz(){ a = Self.name});\
        Class_Yellow$$Bee(function(){;}, function say(){ alert(this.toSource()) } );\
        (new Yellow()).buzz();")

assert("Inheritance accepts methods from the inside.",
       "a", "'Yellow'",
       "Class_Bee( function(){;}, function buzz(){ a = Self.name} );\
        Class_Yellow$$Bee(function(){;}, function say(){ this.buzz() } );\
        (new Yellow()).say();")      

assert("Object#Self always refers to the class being executed.",
       "a", "'Yellow'",
       "Class_Bee(function(){;}, function buzz(){ a = Self.name} );\
        Class_Yellow$$Bee(function(){;} );\
        b = new Yellow(); b.buzz()")

assert("Capitalized Self supports apply calls (has different meaning depending on the scope) inside method calls.",
        "Cow.lives", "true",
        "Class_Animal(function(){;}, function self_initialize(){ Self.lives = true });\
         Class_Cow$$Animal(function(){ }, function self_initialize(){ Self.superclass().initialize.call(this) });\
         ") 

assert("Inheritance is possible at class level.",
        "Cow.lives", "true",
        "Class_Animal(function(){ this.lives = true });\
         Class_Cow$$Animal(function(){ }, function self_initialize(){ self.superclass().call(this) });\
         ") 
 
assert("Every single class has a name property, which answers the name of the class as a String.",
       "OneAnimal.name", "'OneAnimal'",
       "Class_OneAnimal(function(){ self.lives = true })")       

assert("An object knows its class. (test 1)",
       "cow.class instanceof Function", "true",
       "Class_Animal(function(){ self.lives = true }); cow = new Animal();")

assert("An object knows its class. (test 2)",
       "cow.class.name ", "'Animal'",
       "Class_Animal(function(){ self.lives = true }); cow = new Animal();")
            
assert("Object#superclass (test 1)",
       "Cow.superclass()", "Animal",
       "Class_Animal(function(){ }); Class_Cow$$Animal(function(){ })" )

assert("Object#superclass (test 2)",
       "Animalade.superclass()", "Class",
       "Class_Animalade(function(){ });" )

assert("Class#ancestors",
       "Cow.ancestors()", "[Animal, Class]",
       "Class_Animal(function(){;}); \
        Class_Cow$$Animal(function(){;})")


assert( "Class level method inheritance.",
        "Cow.greet('pepe', 'juan')", "'hello pepe juan'",
        "Class_Animal(function(){}, \
                      function self_greet(){ return 'hello ' + arguments[0] + ' ' + arguments[1] }\
                      );\
         Class_Cow$$Animal(function(){;} )" )

assert( "Class level method inheritance.",
        "Cow.greet('pepe', 'juan')", "'hello pepe juan'",
        "Class_Animal(function(){;}, \
                      function self_greet(){ return 'hello ' + arguments[0] + ' ' + arguments[1] }\
                      );\
         Class_Ruminant$$Animal(function(){;} ), \
         Class_Cow$$Ruminant(function(){;} )" )

assert("Super calls a method of the parent class named in the same as way as the caller",
       "cow.legs()", "4",
       "Class_Animal(function(){;}, function legs(){ return 4 } ); \
        Class_Cow$$Animal(function(){;}, function legs(){ return 4 } );\
        cow = new Cow();" )
       
assert("Super calls a method of the parent class named in the same as way as the caller",
       "cow.legs()", "4",
       "Class_Animal(function(){}, function legs(){ return 4 }); \
        Class_Ruminant$$Animal(function(){}, function legs(){ return Super() });\
        Class_Cow$$Ruminant(function(){;}, function legs(){ return Super() });\
        cow = new Cow()" )
        
assert("Super pass all the parameters through by default.",
       "person.greet('coder')", "'Hello coder'",
       "Class_Creature( function(){}, function greet(name){ return 'Hello ' + name} );\
        Class_Person$$Creature( function(){}, function greet(){ return Super() });\
        person = new Person();") 
        
assert("Super doesn't pass the arguments if we override the behavior.",
       "person.greet('coder')", "'Hello girlfriend'",
       "Class_Creature( function(){}, function greet(name){ return 'Hello ' + name} );\
        Class_Person$$Creature( function(){}, function greet(){ return Super('girlfriend') });\
        person = new Person();")         
   
assert("Super works at class level.",
       "Person.greet('coder')", "'Hello coder'",
       "Class_Creature( function(){}, function self_greet(name){ return 'Hello ' + name} );\
        Class_Person$$Creature( function(){}, function self_greet(){ return Super() });") 
    
assert("Super works at class level.",
       "Person.greet('coder')", "'Hello coder'",
       "Class_Creature( function(){}, function self_greet(name){ return 'Hello ' + name} );\
        Class_Human$$Creature( function(){;} );\
        Class_Person$$Human( function(){}, function self_greet(){ return Super() });") 
*/

assert("Before filters are singleton facilities.",
       "a", "true",
       "a = false; function change(){ a = true; }\
        Class_Person(function(name){ this.name = name }, function greet(){ return 'Hi I am ' + this.name } ); \
        me = new Person('Txema');\
        me.add_before_filter('greet', change);\
        me.greet();")


assert("After filters are singleton facilities. (Currently is failing because call_after is after the return statement).",
       "a", "true",
       "a = false; function change(){ a = true; }\
        Class_Person(function(name){ this.name = name }, function greet(){ return 'Hi I am ' + this.name } ); \
        me = new Person('Txema');\
        me.add_after_filter('greet', change);\
        me.greet();" )
/*
assert("After filters are singleton facilities. (Currently is failing because call_after is after the return statement).",
       "a", "true",
       "a = false; function change(){ a = true; }\
        Class_Person(function(name){ this.name = name }, function greet(){ return 'Hi I am ' + this.name } ); \
        me = new Person('Txema');\
        me.add_after_filter('greet', change);\
        me.greet();" )
/*
 * todo: provide an especific include
 *  A module can define initialize and in that case it will be called when the initialize method of a class calls super.
 *  A module can not be instantiated.
 *  A module is a transparent class
 *  To include class methods we usually define a submodule call ClassMethods and we define self.included(receiver) in the module.
 *  module MyLib
 *   def self.included(receiver)
 *      receiver.extend(ClassMethods)
 *   end
 *   module ClassMethods
 *    def class_method
 *      puts "smthg"
 *    end
 *  end
 * end
 * todo: provide especific extend
 *  An object (a class is an object too) can be extended.
 *  extend == self.extend
 * todo: define alias: Copies one method with a new name. (They are different copies)
 * todo: Provide a require
       */
