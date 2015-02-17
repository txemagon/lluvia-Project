var game = null
var skill_menu

function main() {

    skill_menu = new PointDealer(
        "skill", {
            points: 5,
            speed: 1,
            damage: 3,
            resistance: 2
        })
    game = new Game()
    skill_menu.add_port("chosen_finished", game)
}