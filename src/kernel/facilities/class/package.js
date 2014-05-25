$K_dependencies = [
	{	package: "Class",
		description: "lluvia facilites for creating classes.",
		path: "class/",
		files: [
			{name: "ll_Class.js",                 description: "Base class for all classes."},
			{name: "ll_ClassFactory.js",          description: "Utility for automating class creation."},
			{name: "ll_Delegate.js",              description: "Delegator class. Creates a wrapper over an existing class."},
			{name: "ll_ProxyConstructor.js",      description: "Delegator and constructor forwarding."},
			{name: "ll_ApplyProxyConstructor.js", description: "Delegator and constructor forwarding with an Array of arguments."}
		]
	},
	llPackage("class")
]

