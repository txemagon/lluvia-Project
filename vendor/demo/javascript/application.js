/**
 * @author Txema
 * Codigo de inicialización de la aplicación
 */


<<<<<<< HEAD
function main() {
    var vm = document.getElementById("ventanaMascara")
    vm.style.width = screen.width + "px"
    var apps = document.getElementsByClassName("Aplicacion")
    document.getElementById("fondo").style.width = (apps.length * (screen.availWidth + 10)) + "px"
    for (var i = 0; i < apps.length; i++)
        apps[i].style.width = screen.availWidth + "px"
        //document.getElementById("ventanaMascara").style.length = creen.availWidth + "px"
    var pc = new ControlPanel_App("panelControl")
    var pant = new Fondo_App("fondo")
    pc.add_port("go_to", pant)
}
=======
function main(){
	var vm = document.getElementById("ventanaMascara")
	vm.style.width = screen.width + "px"
	var apps = document.getElementsByClassName("Aplicacion")
	document.getElementById("fondo").style.width = (apps.length * (screen.availWidth + 10)) + "px"
	for (var i=0; i<apps.length; i++)
	   apps[i].style.width = screen.availWidth + "px"
	//document.getElementById("ventanaMascara").style.length = creen.availWidth + "px"
	var pc   = new ControlPanel_App("panelControl")
	var pant = new Fondo_App("fondo")
	pc.add_port("go_to", pant)
}

>>>>>>> 82a78e1761e816f872c7f2eca34c9b7826a1f3cf
