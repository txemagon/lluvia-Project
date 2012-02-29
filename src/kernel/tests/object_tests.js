given("Given Two classes.",
      $LLGvn = "Class_Person(function(name){ attr_reader('name'); this.name; });\
        ;" )
eval($LLGvn)

assert("Object#attr_reader creates the getter function.",
       "", "",
       "")


