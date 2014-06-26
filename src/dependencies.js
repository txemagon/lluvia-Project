$K_package = {
  	package: "lluvia",
        description: "lluvia loader. User application loader. Booter.",
	path: "/",
	files: [
		]
      requires: ["loader"],
      provides: ["utils", "kernel", "engine", "browser", "mathematics"],
      offers:   []
}

$K_dependencies = [
      {	package: "loader",
		description: "lluvia loader. User application loader. Booter.",
		path: "loader/",
		files: [
		]
	},
	{	package: "utils",
		description: "Uncategorized functionality.",
		path: "utils/",
		files: [
			{name: "ll_Events.js",      description: ""},
			{name: "ll_Geometry.js",    description: ""},
			{name: "ll_Inheritance.js", description: ""},
			{name: "ll_Physics.js",     description: ""},
			{name: "ll_Strings.js",     description: ""},
			{name: "ll_Webbrowser.js",  description: ""}
		]
	},
       llPackage("kernel", "engine"),
	{   package: "browser",
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
        {	package: "Mathematics",
		description: "Mathematics Types.",
		path: "Mathematics/",
		files: [
			{name: "ll_Expression.js",           description: "Physics Vectors."},
			{name: "ll_func.js",                 description: "Physics Vectors."},
			{name: "Geometry/ll_Vector.js",      description: "Physics Vectors."},
			{name: "Geometry/ll_FixedVector.js",   description: "Fixed Vectors."}
		]
	}

]

