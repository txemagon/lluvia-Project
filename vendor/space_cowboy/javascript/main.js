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
    game.add_port("show_skills", skill_menu)
    skill_menu.add_port("chosen_finished", game)
    game.switch("running.choosing")
    
}