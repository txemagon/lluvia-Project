/**
 * @class Behavior
 *
 * Creates a Behavior
 *
 * @constructor
 *
 * @params {Object} brain
 * @params {Object} body
 * @params {ObjectObject} before_modifier
 * @params {Object} after_modifier
 *
 */


function Behavior( brain, body, before_modifier, after_modifier,target ){
    var that = this
    this.before =  []
    this.after  =  []
    this.brain
    this.me
    this.target = target
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
                m.unfreeze()
                that.before.push( m )
            })
            if ( after_modifier && (after_modifier instanceof Array))
                after_modifier.each( function(el){
                    var m = eval("new " + el.class_name().capitalize() + "BehaviorModifier(that)")
                    m.unfreeze()
                    that.after.push( m )
                })
    }
    if (arguments.length)
        initialize()
}

/**
 * @method decompose_name
 *
 * Given a string representing the name of a behaviors and its modifiers,
 * returns an Array with the list of premodifiers, the base name of the behavior
 * and an array with the postmodifiers.
 *
 * @param  {String} Behavior Full name of the behavior.
 * @return {Array}
 *
 * ### Example
 *
 *     Behavior.decompose_name("seek")
 *     // => [[], "seek", []]
 *     Behavior.decompose_name("pursue<seek>arrival>low speed>greeting")
 *     // => [["pursue"], "seek", ["arrival", "low speed", "greeting"]]
 */
Behavior.decompose_name = function(behavior){
    var pre_state = behavior.match(/\s*([^<]+)/g)
    behavior = pre_state.pop()

    var post_state = behavior.match(/([^>]+)/g)
    behavior = post_state.shift()

    return [pre_state.strip_all(), behavior.strip(), post_state.strip_all()]
}

/**
 * @property catalog
 * @static
 *
 * List of all known behaviors and modifiers
 *
 * ### Example:
 *
 *     {
 *         seek: {
 *           premodifiers:  [ "arrival", "low speed" ],
 *           postmodifiers: []
 *         },
 *         flee: {
 *           premodifiers:  [],
 *           postmodifiers: []
 *         }
 *     }
 */
Behavior.catalog = (function(){

    var initial_list = [
        "foresee<seek>arrival" , "flee", "wander","wander around","pursue",
        "alignment", "wall following", "path following",
        "separation", "cohesion",
        "obstacle avoidance", "containment"
    ]

    return initial_list.inject({}, function(elem, acum){
        var name = Behavior.decompose_name(elem)
        acum[name[1]] = {
            premodifiers:  name[0],
            postmodifiers: name[2]
        }
        return acum
    })
})()

Behavior.Scope = Enumeration("PRE", "POST", "ALL")

/**
 * @method new
 * @static
 * Creates a new behavior
 *
 * @param {String} name Name of the behavior. i.e. seek
 * @param {Object} target Target of the behavior.
 */
Behavior.new = function(brain, full_name, target) {
    var b_name     = Behavior.decompose_name(full_name)
    var class_name = eval (b_name[1].class_name() + "Behavior")

    // return eval( "new " + b_name[1].class_name() +
    //     "Behavior(that, body, '" + b_name[0] +
    //     "', '" + b_name[2] + "', " + target + ")" )
    return new class_name(brain, brain.body, b_name[0], b_name[2], target)
}

/**
 * @method type_of
 *
 * Returns the class associated to a behavior name.
 *
 * @param  {String} b_name Base name of the behavior.
 * @return {Fucntion} Class constructor of the behavior.
 *
 * ### Example
 *
 *     Behavior.type_of("seek")
 *     // => SeekBehavior
 */
Behavior.type_of = function(b_name){
    return eval(b_name.class_name() + "Behavior")
}


/**
 * @method is_a$U
 *
 * Checks if this behavior is one of the given name.
 *
 * @param  {String} b_name Base name of a behavior
 * @return {Boolean}
 *
 * ### Example
 *
 *     var b = new SeekBehavior()
 *     b.is_a$U('seek')
 *     // => true
 *
 */
Behavior.prototype.is_a$U = function(b_name){
    b_name = Behavior.decompose_name(b_name)[1]
    try{
        return this instanceof Behavior.type_of(b_name)
    } catch(err){
        return false
    }
}


/**
 * @method desired_acceleration
 *
 * Returns a Vector with the desired acceleration coming from this behavior.
 *
 * @return {Object} A Vector.
 */
Behavior.prototype.desired_acceleration = function(){
    a = new Vector(0, 0);
    return new Vector(0, 0);
}


/**
 * @method is_premodified_by$U
 *
 * Returns true if mod _ name is in the pre modifiers list.
 *
 * @param  {String} mod_name Name of the modifier
 * @return {Boolean}
 */
Behavior.prototype.is_premodified_by$U = function(mod_name){
    return this.before.inject(false, function(modifier, modified){
        return modified ||  (modifier.is_a$U(mod_name) ? !modifier.frozen$U() : false)
    })
}


/**
 * @method is_postmodified_by$U
 *
 * Returns true if mod _ name is in the list of post modifiers.
 *
 * @param  {String} mod_name Name of the modifier
 * @return {Boolean}
 */
Behavior.prototype.is_postmodified_by$U = function(mod_name){
    return this.after.inject(false, function(modifier, modified){
        return modified ||  (modifier.is_a$U(mod_name) ? !modifier.frozen$U() : false)
    })
}


/**
 * @method is_modified_by$U
 *
 * Returns true if mod _ name is in the pre or post modifiers list.
 *
 * @param  {String} mod_name Name of the modifier
 * @return {Boolean}
 */
Behavior.prototype.is_modified_by$U = function(mod_name){
    return this.is_premodified_by$U(mod_name) || this.is_postmodified_by$U(mod_name)
}


/**
 * @method get_modifiers_for
 *
 * Returns the list of PRE or POST modifiers.
 *
 * @param  {Number} [scope=Behavior.Scope.ALL] PRE and POST are valid ALL substitutes.
 * @return {Array}
 */
Behavior.prototype.get_modifiers_for = function(scope){
    var ary = []
    scope = scope || Behavior.Scope.ALL

    if (scope != Behavior.Scope.POST)
        ary = ary.merge(this.before)
    if (scope != Behavior.Scope.PRE)
        ary = ary.merge(this.after)

    return ary
}

/**
 * @method all_modifiers
 * Returns the list with all the modifiers.
 * Synonym of Behavior#get_modifiers_for(Behavior.Scope.ALL)
 *
 * @return {Array}
 */
Behavior.prototype.all_modifiers = function() {
    return this.get_modifiers_for(Behavior.Scope.ALL)
}


/**
 * @method activate_modifier
 *
 * Unfreezes the modifier in order to check this property later on in code.
 *
 * @param  {String} mod_name Name of the modifier.
 * @param  {Number} [scope=Behavior.Scope.ALL] Name of the modifier.
 */
Behavior.prototype.activate_modifier = function(mod_name, scope){
    this.get_modifiers_for(scope).each(function(el){
        if (el.is_a$U(mod_name))
            el.unfreeze()
    })
}


/**
 * @method get_modifier
 *
 * Looks for a given modifier returning null whenever is not found.
 *
 * @param  {String} mod_name Name of the modifier.
 * @param  {Number} [scope=Behavior.Scope.ALL] Name of the modifier.
 * @return {String}
 *
 */
Behavior.prototype.get_modifier = function (mod_name, scope){
    var requested_modifier = null
    return this.get_modifiers_for(scope).inject(requested_modifier, function(mod, rq){
        return mod.is_a$U(mod_name) ? mod : rq
    })
}


/**
 * @method deactivate_modifier
 *
 * Present modifiers marked as frozen shall not be taken into account.
 *
 * @param  {String} mod_name Name of the modifier.
 * @param  {Number} [scope=Behavior.Scope.ALL] Name of the modifier.
 */
Behavior.prototype.deactivate_modifier = function(mod_name, scope){
    this.get_modifiers_for(scope).each(function(el){
        if (el.is_a$U(mod_name))
            el.freeze()
    })
}


