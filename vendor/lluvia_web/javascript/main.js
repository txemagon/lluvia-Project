function require_packages() {}

function main() {
    var second_wheel = new Gate('second_wheel')
    second_wheel.new_effect(new RotateEffect('second_wheel', {
        velocity: [10, 10]
    }))
    $Processor.register(second_wheel)

    var gear_inside1 = new Gate('gear_inside1')
    gear_inside1.new_effect(new RotateEffect('gear_inside1'))
    $Processor.register(gear_inside1)

    var gear_inside2 = new Gate('gear_inside2')
    gear_inside2.new_effect(new RotateEffect('gear_inside2'))
    $Processor.register(gear_inside2)

    var gear_inside3 = new Gate('gear_inside3')
    gear_inside3.new_effect(new SideRotationEffect('gear_inside3', {
        origin: [50, 57],
        velocity: [40, 40]
    }))
    $Processor.register(gear_inside3)

    var handle = new Gate('handle')
    handle.new_effect(new SideRotationEffect('handle', {
        origin: [50, 10]
    }))
    $Processor.register(handle)

    var chain = new Gate('chain')
    chain.new_effect(new BackgroundMoveEffect('chain', {
        velocity: [2, 0]
    }))
    $Processor.register(chain)

    var pelton = new Gate('pelton')
    pelton.new_effect(new RotateEffect('pelton'))
    $Processor.register(pelton)

    var eagle = new Gate('eagle')
    eagle.new_effect(new MoveLeftEffect('eagle', [667, 17], [0, 0], [78, 0]))
    $Processor.register(eagle)

    var black_line_top = new Gate('black_line_top')
    black_line_top.new_effect(new MoveLeftEffect('black_line_top', [605, 0], [0, 0]))
    $Processor.register(black_line_top)

    var black_line_bottom = new Gate('black_line_bottom')
    black_line_bottom.new_effect(new MoveLeftEffect('black_line_bottom', [605, 17], [0, 0]))
    $Processor.register(black_line_bottom)
}