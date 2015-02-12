Skill.prototype = new Device
Skill.prototype.constructor = Skill
Skill.prototype.super = Device

function Skill(view){
	this.skill_points = 5
	this.damage = 0
	this.resistance = 0
	this.speed = 0

    Device.call(this, view)

    /* Damage buttons
     *
     */
    this.new_gate("button_plus", Gate, {
	    do_onclick: function(event, element){
		    this.transfer_to("damage")
		    alert("we")
	        }
	    }
    )

    this.new_gate("button_minus_damage", Gate, {
	    do_onclick: function(event, element){
		    this.decrement_to("damage")
	        }
	    }
    )

    /* Resistance buttons
     *
     */
    this.new_gate("button_plus_resistance", Gate, {
	    do_onclick: function(event, element){
		    this.transfer_to("resistance")
	        }
	    }
    )

    this.new_gate("button_minus_resistance", Gate, {
	    do_onclick: function(event, element){
		    this.decrement_to("resistance")
	        }
	    }
    )

    /* Speed buttons
     *
     */
    this.new_gate("button_plus_speed", Gate, {
	    do_onclick: function(event, element){
		    this.transfer_to("speed")
	        }
	    }
    )

    this.new_gate("button_minus_speed", Gate, {
	    do_onclick: function(event, element){
		    this.decrement_to("speed")
	        }
	    }
    )
}

Skill.prototype.transfer_to = function(target){
    if (this.skill_points > 0){
	    this.skill_points--
        this[target]++
        this.render(target)
	}
}

Skill.prototype.decrement_to = function(target){
	if (this.skill_points <= 5){
		this.skill_points++
		this.[target]--
		this.render(target)
	}
}