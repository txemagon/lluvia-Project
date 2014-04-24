function change_image(){
	document.getElementById('menu_img').src="images/sheep2.png"
      }
      
function first_image(){
    document.getElementById('menu_img').src="images/sheep1.png"
    }
function gameover(){
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
function countdown(){
	sec =0;
	min =2;
	seconds = document.getElementById("seconds");
	minutes = document.getElementById("minutes");
	 
	var timer = setInterval(
	    function(){
	    	if (minutes.innerHTML=="0" && seconds.innerHTML=="01"){
				clearInterval(timer);
				seconds.innerHTML="00"
				gameover();
			}
			else{
			    if(min >=0 && sec<=59){
			     	if(sec==0){
			            sec=60;
			            min--;
			            minutes.innerHTML = min;

			        }
			        if(min==0 && sec<=9){
			        	seconds.style.color="red";
			        	minutes.style.color="red";
			        	seconds.innerHTML =  "0" + sec;
			        	
			        }
			        else{	 
						if(sec>=10)
			        		seconds.innerHTML =  sec;	        			
						else
							seconds.innerHTML = "0" + sec;
			    	}
					sec--;
			    }
			 }
	    }
	,1500);
	
	
}
function dibujarCanvas(){

        var canvas = document.getElementById('screener');
        var contexto = canvas.getContext('2d');

        //cielo
        contexto.fillStyle = '#B5CDFF';
        contexto.fillRect (0, 0, 852, 502);

        // sol
        contexto.beginPath();
        contexto.arc(50,40,30,0,Math.PI*2, true);      
        contexto.fillStyle="yellow";
        contexto.fillStyle = 'yellow';
        contexto.shadowBlur=80;
        contexto.shadowOffsetX=-20;
        contexto.shadowOffsetY=-10;
        contexto.shadowColor="yellow"       
        contexto.fill();

	        //nubes
		contexto.beginPath();
        contexto.arc(800,100,41,0,Math.PI*2, true);    
        contexto.fillStyle = 'white';    
        contexto.fill();
		contexto.beginPath();
        contexto.arc(140,100,62,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();  
        contexto.arc(200,100,62,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();  
        //contexto.fillStyle="rgba(232,236,247,0.5)";
		contexto.beginPath();
        contexto.arc(300,100,62,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();  
        //contexto.fillStyle="rgba(232,236,247,0.5)";
        contexto.beginPath();
        contexto.arc(350,100,80,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();  
		//contexto.fillStyle="rgba(232,236,247,0.5)";
        contexto.beginPath();
        contexto.arc(455,100,46,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();  
        contexto.beginPath();
        contexto.arc(500,100,30,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();  
        contexto.beginPath();
        contexto.arc(573,100,62,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();  
        contexto.beginPath();
        contexto.arc(640,100,25,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();  
        contexto.beginPath();
        contexto.arc(700,100,44,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();  
        contexto.beginPath();
        contexto.arc(746,100,23,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();  
        contexto.beginPath();
        contexto.arc(850,120,45,0,Math.PI*2, true);        
        contexto.fillStyle = 'white';  
        contexto.fill();  	
		
		
		//cesped
		contexto.beginPath();
		var gr=contexto.createLinearGradient(0,150,0,280);
		gr.addColorStop(0,"#6B8E23");
		gr.addColorStop(1,"#9ACD32");
		contexto.fillStyle=gr;
		contexto.fillRect(0,120,852, 502);
		contexto.fill();
		// corral
		//1
		contexto.beginPath();
        contexto.moveTo(518,227);
        contexto.lineTo(518,205);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
		/*contexto.shadowOffsetX=10;
        contexto.shadowOffsetY=10;
        contexto.shadowColor="black";
        contexto.shadowBlur=20;*/
        contexto.stroke();
		//2
		contexto.beginPath();
        contexto.moveTo(530,220);
        contexto.lineTo(530,198);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
		/*contexto.shadowOffsetX=10;
        contexto.shadowOffsetY=10;
        contexto.shadowColor="black";
        contexto.shadowBlur=20;*/
        contexto.stroke();
		//3
		contexto.beginPath();
        contexto.moveTo(545,209);
        contexto.lineTo(545,188);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
		contexto.shadowOffsetX=20;
        contexto.shadowOffsetY=25;
        contexto.shadowColor="black";
        contexto.shadowBlur=80;
        contexto.stroke();
		//4
		contexto.beginPath();
        contexto.moveTo(560,192);
        contexto.lineTo(560,175);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//5
		contexto.beginPath();
        contexto.moveTo(575,181);
        contexto.lineTo(575,164);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//6
		contexto.beginPath();
        contexto.moveTo(590,167);
        contexto.lineTo(590,150);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//7
		contexto.beginPath();
        contexto.moveTo(605,153);
        contexto.lineTo(605,135);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//8
		contexto.beginPath();
        contexto.moveTo(620,142);
        contexto.lineTo(620,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//9
		contexto.beginPath();
        contexto.moveTo(635,142);
        contexto.lineTo(635,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//10
		contexto.beginPath();
        contexto.moveTo(650,142);
        contexto.lineTo(650,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//11
		contexto.beginPath();
        contexto.moveTo(665,142);
        contexto.lineTo(665,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//12
		contexto.beginPath();
        contexto.moveTo(680,142);
        contexto.lineTo(680,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//13
		contexto.beginPath();
        contexto.moveTo(695,142);
        contexto.lineTo(695,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//14
		contexto.beginPath();
        contexto.moveTo(710,142);
        contexto.lineTo(710,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//15
		contexto.beginPath();
        contexto.moveTo(725,142);
        contexto.lineTo(725,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
			
		//16
		contexto.beginPath();
        contexto.moveTo(740,142);
        contexto.lineTo(740,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//17
		contexto.beginPath();
        contexto.moveTo(755,142);
        contexto.lineTo(755,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//18
		contexto.beginPath();
        contexto.moveTo(770,142);
        contexto.lineTo(770,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//19
		contexto.beginPath();
        contexto.moveTo(785,142);
        contexto.lineTo(785,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//20
		contexto.beginPath();
        contexto.moveTo(800,142);
        contexto.lineTo(800,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//21
		contexto.beginPath();
        contexto.moveTo(815,142);
        contexto.lineTo(815,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//22
		contexto.beginPath();
        contexto.moveTo(830,142);
        contexto.lineTo(830,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//23
		contexto.beginPath();
        contexto.moveTo(815,145);
        contexto.lineTo(815,157);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//24
		contexto.beginPath();
        contexto.moveTo(800,172);
        contexto.lineTo(800,157);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//25
		contexto.beginPath();
        contexto.moveTo(785,190);
        contexto.lineTo(785,170);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//26
		contexto.beginPath();
        contexto.moveTo(770,204);
        contexto.lineTo(770,185);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//27
		contexto.beginPath();
        contexto.moveTo(757,217);
        contexto.lineTo(757,200);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//28
		contexto.beginPath();
        contexto.moveTo(740,233);
        contexto.lineTo(740,216);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//29
		contexto.beginPath();
        contexto.moveTo(727,245);
        contexto.lineTo(727,225);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//30	
		contexto.beginPath();
        contexto.moveTo(710,243);
        contexto.lineTo(710,225);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		//31
		contexto.beginPath();
        contexto.moveTo(695,243);
        contexto.lineTo(695,223);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke()
		//32
		contexto.beginPath();
        contexto.moveTo(725,230);
        contexto.lineTo(833,125);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=4;
        contexto.stroke();
		//33
		contexto.beginPath();
        contexto.moveTo(515,210);
        contexto.lineTo(623,123);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=4;
        contexto.stroke();
		//34
		contexto.beginPath();
        contexto.moveTo(835,123);
        contexto.lineTo(623,123);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=4;
        contexto.stroke();
		//35
		contexto.beginPath();
        contexto.moveTo(575,235);
        contexto.lineTo(575,215);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		
		//36
		contexto.beginPath();
        contexto.moveTo(560,233);
        contexto.lineTo(560,215);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		
		//37
		contexto.beginPath();
        contexto.moveTo(540,230);
        contexto.lineTo(540,210);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		
		//36
		contexto.beginPath();
        contexto.moveTo(680,242);
        contexto.lineTo(680,221);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=3;
        contexto.stroke();
		
		contexto.beginPath();
        contexto.moveTo(732,225);
        contexto.lineTo(675,221);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=4;
        contexto.stroke();
		
		contexto.beginPath();
        contexto.moveTo(520,208);
        contexto.lineTo(580,215);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=4;
        contexto.stroke();

        //arbol
		contexto.beginPath();
        contexto.moveTo(52,120);
        contexto.lineTo(52,140);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=5;
        contexto.stroke();
        
		contexto.beginPath();
        contexto.arc(50,110,10,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();  
		
        contexto.beginPath();
        contexto.arc(50,100,5,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(60,105,8,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(60,115,6,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(55,120,4,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(45,115,7,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(45,105,5,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        //caseta

        contexto.beginPath();
        contexto.moveTo(150,140);
        contexto.lineTo(150,180);
        contexto.lineTo(200,175);        
        contexto.lineTo(200,135);
        contexto.lineTo(147,140);
        contexto.lineTo(175,100);
        contexto.lineTo(206,136);
        contexto.fillStyle = '#d2b681';  
        contexto.strokeStyle = "#924f3a";
        contexto.fill();        
        contexto.stroke();

        contexto.beginPath();
        contexto.moveTo(176,100);
        contexto.lineTo(176,140);
        contexto.strokeStyle = "#924f3a";
        contexto.stroke();

        contexto.beginPath();
        contexto.moveTo(159,119);
        contexto.lineTo(176,139);
        contexto.strokeStyle = "#924f3a";
        contexto.stroke();

        contexto.beginPath();
        contexto.moveTo(193,119);
        contexto.lineTo(176,138);
        contexto.strokeStyle = "#924f3a";
        contexto.stroke();

        contexto.beginPath();
        contexto.moveTo(175,100);
        contexto.lineTo(149,80);
        contexto.lineTo(120,118); 
        contexto.lineTo(145,142);
        contexto.fillStyle = '#924f3a';  
        contexto.strokeStyle = "#924f3a";
        contexto.fill();        
        contexto.stroke();

        contexto.beginPath();
        contexto.moveTo(150,180);
        contexto.lineTo(125,145);
        contexto.lineTo(125,120);
        contexto.lineTo(149,142);
        contexto.lineTo(150,180);
        contexto.fillStyle = '#d2b681';  
        contexto.strokeStyle = "#924f3a";
        contexto.fill();        
        contexto.stroke();
        //puerta casa
        contexto.beginPath();
        contexto.moveTo(180,179);
        contexto.lineTo(180,160);
        contexto.lineTo(174,160);
        contexto.lineTo(174,180);
        contexto.fillStyle = '#2d2c20';  
        contexto.strokeStyle = "#2d2c20";
        contexto.fill();        
        contexto.stroke();

        //ventana
        contexto.beginPath();
        contexto.moveTo(169,146);
        contexto.lineTo(184,145);
        contexto.lineWidth=9;
        contexto.strokeStyle = "#2d2c20";       
        contexto.stroke();

        contexto.beginPath();
        contexto.arc(176,149,5,0,Math.PI, true);
        contexto.fillStyle = '#f3c627';  
        contexto.fill();  


        //arbol
        contexto.beginPath();
        contexto.moveTo(322,130);
        contexto.lineTo(322,150);
        contexto.strokeStyle = "brown";
        contexto.lineWidth=5;       
        contexto.stroke();

        
        contexto.beginPath();
        contexto.arc(320,120,10,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();  
        
        contexto.beginPath();
        contexto.arc(320,110,5,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(330,115,8,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(330,125,6,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(325,130,4,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(315,125,7,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(315,115,5,0,Math.PI*2, true);
        contexto.fillStyle = 'green';  
        contexto.fill();

        //arbusto

        contexto.beginPath();
        contexto.arc(280,140,8,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();  
        
        contexto.beginPath();
        contexto.arc(280,130,4,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(290,135,9,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(290,145,5,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(285,150,3,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(275,145,8,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(275,135,6,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        //arbusto

        contexto.beginPath();
        contexto.arc(300,143,8,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();  
        
        contexto.beginPath();
        contexto.arc(300,133,4,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(310,138,9,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(310,148,5,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(305,153,3,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(295,148,8,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(295,138,6,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        //arbusto      

        contexto.beginPath();
        contexto.arc(360,145,8,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();  
        
        contexto.beginPath();
        contexto.arc(360,135,4,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(370,140,9,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(370,150,5,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(365,155,3,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(355,150,8,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();

        contexto.beginPath();
        contexto.arc(355,140,6,0,Math.PI*2, true);
        contexto.fillStyle = '#458b00';  
        contexto.fill();	       
		
		// arbusto bajo
		
		contexto.beginPath();
		contexto.arc(60,470,30,0,Math.PI*2, true);
		contexto.fillStyle='#33D633';
		 contexto.strokeStyle = "#33D633";
        contexto.lineWidth=1;
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(80,450,30,0,Math.PI*2, true);
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(50,430,30,0,Math.PI*2, true);
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(30,470,30,0,Math.PI*2, true);
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(60,470,30,0,Math.PI*2, true);
		contexto.fill();
		contexto.stroke();
		// frutos
		contexto.beginPath();
		contexto.arc(60,470,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0000';
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(65,478,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0066';
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(40,470,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0000';
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(30,450,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0000';
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(25,420,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0066';
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(43,420,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0000';
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(43,440,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0000';
		contexto.fill();
		contexto.stroke();

		contexto.beginPath();
		contexto.arc(60,445,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0066';
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(95,445,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0000';
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(15,460,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0000';
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(15,480,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0066';
		contexto.fill();
		contexto.stroke();
		
		contexto.beginPath();
		contexto.arc(70,420,3,0,Math.PI*2, true);
		contexto.fillStyle='#FF0000';
		contexto.fill();
		contexto.stroke();

		
		/*
		contexto.beginPath();
        contexto.moveTo(570,260);
        contexto.lineTo(570,210);
        contexto.strokeStyle = "white";
        contexto.lineWidth=5;
        contexto.stroke();
		
		contexto.beginPath();
        contexto.moveTo(575,215);
        contexto.lineTo(525,200);
        contexto.strokeStyle = "white";
        contexto.lineWidth=5;
        contexto.stroke();
		*/
		
		// arbusto 
		/*
		contexto.beginPath();
        contexto.arc(300,300,62,0,Math.PI*2, true);
        contexto.fillStyle = 'white';  
        contexto.fill();
		*/		 
}