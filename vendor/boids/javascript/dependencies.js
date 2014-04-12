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
	{ name: "itinerant_behaviors/pursue_behavior.js",            description: "Pursue" },
	{ name: "itinerant_behaviors/wander_behavior.js",          description: "Wander" },
	{ name: "itinerant_behaviors/wander_around_behaviour.js",  description: "Wander changing the target." },
	{ name: "itinerant_behaviors/wall_folloging_behavior.js",  description: "Wall Following" },
	{ name: "itinerant_behaviors/path_following_behavior.js",  description: "Path Following" },
	{ name: "brain.js",              description: "Boid Brain." }
           ]
        },
        {	module: "Boids Application",
            description: "Boids Demo App.",
            path: "",
            files: [
        	{ name: "boid.js",               description: "One Boid." },
        	{ name: "world_interface.js",          description: "World Interface." },
        	{ name: "boid_editor.js",              description: "Boid panel editor." },
        	{ name: "world.js",                    description: "The world where all boids live." },
        	{ name: "main.js",                     description: "main function." }
                   ]
        }
]

