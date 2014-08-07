function main() {
    var solicitors = {
        walking: function() {
            return "I'm walking with my shoes."
        },
        "walking.down": function() {
            alert("Im taking my shoes off.")

        },
        "walking.up": function() {
            alert("Im putting my shoes on.")
        },
        running: [

            function() {
                return "I'm running"
            }, {
                slow: function() {
                    return "I'm running slow"
                },
                "slow.up": function() {
                    alert("I got my slow sneakers")
                },
                "slow.steady": function() {
                    return "But steadily"
                },
                fast: function() {
                    return "I'm running fast"
                }
            }
        ],
        "running.up": function() {
            alert("Im putting my sneakers on.")
        },
        "running.down": function() {
            alert("Im taking my sneakers off.")

        }
    }

    var a = new Automata(["*walking", "running", ["slow", "fast"]], solicitors)

    alert(a.run())
    a.switch(a.state.running)
    alert(a.run())
    a.switch("running.slow")
    alert(a.run())

}