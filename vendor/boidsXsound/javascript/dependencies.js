$K_app_dependencies = [
    {
    module: "Brain",
    description: "Behaviors and Brain",
    path: "brain/",
    files: [
	{ name: "behavior_modifier.js",  description: "Self protection behaviors." },
	{ name: "behavior.js",           description: "Abstract Behavior." },
	{ name: "behavior_group.js",     description: "Group of related behaviors." },
	{ name: "security_behavior.js",  description: "Self protection behaviors." },
	{ name: "itinerant_behaviors/seek_behavior.js",            description: "Seek" },
	{ name: "itinerant_behaviors/flee_behavior.js",            description: "Flee" },
	{ name: "itinerant_behaviors/pursue_behavior.js",          description: "Pursue" },
	//{ name: "herd_behaviors/alignment_behavior.js",            description: "Tries to keep the same direction" },
	{ name: "itinerant_behaviors/wander_behavior.js",          description: "Wander" },
	{ name: "itinerant_behaviors/wander_around_behaviour.js",  description: "Wander changing the target." },
	{ name: "itinerant_behaviors/wall_following_behavior.js",  description: "Wall Following" },
	{ name: "itinerant_behaviors/path_following_behavior.js",  description: "Path Following" },
	{ name: "brain.js",              description: "Boid Brain." }
           ]
        },
        {	module: "Boids Application",
            description: "Boids Demo App.",
            path: "",
files: [ 
			{ name: "brain/behavior_modifier.js",  description: "Self protection behaviors." },
			{ name: "brain/behavior.js",           description: "Abstract Behavior." },
			{ name: "brain/security_behavior.js",  description: "Self protection behaviors." },
			{ name: "brain/itinerant_behavior.js", description: "Definition of itinerant behaviors." },
			{ name: "brain/behavior_group.js",     description: "Group of related behaviors." },
			{ name: "brain/brain.js",              description: "Boid Brain." },
			{ name: "world_interface.js",          description: "World Interface." },
			{ name: "boid_editor.js",              description: "Boid panel editor." },
			{ name: "world.js",                    description: "The world where all boids live." },
//			{ name: "face_animation.js",           description: "" },
			{ name: "face_device.js",              description: "" },
			{ name: "face_gate.js",                description: "" },
			{ name: "face_automata_message.js",    description: "" },
			{ name: "face_automata_outline.js",    description: "" },
			{ name: "face_automata_eyes.js",       description: "" },
			{ name: "face_automata_mouth.js",      description: "" },
			{ name: "face_automata_wifi.js",       description: "" },
			{ name: "boid.js",                     description: "One Boid." },
			{ name: "nanobot.js",                  description: "" },
			{ name: "speaker.js",                  description: "" },
			{ name: "main.js",                     description: "main function." },
		]
        }
]
