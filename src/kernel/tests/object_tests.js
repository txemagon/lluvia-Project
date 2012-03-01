assert("Object#attr_reader creates the getter function.",
       "me.get_name()" , "'Txema'",
       "Class_Person(function(name){ this.name = name; this.attr_reader('name');  }); me = new Person('Txema')")

assert("Object#attr_writer creates the setter function.",
       "me.name" , "'Juan'",
       "Class_Person(function(name){ this.name = name; this.attr_writer('name');  }); me = new Person('Txema'); me.set_name('Juan')")

assert("Object#attr_accessor creates the setter and the getter functions.",
       "me.get_name()" , "'Juan'",
       "Class_Person(function(name){ this.name = name; this.attr_accessor('name');  }); me = new Person('Txema'); me.set_name('Juan')")


