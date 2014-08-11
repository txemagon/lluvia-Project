MoveEffect.prototype = new ThreadAutomata
MoveEffect.prototype.constructor = MoveEffect

function MoveEffect(processor, gate) {
    alert("hi")
    var that = this
    var state = this.state = new Enumeration("initial_position", "transition", "final_position")
    this.movement = new Interpolator(this.gate.line.style.margin.left, 500, 10)

    this.solicitors = [
        /* initial_position */
        [

            function() {;
            },
            function() {;
            },
            function() {;
            }
        ],
        /* transition */
        [

            function() {;
            },
            function() {
                while (that.movement.current_point < this.movement.final_point)
                    that.movement.run()

            },
            function() {;
            }
        ],
        /* final_position */
        [

            function() {;
            },
            function() {;
            },
            function() {;
            }
        ]
    ]

    function initialize() {
        that.gate = gate
        try {
            if (that.state) {
                ThreadAutomata.call(that, that.state, that.currentState, that.solicitors, processor)
            }
        } catch (e) {
            alert("No event handlers were found.\nException: " + e.toSource())
        }
    }

    if (arguments.length)
        initialize()

}