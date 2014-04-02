/**
 * @author Txema
 * Codigo de inicialización de la aplicación
 */


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
	pc.addPort("go_to", pant)
 }

main()
