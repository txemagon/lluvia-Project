/**
 * @classDescription Creates a Behavior
 *
 * @return {Behavior}
 * @constructor
*/

function Behavior( brain, body, before_modifier, after_modifier ){
  var that = this
  this.before =  []
  this.after  =  []
  this.brain
  this.me
  before_modifier = before_modifier || false
  after_modifier  = after_modifier  || false


  function initialize(){
            that.brain = brain || null
      if (body)
        that.me = body
       
      if (typeof(before_modifier) === "string")
          before_modifier = [before_modifier]
      if (typeof(after_modifier) === "string")
          after_modifier = [after_modifier]
      if (before_modifier && ( before_modifier instanceof Array) )
        before_modifier.each( function(el){
              var m = eval("new " + el.class_name().capitalize() + "BehaviorModifier(that)")
              m.freeze()
              that.before.push( m )
        })
      if ( after_modifier && (after_modifier instanceof Array))
        after_modifier.each( function(el){
              var m = eval("new " + el.class_name().capitalize() + "BehaviorModifier(that)")
              m.freeze()
              that.after.push( m )
        })
  }
   if (arguments.length)
     initialize()
}

Behavior.type_of = function(b_name){
  return eval(b_name.class_name() + "Behavior")
}

Behavior.prototype.is_a$U = function(b_name){
  b_name = Behavior.decompose_name(b_name)[1]
  try{
    return this instanceof Behavior.type_of(b_name)
  } catch(err){
    return false
  }
}

Behavior.prototype.desired_acceleration = function(){
  return new Vector(0, 0);
}

Behavior.prototype.is_premodified_by$U = function(mod_name){
  return this.before.inject(false, function(modifier, modified){
    return modified ||  (modifier.is_a$U(mod_name) ? !modifier.frozen$U() : false)
  })
}

Behavior.prototype.is_postmodified_by$U = function(mod_name){
  return this.after.inject(false, function(modifier, modified){
    return modified ||  (modifier.is_a$U(mod_name) ? !modifier.frozen$U() : false)
  })
}

Behavior.prototype.is_modified_by$U = function(mod_name){
  return this.is_premodified_by$U(mod_name) || this.is_postmodified_by$U(mod_name)
}

Behavior.prototype.get_modifiers_for = function(scope){
  var ary = []
  scope = scope || Behavior.Scope.ALL
  
  if (scope != Behavior.Scope.POST)
    ary = ary.merge(this.before)
  if (scope != Behavior.Scope.PRE)
    ary = ary.merge(this.after)
    
  return ary
}

Behavior.prototype.active_modifiers = function(scope){
  return this.get_modifiers_for(Behavior.Scope.ALL)
}
Behavior.prototype.activate_modifier = function(mod_name, scope){
  this.get_modifiers_for(scope).each(function(el){
    if (el.is_a$U(mod_name))
      el.unfreeze()
  })  
}
Behavior.prototype.get_modifier = function (mod_name, scope){
    var requested_modifier = null
    return this.get_modifiers_for(scope).inject(requested_modifier, function(mod, rq){
        return mod.is_a$U(mod_name) ? mod : rq
    })
}

Behavior.prototype.deactivate_modifier = function(mod_name, scope){
  this.get_modifiers_for(scope).each(function(el){
    if (el.is_a$U(mod_name))
      el.freeze()
  })  
}


Behavior.decompose_name = function(behavior){
  var pre_state = behavior.match(/\s*([^<]+)/g)
  behavior = pre_state.pop()

  var post_state = behavior.match(/([^>]+)/g)
  behavior = post_state.shift()

  return [pre_state.strip_all(), behavior.strip(), post_state.strip_all()]
}

Behavior.Scope = Enumeration("PRE", "POST", "ALL")

