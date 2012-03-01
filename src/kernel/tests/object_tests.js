given("Given Two classes.",
      $LLGvn = "Class_Person(function(name){ attr_reader('name'); this.name; });\
        ;" )
eval_value($LLGvn)

assert("Object#attr_reader creates the getter function.",
       "", "",
       "")


