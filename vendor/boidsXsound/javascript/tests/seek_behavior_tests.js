given ("Given a plain Boid with seek behavior activated.",
       $LLGvn = "boid = new Boid(); boid.brain.activate('seek');" )
       
eval($LLGvn)       

assert( "We get an error unless we have a target.",
        "a", "'SeekBehavior Disabled. Still no target.'",
        "a = 0; try{; boid.brain.get_behavior('seek').get_target(); } catch(err){; a = err; }" )

given ("Given two boids.",
       $LLGvn = "target = new Boid(); \
       boid1 = new Boid(); \
       boid.brain.activate('seek');" )
        
eval($LLGvn)
        
assert( "We can set and get target position",
        "boid.brain.get_behavior('seek').get_target()", "target.geo_data",
        "boid.brain.get_behavior('seek').set_target(target)" )        

given("Given a Boid and a target in the world.",
      $LLGvn = "w = new World(); \
        t = new Boid( { position: new Vector(2, 3), \
                                  velocity: new Vector(0, 0), \
                                  acceleration: new Vector(0, 0) });\
        b = new Boid( { position: new Vector(1, 1), \
                                  velocity: new Vector(0, 0), \
                                  acceleration: new Vector(0, 0) });\
        b.brain.get_behavior('seek').set_target(t);\
        w.has_born(b, t);" )

eval($LLGvn)

assert("The boid can get the current target.",
       "b.brain.get_behavior('seek').target_data().position", "new Vector(2,3)",
       "")                                  
       
assert("The boid can be asked about the target relative position.",
       "b.brain.get_behavior('seek').target_at()", "new Vector(1,2)",
       "")
/* Arrival behavior modifier 
assert("The boid can be asked about its desired velocity.(1)",
       "b.desired_velocity().module()", "b.vel_max * b.target_at().module() / b.approach_distance",
       "")       
*/

assert("The boid can be asked about its desired velocity.(2)",
       "b.brain.get_behavior('seek').target_at().uVector", "b.brain.get_behavior('seek').desired_velocity().uVector", 
       "")              

assert("The boid requests an acceleration.",
       "diff", "b.brain.get_behavior('seek').desired_acceleration()",
       "diff = b.brain.get_behavior('seek').desired_velocity().subs(b.velocity())")




