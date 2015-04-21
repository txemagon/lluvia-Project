PointDealer.prototype = new Device
PointDealer.prototype.constructor = PointDealer
PointDealer.prototype.super = Device

/**
 * @method  PointDealer
 * @constructor
 * Creates
 * @param {[type]} view      [description]
 * @param {[type]} interface [description]
 */
function PointDealer(view_name, interface) {

    this.container = document.getElementById(view_name + "_interface")
    this.container.innerHTML = ""

    this.self_events = ["chosen_finished"]
    this.interface = interface

    Device.call(this, view_name)

    var html_category_template = ["<div class='Fila'>" +
        "<span class='Title'>" +
        "<p>",
        null, //Element 1. Substitute title. Damage, ie.
        "</p>" +
        "</span>" +

        "<span class='BarraPuntos'>" +
        "<img id='image_",
        null, // Element 3. Substitute category name.
        "' src='images/bar/bar_0.png'>" +
        "</span>" +

        "<span id='buttons_skills_",
        null, // Element 5. Substitute category name.
        "'>" +
        "<span id='button_minus_",
        null, // Element 7. Substitute category name.
        "' class='Button'>" +
        "    <img src='images/bar/minus.png'>" +
        "</span>" +

        "<span id='button_plus_",
        null, // Element 9. Substitute category name.
        "' class='Button' >" +
        "<img src='images/bar/plus.png' />" +
        "</span> </span ></div><br/>"
    ]


    for (var category in interface)
        if (category != "points") {
            for (var i = 1; i < 10; i += 2)
                html_category_template[i] = category
            this.container.innerHTML += html_category_template.join("") + "\n"
        }

    for (var category in interface)
        if (category != "points") {
            /* Wrap the button */
            this.new_gate("button_plus_" + category, Gate, {
                do_onclick: function(category) {
                    return function(event, element) {
                        this.device.transfer_to(category)
                    }
                }(category)
            })

            this.new_gate("button_minus_" + category, Gate, {
                do_onclick: function(category) {
                    return function(event, element) {
                        this.device.get_back_from(category)
                    }
                }(category)
            })
            this.render(category)
        }

    this.new_gate("button_play", Gate, {
        do_onclick: function(event, element) {
            this.device.fire_event(this.device.new_message("sync", "chosen_finished", interface))
           /* if (this.device.interface.points != 0)
                alert("Tienes que gastar todos los skill points")
            else*/
                this.device.hide()
        }
    })

}


PointDealer.prototype.get_back_from = function(target) {
    if (this.interface[target] >= 1) {
        this.interface[target]--
        this.interface.points++
        this.render(target)
    }
}

PointDealer.prototype.transfer_to = function(target) {
    if (this.interface.points > 0) {
        this.interface.points--
        this.interface[target]++
        this.render(target)
    }
}

PointDealer.prototype.render = function(target) {
    var points_left = document.getElementById("points")
    points.innerHTML = this.interface.points
    var bar = document.getElementById("image_" + target)
    bar.src = "images/bar/bar_" + this.interface[target] + ".png "
}

PointDealer.prototype.attend_show_skills = function(date, mssg) {
    this.appear()
}

