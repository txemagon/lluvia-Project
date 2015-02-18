var game = null
var skill_menu

function main() {

    skill_menu = new PointDealer(
        "skill", {
            points: 5,
            Damage: 0,
            Resistance: 0,
            Speed: 0
        })
    game = new Game()
    skill_menu.add_port("chosen_finished", game)
}