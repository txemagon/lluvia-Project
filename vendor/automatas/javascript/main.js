function main() {
    var solicitors = {
        walking: function() {
            return "I'm walking"
        },
        running: [

            function() {
                return "I'm running"
            }, {
                slow: function() {
                    return "I'm running slow"
                },
                "slow.steady": function() {
                    return "But steadily"
                },
                fast: function() {
                    return "I'm running fast"
                }
            }
        ]
    }

    var a = new Automata(["walking", "running", ["*slow", "fast"]], solicitors)

    var s = a.state.running.slow
    s.regime = State.REGIME.steady
    a.current.current = a.current.requested
    alert(a.run())


}