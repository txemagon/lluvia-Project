assert("Scaffolding working",
       "a", "a",
       "a=2;")


assert("ChartNode class exists",
       "a", "0",
       "try {a = 0; \
             new ChartNode();\
        } catch(e) {\
         a = 1;\
        }")

assert("ChartNode simple constructor",
       "a.object.name", "'Raul'",
       "a = new ChartNode({name:'Raul'});"
      )

assert("ChartNode appends a new ChartNode",
       "a.children[0].name", "'Junior'",
       "a = new ChartNode({name:'Raul'});\
        b = new ChartNode({name:'Junior'});\
        a.append(b);"
      )
