assert("The brain can flee",
       "b.can$U('flee')", "true",
       "b = new Brain();" )

assert("The brain can not fly",
       "b.can$U('fly')", "false",
       "b = new Brain();" )

assert("The brain can avoid obstacles",
       "b.can_be_in$U('obstacle avoidance')", "true",
       "b = new Brain();" )

given ("Given a brain that has seeked, and now is currently fleeing and avoiding obstacles.",
       $LLGvn = "brain = new Brain();\
       brain.activate('seek');\
       brain.activate('flee');\
       brain.activate('obstacle avoidance');\
       " )

eval($LLGvn)

assert("The brain is not in arrival",
       "brain.is_in$U('arrival')", "false",
       "" )

assert("The brain is not in seek (as long as seek and flee are part of the same set)",
       "brain.is_in$U('seek')", "false",
       "" )

assert("The brain is in flee",
       "brain.is_in$U('flee')", "true",
       "" )

assert("The brain is in flee",
       "brain.is_in$U('obstacle avoidance')", "true",
       "" )

assert("There is a list of active behaviors",
       "brain.active_behaviors()", "['flee', 'obstacle avoidance']",
       "");

assert("The brain gives a desired acceleration for each active state",
       "brain.desired_accelerations().self_keys()", "['none', 'flee', 'obstacle avoidance']",
       "")
              
given ("Given a brain that has seeked, and now is currently fleeing and avoiding obstacles.",
       $LLGvn = "brain = new Brain();" )

       
eval($LLGvn)       


assert("The brain has a default 0 vector desired acceleration",
       "brain.desired_acceleration()", "new Vector(0,0)",
       "")
