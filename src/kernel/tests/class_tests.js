assert( "Class#create_attr. Test 1. A non attribute is undefined.",
        "me.name", "undefined",
        "function Person(){;}; me = new Person(); "
      )

given("A class Person inherited from Class",
      $LLGvn = "\
      alert('Give me a second to load classes.');\
      while (typeof Class == 'undefined');\
      Person.prototype = new Class;\
      Person.prototype.constructor = Person;\
      function Person(){;}; ")

assert( "Class#create_attr. Test 2. Adding an attribute to an object.",
        "me.name", "null",
        "me = new Person(); \
         me.create_attr('name');"
      )

assert( "Class#create_attr. Accepts an initial value.",
        "me.rank", "22",
        "me.create_attr( {rank: 22} );"
      )

assert( "Class#create_attr. It doesn't overlap existing attributes.",
        "me.rank", "22",
        "me.create_attr( { rank: 24 } );"
      )


assert( "Class#attr_reader. Attribute creation with default value.",
        "me.money - me.debts", "40",
        "me.create_attr( { money: 45, debts: 5 } );"
      )

assert( "Class#attr_reader. Attribute creation in a list.",
        "me.honey", "null",
        "me.create_attr( ['at', 'honey', 'doubts'] );"
      )

assert( "Class#attr_reader. Attribute creation.",
        "me.get_name()", "null",
        "me = new Person(); me.attr_reader('name');"
      )

assert( "Class#attr_reader. Attribute creation.",
       "me.getMe()", "null",
        "me = new Person(); me.attr_reader('me');"
      )

assert( "Class#attr_writer. Attribute creation.",
       "me.me", "'john'",
        "me = new Person(); me.attr_writer('me'); me.setMe('john');"
      )

assert( "Class#attr_accessor. Attribute creation.",
       "me.get_name()", "'john'",
        "me = new Person(); me.attr_accessor('name'); me.setName('john');"
      )

assert( "Class#before_filter.",
        "a", "4",
        "a = 2; me = new Person(); \
         Person.prototype.greet = function(){; this.call_before('greet'); a += 1 }; \
         me.add_before_filter('greet', function(){ a++ } ); me.greet();"
      )

