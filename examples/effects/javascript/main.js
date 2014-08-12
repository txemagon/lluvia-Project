function require_packages() {}

function main() {
    var bar = new Gate('line')
        /**
         * {
         *     panel: HTMLDivElement('line')
         *     threads: []
         * }
         */

    bar.new_effect(new MoveEffect('line', [200, 20], [0, 0]))

    $Processor.register(bar) // Start calling periodically bar#run
}