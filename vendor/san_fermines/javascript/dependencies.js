
$K_app_dependencies = [
	{	module: "Boids", 
		description: "Boids Demo App.", 
		path: "boids/", 
		files: [ 
			{ name: "brain/behavior_modifier.js",  description: "Self protection behaviors." },
			{ name: "brain/behavior.js",           description: "Abstract Behavior." },
			{ name: "brain/security_behavior.js",  description: "Self protection behaviors." },
			{ name: "brain/itinerant_behavior.js", description: "Definition of itinerant behaviors." },
			{ name: "brain/behavior_group.js",     description: "Group of related behaviors." },
			{ name: "brain/brain.js",              description: "Boid Brain." },
			{ name: "world_interface.js",          description: "World Interface." },
			{ name: "boid_editor.js",              description: "Boid panel editor." },
			{ name: "boid.js",                     description: "One Boid." },
			{ name: "world.js",                    description: "The world where all boids live." }	
		]
	},
	{ module: "Game",
	  description: "Main loop",
	  path: "",
	  files: [
	    { name: "lib/bull.js",                     description: "Bull class." },
	    { name: "main.js",                     description: "main function." }
	  ]
    }
]

