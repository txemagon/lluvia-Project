var game = null
var skill_menu

function main() {

    skill_menu = new PointDealer(
        "skill", {
            points: 5,
            damage: 0,
            resistance: 0,
            speed: 0
        })
    game = new Game()
    space = new Space()
    planet = new Planet()

    //Methods
    skill_menu.add_port("chosen_finished", game)
    space.add_port("go_to_planet", game)
    game.add_port("show_space", space)
    game.add_port("show_planet", planet)

    //States
    game.add_port("show_skills", skill_menu)

    game.switch("running.choosing")
}