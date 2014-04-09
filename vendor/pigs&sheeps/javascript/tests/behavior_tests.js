assert("Behavior can decompose a name in before and after modifiers",
       "Behavior.decompose_name('seek')", "[[], 'seek', []]",
       "")
       
assert("Behavior can decompose a name in before and after modifiers with before&lt;seek&gt;after (not seen in the screen)",
       "Behavior.decompose_name('before<seek>after')", "[['before'], 'seek', ['after']]",
       "")
       
assert("Behavior decompose before  &lt;  seek&gt;  after (not seen in the screen)",
       "Behavior.decompose_name('before  <  seek  >  after')", "[['before'], 'seek', ['after']]",
       "")              
       
assert("We can create a Behavior with a before modifier",
       "b.before[0] instanceof ArrivalBehaviorModifier", "true",
       "b = new SeekBehavior(null, null, 'arrival')")

assert("We can create a Behavior with a before modifier",
       "b.before[1] instanceof ArrivalBehaviorModifier", "false",
       "b = new SeekBehavior(null, null, 'arrival')")
              
assert("We can create a Behavior with several before modifiers",
       "b.before[1] instanceof ArrivalBehaviorModifier", "true",
       "b = new SeekBehavior(null, null, ['arrival', 'arrival'] )")
       
assert("Default desired acceleration in 0 vector",
       "b.desired_acceleration()", "new Vector(0,0)",
       "b = new Behavior()" )
       

given("Given a Behavior with modifier.",
      $LLGvn = "seek = new SeekBehavior(null, null, 'arrival');" )
eval($LLGvn)

assert("Modifiers are not active by default",
       "seek.is_premodified_by$U('arrival')", "false", 
       "" )       
       
assert("We can activate a behavior modifier",
       "seek.is_premodified_by$U('arrival')", "true", 
       "seek.activate_modifier('arrival');" )       
       
assert("We can check post modifiers",
       "seek.is_postmodified_by$U('arrival')", "false", 
       "" )              
       
given("Given a Behavior with modifier.",
      $LLGvn = "seek = new SeekBehavior(null, null, 'before', 'after');" )
eval($LLGvn)

assert("We can check modifiers wherever they are (pre)",
       "seek.is_modified_by$U('before')", "true", 
       "seek.activate_modifier('before')" )

assert("We can check modifiers wherever they are (post)",
       "seek.is_modified_by$U('after')", "true", 
       "seek.activate_modifier('after')" )

assert("We can deactivate an existing behavior modifier",
       "seek.is_modified_by$U('after')", "false", 
       "seek.deactivate_modifier('after');" )
       
assert("We can deactivate a non existing behavior modifier",
       "seek.is_modified_by$U('after_all')", "false", 
       "seek.deactivate_modifier('after_all');" )       
