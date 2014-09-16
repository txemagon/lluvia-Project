
function main(){
    c = document.getElementById("screener")
    cxt = c.getContext("2d")
    var world = new World(50)
    var options_panel = new OptionsPanel()

    options_panel.add_port("start", world)
    options_panel.add_port("pause", world)
    options_panel.add_port("next_step", world)
    options_panel.add_port("restart", world)
    options_panel.add_port("resume", world)
}
