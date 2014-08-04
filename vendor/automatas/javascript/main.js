function main() {
    var solicitors = [

        function() {
            return "Hi. I'm walking"
        },
        function() {
            return "Hi. I'm running"
        }
    ]
    var a = new Automata(["walking", "running"], solicitors)
    alert(a.run())
}