$K_dependencies = [
      {	module: "loader", 
		description: "lluvia loader. User application loader. Booter.", 
		path: "loader/", 
		files: [ 
		]
	},
	{	module: "utils",
		description: "Uncategorized functionality.",
		path: "utils/",
		files: [
			{name: "ll_Events.js", description: ""},
			{name: "ll_Geometry.js", description: ""},
			{name: "ll_Inheritance.js", description: ""},
			{name: "ll_Physics.js", description: ""},
			{name: "ll_Strings.js", description: ""},
			{name: "ll_Webbrowser.js", description: ""}
		]
	},
	{	module: "kernel", 
		description: "Javascript extensions && global objects.", 
		path: "kernel/", 
		files: [ 
			{name: "ll_Kernel.js",      description: "Core javascript for the global object."},
			{name: "ll_Exception.js",   description: "Exceptions."},
			{name: "ll_Object.js",      description: "Redefinition of Object class."},
			{name: "ll_Enumeration.js", description: "Define Enumerations."},
			{name: "ll_Number.js",      description: "Something for Numbers."},
			{name: "ll_Function.js",    description: "Adds functionality to objects (classes, functions, etc)."},
			{name: "ll_Delegate.js",    description: "Adds Class delegation"},
			{name: "ll_BasicObject.js", description: "Plain Object without keys."},
			{name: "ll_Hash.js",        description: "Hash class."},
			{name: "ll_String.js",      description: "String addons."},
			{name: "ll_Array.js",       description: "Adds functionality to arrays."},
			{name: "ll_Set.js",         description: "Adds functionality for sets."},
			{name: "ll_Module.js",      description: "Redefinition of Module class."},
			{name: "ll_Class.js",       description: "Redefinition of Class class."},
			{name: "ll_Processor.js",   description: "Manage multiple threads."}
		]
	},
	{   module: "engine",
		description: "Event and execution control.",
		path: "engine/",
		files: [
			{name: "ll_Device.js", description: "App thread with queue mechanism"},
			{name: "ll_EventDispatcher.js", description: "Event dispatcher."},
			{name: "ll_Gate.js", description: "HTML mapping in lluvia."},
			{name: "ll_Lookup.js", description: ""},
			{name: "ll_MessageEvent.js", description: "Message generator."}
		]
	},
	{   module: "browser",
		description: "Utilitis for communicating with the browser.",
		path: "browser/",
		files: [
			{name: "ll_HTMLElement.js",      description: "Handle HTML Elements."},
			{name: "ll_Logger.js",           description: "Event Logger."},
			{name: "ll_BrowserFeatures.js",  description: "Extract sorme features from the client Browser"},
			{name: "ll_CodeBlockFinder.js",  description: "Pushdown Automaton for finding code blocks"},
			{name: "ll_JavascriptSource.js", description: "Reading Javascript Files"}
		]
	},
        {	module: "Mathematics", 
		description: "Mathematics Types.", 
		path: "Mathematics/", 
		files: [ 
			{name: "ll_Expression.js",   description: "Physics Vectors."},
			{name: "ll_func.js",   description: "Physics Vectors."},
			{name: "Geometry/ll_Vector.js",   description: "Physics Vectors."}
		]
	}

]

