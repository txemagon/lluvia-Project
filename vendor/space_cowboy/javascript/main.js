var game = null
var skill_menu

function main(){

    skill_menu = new Skill("skill")
    game = new Game()
    skill_menu.add_port(game, "chosen_finished")
    
}
