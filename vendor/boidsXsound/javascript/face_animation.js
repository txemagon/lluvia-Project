var c=null,cxt=null; 

function init(){
	c=document.getElementById("face");
	cxt=c.getContext("2d");

	setInterval(pintarCara, 100)
	//pintarCara()
}

function pintarCara(){
	cxt.fillStyle="white";
    cxt.fillRect(0, 0, c.height, c.width);  
    cxt.fillStyle="black";

/*
    no_boid()
*/	
	contornoCara()
	ojos()
	boca(1)
	antena()
	onda_wifi()
	//numero_boid(1)
}
function no_boid(){
	cxt.font = '25px sans-serif';
	cxt.fillText("Select a", 25, 70);
	cxt.fillText("nanorobot", 10, 90);
}

function contornoCara(){
	//cxt.fillStyle = "rgb(41,155,243)";
	//cxt.fillRect (0, 0, 150, 150);

	cxt.lineWidth = 2;
	cxt.beginPath();

	cxt.moveTo(47.5,45)
	cxt.lineTo(102.5,45);

	cxt.quadraticCurveTo(122.5, 45, 122.5, 70);
	//cxt.moveTo(122.5,50)
	cxt.lineTo(122.5,115);

	cxt.quadraticCurveTo(122.5, 135, 102.5, 135);
	//cxt.moveTo(112.5, 135)
	cxt.lineTo(47.5,135);

	cxt.quadraticCurveTo(27.5, 135, 27.5, 115);
	//cxt.moveTo(27.5, 125)
	cxt.lineTo(27.5, 70);

	cxt.quadraticCurveTo(27.5, 45, 47.5, 45);

	cxt.stroke();
}

function ojos(){
	cxt.beginPath();
	cxt.arc(55, 75 ,8 , 0, Math.PI*2, false); 
	cxt.arc(95, 75 ,8 , 0, Math.PI*2, false); 
	cxt.fill();
}

function boca(opcion){
	switch(opcion){
		case 1:
			cxt.beginPath();
			cxt.moveTo(48,110)
			cxt.lineTo(102,110);
			cxt.stroke();
			break;
		case 2:
			break;
	}
}

function antena(){
	cxt.lineWidth = 1;
	
	cxt.beginPath();
	cxt.moveTo(75,45)
	cxt.lineTo(75,40)
	cxt.lineTo(80,38)
	cxt.lineTo(70,36)
	cxt.lineTo(80,34)
	cxt.lineTo(75,32)
	cxt.lineTo(75,30)
	cxt.stroke();

	cxt.beginPath();
	cxt.arc(75, 28 ,3 , 0, Math.PI*2, false);
	cxt.fill()

	cxt.lineWidth = 2;
}

var ondas_restantes = 0
var onda = 0
var turno = 0
function onda_wifi(){
	//alert(onda)
	if(ondas_restantes % 2 == 0){
		cxt.lineWidth = 1;
		cxt.beginPath();
		if(onda == 0 || onda == 1){
			cxt.moveTo(70,24)
			cxt.quadraticCurveTo(75, 19, 80, 24);
		}
		if(onda == 1 || onda == 2){	
			cxt.moveTo(65,22)
			cxt.quadraticCurveTo(75, 14, 85, 22);
		}
		if(onda == 2 || onda == 3){	
			cxt.moveTo(60,20)
			cxt.quadraticCurveTo(75, 7, 90, 20);
		}	
		cxt.stroke();
		cxt.lineWidth = 2;
	onda++
	if(onda == 4)
		ondas_restantes++
	if(onda == 4)
		onda = 0
	}
}

function numero_boid(numero){
	cxt.font = '8px sans-serif';
	cxt.fillText("#"+numero, 100, 130);
}