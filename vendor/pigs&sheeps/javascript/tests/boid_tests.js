
assert("There is an object representing the Boid's",
       "exists", "'Yes'",
       "exists = 'Yes'; try{ new Boid();} catch(err){ exists = 'No';}" )

assert("New Boids are placed in (0,0).",
       "b.position()", "[0,0]",
       "b = new Boid();")

assert("The boid changes its position.",
       "b.position()", "[2, 0]",
       "b = new Boid( { position: new Vector(0,0), \
                        velocity: new Vector(2,0), \
                        acceleration: new Vector(0,0)\
                       }); \
        w = new World(); \
        w.has_born(b); \
        w.is_one_second_from_begining()")

given("Given a Boid and a target in the world.",
      $LLGvn = "w = new World(); \
        t = new Boid( { position: new Vector(2, 3), \
                                  velocity: new Vector(0, 0), \
                                  acceleration: new Vector(0, 0) });\
        b = new Boid( { position: new Vector(1, 1), \
                                  velocity: new Vector(1, 1), \
                                  acceleration: new Vector(10, 10) });\
        b.force_limits.thrust = 2;\
        b.brain.get_behavior('seek').set_target(t);\
        w.has_born(b, t);" )

eval($LLGvn)

assert("We can get the heading (1).",
       "b.heading().angle(b.velocity())", "0",
       "")

assert("We can get the heading (2).",
       "b.heading().module()", "1",
       "")

assert("Getting the intrinsic components of a vector.",
       "b.localize(1,-1)", "[0, -Math.SQRT2]",
       "")
       
assert("Translate to the global cs.",
       "b.globalize(0, -Math.SQRT2)", "[1,-1]",
       "")

assert("Clip the thrust.",
       "b.clip(b.acceleration())", "[Math.SQRT2, Math.SQRT2]",
       "")

given ("Given two boids within the visible area.",
       $LLGvn = "w = new World();\
       a = new Boid( { position: new Vector(1, 10), \
                                  velocity: new Vector(0, 0),\
                                  acceleration: new Vector(0, 0) });\
       a.vision = 100; \
       b = new Boid( { position: new Vector(70, 10), \
                                 velocity: new Vector(0, 0),\
                                 acceleration: new Vector(0, 0) });\
       b.vision = 100; \
       w.has_born(a);\
       w.has_born(b);" )

eval($LLGvn)
       
assert("When two boids in the visible area the can see one to each other.",
       "b.visible_objects().include$U(a)", "true",
       "")

assert("When two boids are not in the visible area the can't see one to each other.",
       "b.visible_objects().include$U(a)", "false",
       "b.vision = 50")

given ("Given a boid and a target.",
       $LLGvn = "w = new World();\
       b = new Boid( { position: new Vector(1, 10), \
                                  velocity: new Vector(0, 0),\
                                  acceleration: new Vector(0, 0) });\
       t = new Boid( { position: new Vector(70, 10), \
                                 velocity: new Vector(0, 0),\
                                 acceleration: new Vector(0, 0) });\
       b.brain.get_behavior('seek').set_target(t); \
       w.has_born(t);\
       w.has_born(b);" )

eval($LLGvn)

assert("When one boid is in seek beehavior, it changes his desired acceleration",
       "b.brain.desired_acceleration()", "new Vector(b.vel_max, 0)",
       "b.brain.activate('seek');" )
       
assert("But, unfortunately, real acceleration and desired one are different things",
       "b.requested_acceleration()", "new Vector(b.force_limits.thrust, 0)",
       "" )
