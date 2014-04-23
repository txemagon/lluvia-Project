
$K_app_dependencies = [

	{	module: "people_animations",
		description: "Data module providing animation features stored in a json file",
		path: "../images/people/",
		files: [
			{name: "animations.json",   description: "People walking, sizes and directions"}
		]
	},

	{	module: "DHTMLClasses",
		description: "Specific DHTML Classes",
		path: "DHTMLClasses/",
		files: [
			{name: "Godman.js",    description: "Building Gate Effects"},
			{name: "Edificios.js", description: "People device handler"}
		]
	},

	{	module: "sunny",
		description: "External application defined by third party (lluvia client, not lluvia user)",
		path: "",
		files: [
			{name: "Home.js",                description: "Home Page Application Device"},
			{name: "ll_App.js",              description: "Normal Application Device"},
			{name: "Fondo.js",               description: "App Device Group"},
			{name: "ControlPanel.js",        description: "Global Menu Device"},
			{name: "application.js",         description: "Application boot functions"}
		]
	}
]
