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
       "a = new ChartNode({name:'Raul'});" )

assert("ChartNode appends a new ChartNode",
       "a.children[0].object.name", "'Junior'",
       "a = new ChartNode({name:'Raul'});\
        b = new ChartNode({name:'Junior'});\
        a.append(b);"
      )

assert("ChartNode appends some different from a ChartNode",
       "a.children[0].object.name", "'Junior'",
       "a = new ChartNode({name:'Raul'});\
        a.append({name:'Junior'});"
      )

assert("ChartNode appends an Array of ChartNodes",
       "a.children[1].object.name", "'Padre2'",
       "a = new ChartNode({name:'Abuelo'});\
        b = new ChartNode({name:'Padre1'});\
        c = new ChartNode({name:'Padre2'});\
        a.append([[b], [c]]);"
      )

assert("ChartNode appends an Array of ChartNodes",
       "a.children[1].object.name", "'Padre2'",
       "a = new ChartNode({name:'Abuelo'});\
        b = new ChartNode({name:'Padre1'});\
        c = new ChartNode({name:'Padre2'});\
        a.append([b, c]);"
      )


assert("ChartNode appends an Array of ChartNodes",
       "a.children[1].children[0].object.name", "'Hijo1-P2'",
       "a = new ChartNode({name:'Abuelo'});\
        b = new ChartNode({name:'Padre1'});\
        c = new ChartNode({name:'Padre2'});\
        d = new ChartNode({name:'Hijo1-P1'});\
        e = new ChartNode({name:'Hijo2-P1'});\
        f = new ChartNode({name:'Hijo1-P2'});\
        a.append([[b, [d, e]], [c, [f]]]);"
      )

assert("ChartNode appends an Array of ChartNodes",
       "a.children[0].children[1].object.name", "'Hijo2-P1'",
       "a = new ChartNode({name:'Abuelo'});\
        b = new ChartNode({name:'Padre1'});\
        c = new ChartNode({name:'Padre2'});\
        d = new ChartNode({name:'Hijo1-P1'});\
        e = new ChartNode({name:'Hijo2-P1'});\
        f = new ChartNode({name:'Hijo1-P2'});\
        a.append([[b, [d, e]], [c, [f]]]);"
      )

assert("ChartNode appends an Array of whatever",
       "a.children[0].children[1].object.name", "'Hijo2-P1'",
       "a = new ChartNode({name:'Abuelo'});\
        a.append([[{name:'Padre1'}, [{name:'Hijo1-P1'}, {name:'Hijo2-P1'}]], [{name:'Padre2'}, [{name:'Hijo1-P2'}]]]);"
      )

given("Given a bunch of branches.",
      $LLGvn = "a = new ChartNode({name:'Abuelo'});\
        b = new ChartNode({name:'Padre1'});\
        c = new ChartNode({name:'Padre2'});\
        d = new ChartNode({name:'Hijo1-P1'});\
        e = new ChartNode({name:'Hijo2-P1'});\
        f = new ChartNode({name:'Hijo1-P2'});\
        a.append([[b, [d, e]], [c, [f]]]);" )
eval($LLGvn)

assert("ChartNode#first",
       "first.object.name", "'Padre1'",
       "first = a.first()" )

assert("ChartNode#last",
       "last.object.name", "'Padre2'",
       "last = a.last()" )

assert("ChartNode#find",
       "child", "b",
       "child = a.find(b)")

assert("ChartNode#has$U",
       "a.has$U(b)", "true",
       ";")


assert("ChartNode#has$U",
       "a.has$U(e)", "false",
       ";")


assert("ChartNode#has$U",
       "a.has$U(e, true)", "true",
       ";")

assert("ChartNode#has$U Are there any false positives?",
       "b.has$U(f, true)", "false",
       ";")

assert("ChartNode#detach",
       "a.has$U(b)", "false",
       "a.detach(b)")

assert("ChartNode#first and ChartNode#last",
       "a.first().object.name", "'Padre2'",
       "a.first(a.last())" )

