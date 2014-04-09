
$K_app_dependencies = [
	{	module: "Boids", 
		description: "Boids Demo App.", 
		path: "", 
		files: [ 
			{ name: "brain/behavior_modifier.js",  description: "Self protection behaviors." },
			{ name: "brain/behavior.js",           description: "Abstract Behavior." },
			{ name: "brain/security_behavior.js",  description: "Self protection behaviors." },
			{ name: "brain/itinerant_behavior.js", description: "Definition of itinerant behaviors." },
			{ name: "brain/avatar_behavior.js",    description: "User controlled Boid." },
			{ name: "brain/behavior_group.js",     description: "Group of related behaviors." },
			{ name: "brain/brain.js",              description: "Boid Brain." },
			{ name: "boid.js",                     description: "One Boid." },
			{ name: "world_interface.js",          description: "World Interface." },
			{ name: "boid_editor.js",              description: "Boid panel editor." },
			{ name: "world.js",                    description: "The world where all boids live." },
			{ name: "main.js",                     description: "main function." }
		]
	},
	{	module: "Interface", 
		description: "Interface tools", 
		path: "interface/", 
		files: [ 
			{ name: "keyboard_control.js", description: "Keyboard Controller." },
			{ name: "game_control.js",      description: "Game controllers" },
			{ name: "button.js",           description: "Button." }
		]
	},
	{	module: "Species", 
		description: "Particularization of the main Boid classes", 
		path: "species/", 
		files: [ 
			{ name: "alignment_behavior.js",  description: "Alignment Behavior." },
			{ name: "sheep.js",               description: "The brain of a sheep." },
		]
	}
]

