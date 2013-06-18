assert( "Module #1. Creating Modules",
        "a", "Module",
        "Module('MyModule'); a = MyModule.constructor"
      )

assert( "Module.constants #1. List of all available constants",
        "list", "['MyModule', 'YourModule']",
        "Module('MyModule'); Module('YourModule'); \
        list = Module.constant_names();"
      )