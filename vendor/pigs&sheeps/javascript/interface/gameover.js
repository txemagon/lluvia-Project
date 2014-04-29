World.prototype.gameover_pig = function() {
	var canvas = document.getElementById('screener');
	var contexto = canvas.getContext('2d');
	canvas.width=canvas.width;
	contexto.font = "bold 48px courier";
	contexto.fillStyle = '#ff33ff';
	contexto.fillText("Game Over",250,80);
	//pata 1
	contexto.beginPath();
	contexto.moveTo(285,230);
	contexto.lineTo(290,270);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();

	contexto.lineTo(310,270);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();

	contexto.lineTo(320,230);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();
	contexto.fillStyle = '#f8aea9';
	contexto.fill();

	//pezuña 1
	contexto.beginPath();
	contexto.moveTo(290,270);
	contexto.lineTo(310,270);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(308,280);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(300,275);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(293,280);
	contexto.strokeStyle = "black";
	contexto.stroke();
	contexto.fillStyle = 'black';
	contexto.fill();

	//pata 2
	contexto.beginPath();
	contexto.moveTo(321,230);
	contexto.lineTo(328,270);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();

	contexto.lineTo(348,270);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();

	contexto.lineTo(358,230);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();
	contexto.fillStyle = '#f8aea9';
	contexto.fill();

	//pezuña 2
	contexto.beginPath();
	contexto.moveTo(328,270);
	contexto.lineTo(348,270);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(346,280);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(338,275);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(331,280);
	contexto.strokeStyle = "black";
	contexto.stroke();
	contexto.fillStyle = 'black';
	contexto.fill();

	//pata 3
	contexto.beginPath();
	contexto.moveTo(381,230);
	contexto.lineTo(388,270);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();

	contexto.lineTo(408,270);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();

	contexto.lineTo(418,230);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();
	contexto.fillStyle = '#f8aea9';
	contexto.fill();

	//pezuña 3
	contexto.beginPath();
	contexto.moveTo(388,270);
	contexto.lineTo(408,270);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(406,280);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(398,275);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(391,280);
	contexto.strokeStyle = "black";
	contexto.stroke();
	contexto.fillStyle = 'black';
	contexto.fill();

	//pata 4
	contexto.beginPath();
	contexto.moveTo(413,230);
	contexto.lineTo(420,270);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();

	contexto.lineTo(440,270);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();

	contexto.lineTo(450,210);
	contexto.strokeStyle = "#f8aea9";
	contexto.stroke();
	contexto.fillStyle = '#f8aea9';
	contexto.fill();

	//pezuña 4
	contexto.beginPath();
	contexto.moveTo(420,270);
	contexto.lineTo(440,270);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(438,280);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(430,275);
	contexto.strokeStyle = "black";
	contexto.stroke();

	contexto.lineTo(423,280);
	contexto.strokeStyle = "black";
	contexto.stroke();
	contexto.fillStyle = 'black';
	contexto.fill();

	//rabo
	contexto.beginPath();
	contexto.arc(450,180,10,5,(Math.PI/180)*180,false); // circunferencia completa
	contexto.lineWidth=2;
	contexto.strokeStyle="#f8aea9";
	contexto.stroke();

	//cuerpo
	contexto.save();
	contexto.scale(3, 2);
	contexto.beginPath();
	contexto.arc(120, 100, 30, 0, Math.PI*2, false);//elipse
	contexto.fillStyle = '#f8aea9';
	contexto.strokeStyle='#f8aea9';
	contexto.fill();
	contexto.stroke();
	contexto.fill();
	contexto.stroke();
	contexto.restore();

	//oreja
	contexto.save();
	contexto.scale(1, 2);
	contexto.beginPath();
	contexto.arc(330, 70, 10, 0, Math.PI*2, false);//elipse
	contexto.fillStyle = '#fbbbb2';
	contexto.strokeStyle='#fbbbb2';
	contexto.fill();
	contexto.stroke();
	contexto.fill();
	contexto.stroke();
	contexto.restore();

	//interior oreja
	contexto.save();
	contexto.scale(0.50, 2.25);
	contexto.beginPath();
	contexto.arc(658, 65, 10, 0, Math.PI*2, false);//elipse
	contexto.fillStyle = '#F69D9A';
	contexto.strokeStyle='#F69D9A';
	contexto.fill();
	contexto.stroke();
	contexto.fill();
	contexto.stroke();
	contexto.restore();

	//oreja
	contexto.save();
	contexto.scale(1, 2);
	contexto.beginPath();
	contexto.arc(280, 68, 10, 0, Math.PI*2, false);//elipse
	contexto.fillStyle = '#fbbbb2';
	contexto.strokeStyle='#fbbbb2';
	contexto.fill();
	contexto.stroke();
	contexto.fill();
	contexto.stroke();
	contexto.restore();

	//interior oreja
	contexto.save();
	contexto.scale(0.50, 2.25);
	contexto.beginPath();
	contexto.arc(560, 65, 10, 0, Math.PI*2, false);//elipse
	contexto.fillStyle = '#F69D9A';
	contexto.strokeStyle='#F69D9A';
	contexto.fill();
	contexto.stroke();
	contexto.fill();
	contexto.stroke();
	contexto.restore();


	// cabeza
	contexto.beginPath();
	contexto.arc(300,180,50,0,(Math.PI/180)*360,true); // circunferencia completa
	contexto.lineWidth=2;
	contexto.fillStyle = '#fbbbb2';
	contexto.strokeStyle="#fbbbb2";
	contexto.fill();
	contexto.stroke();
	/*
	//ojo abierto
	contexto.beginPath();
	contexto.arc(280,175,6,0,(Math.PI/180)*360,true); // circunferencia completa
	contexto.lineWidth=2;
	contexto.fillStyle = 'black';
	contexto.strokeStyle="black";
	contexto.fill();
	contexto.stroke();

	//brillo ojo abierto
	contexto.beginPath();
	contexto.arc(278,172,1,0,(Math.PI/180)*360,true); // circunferencia completa
	contexto.lineWidth=2;
	contexto.fillStyle = 'white';
	contexto.strokeStyle="white";
	contexto.fill();
	contexto.stroke();

	//ojo abierto
	contexto.beginPath();
	contexto.arc(320,175,6,0,(Math.PI/180)*360,true); // circunferencia completa
	contexto.lineWidth=2;
	contexto.fillStyle = 'black';
	contexto.strokeStyle="black";
	contexto.fill();
	contexto.stroke();

	//brillo ojo abierto
	contexto.beginPath();
	contexto.arc(318,172,1,0,(Math.PI/180)*360,true); // circunferencia completa
	contexto.lineWidth=2;
	contexto.fillStyle = 'white';
	contexto.strokeStyle="white";
	contexto.fill();
	contexto.stroke();
	*/
	//ojo triste
	contexto.beginPath();
	contexto.arc(280,170,6,0,(Math.PI/180)*250,false); // circunferencia completa
	contexto.lineWidth=2;
	contexto.fillStyle = 'black';
	contexto.strokeStyle="black";
	contexto.fill();
	contexto.stroke();

	//ojo triste
	contexto.beginPath();
	contexto.arc(320,170,6,0,(Math.PI/180)*250,false); // circunferencia completa
	contexto.lineWidth=2;
	contexto.fillStyle = 'black';
	contexto.strokeStyle="black";
	contexto.fill();
	contexto.stroke();

	//boca triste
	contexto.beginPath();
	contexto.arc(300,217,10,0,(Math.PI/180)*180,true); // media circunferencia
	contexto.strokeStyle="black";
	contexto.stroke();

	//nariz
	contexto.save();
	contexto.scale(2.5, 1.5);
	contexto.beginPath();
	contexto.arc(120, 125, 10, 0, Math.PI*2, false);//elipse
	contexto.fillStyle = '#fed5d3';
	contexto.strokeStyle='#fed5d3';
	contexto.fill();
	contexto.stroke();
	contexto.fill();
	contexto.stroke();
	contexto.restore();

	//agujero nariz
	contexto.beginPath();
	contexto.arc(285,190,6,0,(Math.PI/180)*360,true); // circunferencia completa
	contexto.lineWidth=2;
	contexto.fillStyle = '#f9a09c';
	contexto.strokeStyle="#f9a09c";
	contexto.fill();
	contexto.stroke();

	//agujero nariz
	contexto.beginPath();
	contexto.arc(310,190,6,0,(Math.PI/180)*360,true); // circunferencia completa
	contexto.lineWidth=2;
	contexto.fillStyle = '#F69D9A';
	contexto.strokeStyle="#F69D9A";
	contexto.fill();
	contexto.stroke();
}
