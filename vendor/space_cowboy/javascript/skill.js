Skill.prototype = new Device
Skill.prototype.constructor = Skill
Skill.prototype.super = Device

function Skill(view){
	this.self_events = ["chosen_finished"]
	this.skill_points = 5
	this.damage = 0
	this.resistance = 0
	this.speed = 0

    Device.call(this, view)

    /* Damage buttons
     *
     */
    this.new_gate("button_plus_damage", Gate, {
	    do_onclick: function(event, element){
		      this.device.transfer_to("damage")
	        }
	    }
    )

    this.new_gate("button_minus_damage", Gate, {
	    do_onclick: function(event, element){
		    this.device.decrement_to("damage")
	        }
	    }
    )

    /* Resistance buttons
     *
     */
    this.new_gate("button_plus_resistance", Gate, {
	    do_onclick: function(event, element){
		    this.device.transfer_to("resistance")
	        }
	    }
    )

    this.new_gate("button_minus_resistance", Gate, {
	    do_onclick: function(event, element){
		    this.device.decrement_to("resistance")
	        }
	    }
    )

    /* Speed buttons
     *
     */
    this.new_gate("button_plus_speed", Gate, {
	    do_onclick: function(event, element){
		    this.device.transfer_to("speed")
	        }
	    }
    )

    this.new_gate("button_minus_speed", Gate, {
	    do_onclick: function(event, element){
		    this.device.decrement_to("speed")
	    	}  
		}
	)

	 this.new_gate("button_play", Gate, {
	    do_onclick: function(event, element){
		    this.device.fire_event("chosen_finished", ...)
	    	}  
		}
	)
}

Skill.prototype.decrement_to = function(target){
	if (this[target] >= 1){
		this[target]--
		this.skill_points++
		this.render(target)
	}
}

Skill.prototype.transfer_to = function(target){
    if (this.skill_points > 0){
	    this.skill_points--
        this[target]++
        this.render(target)
	}
}

Skill.prototype.render = function(target){
		var points_left = document.getElementById("points")
		points.innerHTML = this.skill_points
		var bar = document.getElementById("image_" + target)
		bar.src = "images/bar/bar_" + this[target] + ".png"
}

Skill.prototype.appear = function(){
	this.view.style.display = "visible"
}

Skill.prototype.hide = function(){
	this.view.style.display = "none"
}