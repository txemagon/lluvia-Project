assert("Only \"set\" or \"list\" group of behaviors are admitted (negative match)",
       "e", "1",
       "e = 0; try{; \
       new BehaviorGroup(\"invalid\");\
       } catch (err){; e=1;\
       };")
       
assert("Only \"set\" or \"list\" group of behaviors are admitted (positive match)",
       "e", "0",
       "e = 0; try{; \
       new BehaviorGroup(\"Set\");\
       } catch (err){; e=1;\
       };")
       
given("Given a set of Behaviors.",
      $LLGvn = "set = new BehaviorSet({ none:{}, seek: {}, flee: {}});" )
eval($LLGvn)
             
assert( "We can activate a Behavior",
        "set.active_behavior()", "'seek'",
        "set.activate('seek');" )       

assert( "We can check whether a behavior is active or not",
        "set.is_active$U('flee')", "true",
        "set.activate('flee');" )

assert( "We can check whether a behavior is active or not",
        "set.is_active$U('seek')", "false",
        "set.activate('flee');" )
        
given("Given a list of Behaviors.",
      $LLGvn = "list = new BehaviorList({ none:{}, seek: {}, flee: {}});" )
eval($LLGvn)

assert( "We can activate a Behavior",
        "list.active_behavior().include$U('seek')", "true",
        "list.activate('seek');" )

assert( "We can activate several behaviors",
        "list.active_behaviors()", "['seek', 'flee']",
        "list.activate('seek', 'flee');" )

assert( "We can activate several behaviors",
        "list.active_behaviors()", "['seek', 'flee']",
        "list.activate(['seek', 'flee']);" )

assert( "We can check whether a behavior is active or not",
        "list.is_active$U('flee')", "true",
        "list.activate('flee');" )

assert( "We can check whether a previous behavior is still active or not",
        "list.is_active$U('seek')", "true",
        "list.activate('flee');" )

assert( "We can deactivate a Behavior",
        "list.active_behavior().include$U('seek')", "false",
        "list.deactivate('seek');" )

assert( "We can deactivate twice a behavior",
        "list.is_active$U('seek')", "false",
        "list.deactivate('seek');" )

        
given("Given a list of Behaviors.",
      $LLGvn = "list = new BehaviorList({ none:{}, \
                                          seek: {}, \
                                          flee: {} \
                                        }); \
                 list.activate('seek', 'flee'); " )
eval($LLGvn)

assert( "We can reset all active behaviors to a given one",
        "list.is_active$U('seek')", "true",
        "list.reset_to('seek');" )

assert( "We can reset all active behaviors to a given one",
        "list.is_active$U('seek')", "false",
        "list.reset_to('flee');" )        
        
assert( "We can activate twice a behavior",
        "list.is_active$U('seek')", "false",
        "list.deactivate('seek');" )
        
given("Given a set of Behaviors with modifiers.",
      $LLGvn = "set = new BehaviorSet({ none:{}, seek: (b = new SeekBehavior(null, null, ['arrival', 'before'])), flee: new FleeBehavior() } );" )
eval($LLGvn)

assert("We can get a particular Behavior",
       "set.get_behavior('seek')", "b",
       "" )
       
assert("We can activate a behavior modifier",
       "set.get_behavior('seek').is_modified_by$U('arrival');", "true", 
       "set.activate_modifier('arrival<seek'); " )

assert("We can activate a behavior modifier",
       "set.get_behavior('seek').is_modified_by$U('before')", "true",
       "set.activate_modifier('before<seek')" )

given("Given a set of Behaviors with modifiers.",
      $LLGvn = "set = new BehaviorSet({ none:{}, seek: (b = new SeekBehavior(null, null, ['arrival'], ['after', 'before'])), flee: new FleeBehavior() } );" )
eval($LLGvn)


assert("We can activate a behavior modifier",
       "set.get_behavior('seek').is_modified_by$U('before') && \
        set.get_behavior('seek').is_modified_by$U('after')", "true",
       "set.activate_modifier('seek>before>after')" )

assert("We can activate a behavior modifier",
       "set.get_behavior('seek').is_modified_by$U('before') && \
        set.get_behavior('seek').is_modified_by$U('after')", "true", 
       "set.activate_modifier('seek> after > before')" )       

