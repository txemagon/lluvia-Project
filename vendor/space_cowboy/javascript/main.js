var game = null
var skill_menu
var planet

function main() {

    skill_menu = new PointDealer(
        "skill", {
            points: 5,
            damage: 0,
            resistance: 0,
            speed: 0
        })
    game = new Game()
    planet = new Space()

    //Methods
    skill_menu.add_port("chosen_finished", game)
    planet.add_port("go_to_planet", game)

    //States
    game.add_port("show_skills", skill_menu)
    game.add_port("show_space", game)

    game.switch("running.choosing", "running.choosing.planet")

}