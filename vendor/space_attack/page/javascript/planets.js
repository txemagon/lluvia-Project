
var div_planetas = null

function initialize(){
   div_planetas = document.getElementById("planetas")
   div_planetas.style.top = "-200px"
   div_planetas.style.left = "-500px"   
}

function planet1() {
    window.location.href="planet1.html"
}

function up() {
	var inc = 10
	var actual = parseInt(div_planetas.style.top)
	if (actual < 0)
		div_planetas.style.top = (actual + inc) + "px"
	else
		inc = 0   
}

function right() {
	var inc = 10
	var actual = parseInt(div_planetas.style.left)
	if (actual > -700)
		div_planetas.style.left = (actual - inc) + "px"
	else
		inc = 0
}

function down() {
	var inc = 10
	var actual = parseInt(div_planetas.style.top) 
	if (actual > -400)
		div_planetas.style.top = (actual - inc) + "px"
	else
		inc = 0 
}

function left() {
	var inc = 10
	var actual = parseInt(div_planetas.style.left)
	if (actual < -400)
		div_planetas.style.left = (actual + inc) + "px"
	else
		inc = 0
}

