$K_lluviaServer = ""

$K_dependencies = [
	{	module: "helpers", 
		description: "Unstructured, but pretty interesting code", 
		path: "lluvia/helpers/", 
		files: [ 
			{name: "ll_Events.js",     description: "Event broadcasting mechanism: software and HTML event management"},
			{name: "ll_Geometry.js",   description: "Basic geometric classes (soon deprecated)"},
			{name: "ll_Inheritance.js",description: "Inheritance for non lluvia classes"},
			{name: "ll_Physics.js",    description: "Some dinamic test models"},
			{name: "ll_Strings.js",    description: "String helpers. Something like escaping urls"},
			{name: "ll_Webbrowser.js", description: "Mouse and keyboard browser indepent events"}
		]
	},
	{	module: "kernel", 
		description: "javascript extensions && global objects", 
		path: "lluvia/core/", 
		files: [ 
			{name: "ll_Kernel.js",     description: "Core javascript for the global object"},
			{name: "ll_Object.js",     description: "Redefinition of Object class"},
			{name: "ll_Function.js",   description: "Adds functionality to objects(classes, functions, etc"},
			{name: "ll_Array.js",      description: "Adds functionality to js Arrays"},	
			{name: "ll_Module.js",     description: "Redefinition of Module class"},
			{name: "ll_Class.js",      description: "Redefinition of Class class"},
			{name: "ll_Processor.js",  description: "Thread manager class"},
			{name: "ll_Enumeration.js",description: "Enumerations like object factory" }
		]
	},
	{	module: "engine", 
		description: "javascript application mechanisms", 
		path: "lluvia/engine/", 
		files: [ 
			{name: "ll_MessageEvent.js", 	description: "Application events"},
			{name: "ll_Lookup.js",   	 	description: "Communication mechanism between applications "},
			{name: "ll_EventDispatcher.js", description: "Message sender and receiver"},
			{name: "ll_Gate.js",			description: "Event to Message adapter"},
			{name: "ll_Device.js",   		description: "Core of lluvia Applications"}
		]
	},
	{	module: "people_animations", 
		description: "Data module providing animation features stored in a json file", 
		path: "images/people/", 
		files: [ 
			{name: "animations.json",   description: "People walking, sizes and directions"}
		]
	},
	{	module: "DHTMLClasses", 
		description: "Specific DHTML Classes", 
		path: "javascript/DHTMLClasses/", 
		files: [ 
			{name: "Godman.js",    description: "Building Gate Effects"},
			{name: "Edificios.js", description: "People device handler"}
		]
	},
	{	module: "sunny", 
		description: "External application defined by third party (lluvia client, not lluvia user)", 
		path: "javascript/", 
		files: [ 
			{name: "Home.js",                description: "Home Page Application Device"},
			{name: "ll_App.js",              description: "Normal Application Device"},
			{name: "Fondo.js",               description: "App Device Group"},
			{name: "ControlPanel.js",        description: "Global Menu Device"},
			{name: "application.js",         description: "Application boot functions"}
		]
	}
]

