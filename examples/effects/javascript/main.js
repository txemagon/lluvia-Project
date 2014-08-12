function require_packages() {}

function main() {
    var bar = new Gate('line')
        /**
         * {
         *     panel: HTMLDivElement('line')
         *     threads: []
         * }
         */

    bar.new_effect(new MoveLeftEffect('line', [400, 20], [0, 0]))

    $Processor.register(bar) // Start calling periodically bar#run

    var down = new Gate('line2')
    down.new_effect(new MoveDownEffect('line2', [20, 250], [0, 0]))
    $Processor.register(down)

    var diagonal = new Gate('line3')
    diagonal.new_effect(new RectangleEffect('line3', [300, 70], [0, 0]))
    $Processor.register(diagonal)

    var horizontal = new Gate('line')
    horizontal.new_effect(new MoveLeftEffect('line4', [550, 20], [0, 0]))
    $Processor.register(horizontal)

    var down2 = new Gate('line5')
    down2.new_effect(new MoveDownEffect('line5', [20, 300], [0, 0]))
    $Processor.register(down2)
}