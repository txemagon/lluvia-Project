given("Given Two classes.",
      $LLGvn = "Father.prototype.constructor = Father; \
        function Father(){ ;\
          this.a = 2; \
        }; \
        ; \
        Child.prototype = new Father; \
        Child.prototype.constructor = Child; \
        function Child(){ ;\
          this.b=3; \
          this.a=1; \
        }; \
        ;" )
eval($LLGvn)

assert("A class extends another in the old way", 
       "c instanceof Father", "true",
        "c = new Child();")
        

given("Given Two separate classes.",
      $LLGvn = "Father.prototype.constructor = Father; \
        function Father(){ ;\
          this.a = 2; \
          this.b = 3; \
        }; \
        ; \
        Child.prototype.constructor = Child; \
        function Child(){ ;\
          this.b=1; \
          this.c=1; \
        }; \
        ;" )
eval($LLGvn)

assert( "A class can be extended.",
        "c.a", "2",
        "Child.extend(Father); c = new Child()" )
        
assert( "A class shall be extended with love.",
        "c.b", "1",
        "Child.extend(Father); c = new Child()" )


given("Given Two separate classes.",
      $LLGvn = "Fa.prototype.constructor = Fa; \
        function Fa(){ ;\
          this.a = 2; \
          this.b = 3; \
        }; \
        ; \
        Ch.prototype.constructor = Ch; \
        function Ch(){ ;\
          this.b=1; \
          this.c=1; \
        }; \
        ;" )

eval($LLGvn)
        
assert( "A class shall be extended with backpropagation.",
        "c.a", "2",
        "c = new Ch(); Ch.extend(Fa)" )
        


given("Given Two separate classes.",
      $LLGvn = "Father.prototype.constructor = Father; \
      Father.prototype.Class = {};\
        function Father(){ ;\
          this.a = 2; \
          this.b = 3; \
        }; \
        ; \
        Father.prototype.Class.before_extend = function(){; \
          alert('Preparing to extend'); \
          }; \
        Father.prototype.Class.after_extend = function(){; \
          alert('Extension Finish'); \
          }; \
        Child.prototype.constructor = Child; \
        function Child(){ ;\
          this.b=1; \
          this.c=1; \
        }; \
        ;" )
eval($LLGvn)                
        
/*
assert("A class can include another class or module", 
       "c instanceof Father", "true",
        "Child.include(Father); c = new Child();")

given("Given Two separate classes.",
      $LLGvn = "Father1.prototype.constructor = Father1; \
        function Father1(){ ;\
          this.a = 2; \
        }; \
        ; \
        Child1.prototype = new Father1; \
        Child1.prototype.super = Father1; \
        Child1.prototype.constructor = Child1; \
        function Child1(){ ;\
          this.b=3; \
          this.a=1; \
        }; \
        ;\
        Father2.prototype.constructor = Father2; \
        function Father2(){ ;\
          this.a = 2; \
        }; \
        ; \
        Child2.prototype = new Father2; \
        Child2.prototype.super = Father2; \
        Child2.prototype.constructor = Child2; \
        function Child2(){ ;\
          this.b=3; \
          this.a=1; \
        }; \
        ; \
        WhiteClass.prototype = new Child2; \
        WhiteClass.prototype.super = Child2; \
        WhiteClass.prototype.constructor = WhiteClass; \
        function WhiteClass(){;\
          this.a = 3; \
        }; \
        ;\
        WhiteClass.include(Child1); \
        ;" )
eval($LLGvn)

               
assert("Including takes the prototype chain into account.", 
       "w instanceof Father1", "true",
       "w = new WhiteClass();")       
               
assert("Including takes the prototype chain into account.", 
       "w instanceof Child1", "true",
       "w = new WhiteClass();")       

assert("Including takes the prototype chain into account.", 
       "w instanceof Father2", "true",
       "w = new WhiteClass();")
*/               
