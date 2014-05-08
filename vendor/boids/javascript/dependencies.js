$K_app_dependencies = [
    {
    module: "Brain",
    description: "Behaviors and Brain",
    path: "brain/",
    files: [
	{ name: "behavior_modifier.js",  description: "Self protection behaviors." },
	{ name: "behavior.js",           description: "Abstract Behavior." },
	{ name: "behavior_group.js",     description: "Group of related behaviors." },
	//{ name: "security_behavior.js",  description: "Self protection behaviors." },
	{ name: "herd_behaviors/separation_behavior.js",           description: "Separation" },
	{ name: "herd_behaviors/alignment_behavior.js",            description: "Separation" },
	{ name: "itinerant_behaviors/seek_behavior.js",            description: "Alignment" },
	{ name: "itinerant_behaviors/cohesion_behavior.js",        description: "Cohesion" },
	{ name: "itinerant_behaviors/flee_behavior.js",            description: "Flee" },
	{ name: "itinerant_behaviors/pursue_behavior.js",          description: "Pursue" },
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
        	{ name: "boid.js",                     description: "One Boid." },
        	{ name: "boid/draw/seek.js",           description: "SeekBehavior Drawing." },
        	{ name: "boid/draw/flee.js",           description: "FleeBehavior Drawing." },
        	{ name: "boid/draw/pursue.js",         description: "PursueBehavior Drawing." },
        	{ name: "boid/draw/wander.js",         description: "WanderBehavior Drawing." },
        	{ name: "boid/draw/brain.js",          description: "Behavior Drawing." },
        	{ name: "boid/draw/draw.js",           description: "General Drawing." },
        	{ name: "world_interface.js",          description: "World Interface." },
        	{ name: "boid_editor.js",              description: "Boid panel editor." },
        	{ name: "world.js",                    description: "The world where all boids live." },
        	{ name: "main.js",                     description: "main function." }
                   ]
        }
]

