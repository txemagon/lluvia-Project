World.prototype.draw_background = function(ctx){

        //cielo
        ctx.fillStyle = '#B5CDFF';
        ctx.fillRect (0, 0, 852, 502);

        // sol
        ctx.beginPath();
        ctx.arc(50,40,30,0,Math.PI*2, true);      
        ctx.fillStyle="yellow";
        ctx.fillStyle = 'yellow';
        ctx.shadowBlur=80;
        ctx.shadowOffsetX=-20;
        ctx.shadowOffsetY=-10;
        ctx.shadowColor="yellow"       
        ctx.fill();

	        //nubes
		ctx.beginPath();
        ctx.arc(800,100,41,0,Math.PI*2, true);    
        ctx.fillStyle = 'white';    
        ctx.fill();
		ctx.beginPath();
        ctx.arc(140,100,62,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();  
        ctx.arc(200,100,62,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();  
        //ctx.fillStyle="rgba(232,236,247,0.5)";
		ctx.beginPath();
        ctx.arc(300,100,62,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();  
        //ctx.fillStyle="rgba(232,236,247,0.5)";
        ctx.beginPath();
        ctx.arc(350,100,80,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();  
		//ctx.fillStyle="rgba(232,236,247,0.5)";
        ctx.beginPath();
        ctx.arc(455,100,46,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();  
        ctx.beginPath();
        ctx.arc(500,100,30,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();  
        ctx.beginPath();
        ctx.arc(573,100,62,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();  
        ctx.beginPath();
        ctx.arc(640,100,25,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();  
        ctx.beginPath();
        ctx.arc(700,100,44,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();  
        ctx.beginPath();
        ctx.arc(746,100,23,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();  
        ctx.beginPath();
        ctx.arc(850,120,45,0,Math.PI*2, true);        
        ctx.fillStyle = 'white';  
        ctx.fill();  	
		
		
		//cesped
		ctx.beginPath();
		var gr=ctx.createLinearGradient(0,150,0,280);
		gr.addColorStop(0,"#6B8E23");
		gr.addColorStop(1,"#9ACD32");
		ctx.fillStyle=gr;
		ctx.fillRect(0,120,852, 502);
		ctx.fill();
		// corral
		//1
		ctx.beginPath();
        ctx.moveTo(518,227);
        ctx.lineTo(518,205);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
		/*ctx.shadowOffsetX=10;
        ctx.shadowOffsetY=10;
        ctx.shadowColor="black";
        ctx.shadowBlur=20;*/
        ctx.stroke();
		//2
		ctx.beginPath();
        ctx.moveTo(530,220);
        ctx.lineTo(530,198);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
		/*ctx.shadowOffsetX=10;
        ctx.shadowOffsetY=10;
        ctx.shadowColor="black";
        ctx.shadowBlur=20;*/
        ctx.stroke();
		//3
		ctx.beginPath();
        ctx.moveTo(545,209);
        ctx.lineTo(545,188);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
		ctx.shadowOffsetX=20;
        ctx.shadowOffsetY=25;
        ctx.shadowColor="black";
        ctx.shadowBlur=80;
        ctx.stroke();
		//4
		ctx.beginPath();
        ctx.moveTo(560,192);
        ctx.lineTo(560,175);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//5
		ctx.beginPath();
        ctx.moveTo(575,181);
        ctx.lineTo(575,164);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//6
		ctx.beginPath();
        ctx.moveTo(590,167);
        ctx.lineTo(590,150);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//7
		ctx.beginPath();
        ctx.moveTo(605,153);
        ctx.lineTo(605,135);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//8
		ctx.beginPath();
        ctx.moveTo(620,142);
        ctx.lineTo(620,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//9
		ctx.beginPath();
        ctx.moveTo(635,142);
        ctx.lineTo(635,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//10
		ctx.beginPath();
        ctx.moveTo(650,142);
        ctx.lineTo(650,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//11
		ctx.beginPath();
        ctx.moveTo(665,142);
        ctx.lineTo(665,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//12
		ctx.beginPath();
        ctx.moveTo(680,142);
        ctx.lineTo(680,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//13
		ctx.beginPath();
        ctx.moveTo(695,142);
        ctx.lineTo(695,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//14
		ctx.beginPath();
        ctx.moveTo(710,142);
        ctx.lineTo(710,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//15
		ctx.beginPath();
        ctx.moveTo(725,142);
        ctx.lineTo(725,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
			
		//16
		ctx.beginPath();
        ctx.moveTo(740,142);
        ctx.lineTo(740,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//17
		ctx.beginPath();
        ctx.moveTo(755,142);
        ctx.lineTo(755,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//18
		ctx.beginPath();
        ctx.moveTo(770,142);
        ctx.lineTo(770,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//19
		ctx.beginPath();
        ctx.moveTo(785,142);
        ctx.lineTo(785,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//20
		ctx.beginPath();
        ctx.moveTo(800,142);
        ctx.lineTo(800,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//21
		ctx.beginPath();
        ctx.moveTo(815,142);
        ctx.lineTo(815,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//22
		ctx.beginPath();
        ctx.moveTo(830,142);
        ctx.lineTo(830,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//23
		ctx.beginPath();
        ctx.moveTo(815,145);
        ctx.lineTo(815,157);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//24
		ctx.beginPath();
        ctx.moveTo(800,172);
        ctx.lineTo(800,157);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//25
		ctx.beginPath();
        ctx.moveTo(785,190);
        ctx.lineTo(785,170);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//26
		ctx.beginPath();
        ctx.moveTo(770,204);
        ctx.lineTo(770,185);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//27
		ctx.beginPath();
        ctx.moveTo(757,217);
        ctx.lineTo(757,200);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//28
		ctx.beginPath();
        ctx.moveTo(740,233);
        ctx.lineTo(740,216);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//29
		ctx.beginPath();
        ctx.moveTo(727,245);
        ctx.lineTo(727,225);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//30	
		ctx.beginPath();
        ctx.moveTo(710,243);
        ctx.lineTo(710,225);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		//31
		ctx.beginPath();
        ctx.moveTo(695,243);
        ctx.lineTo(695,223);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke()
		//32
		ctx.beginPath();
        ctx.moveTo(725,230);
        ctx.lineTo(833,125);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=4;
        ctx.stroke();
		//33
		ctx.beginPath();
        ctx.moveTo(515,210);
        ctx.lineTo(623,123);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=4;
        ctx.stroke();
		//34
		ctx.beginPath();
        ctx.moveTo(835,123);
        ctx.lineTo(623,123);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=4;
        ctx.stroke();
		//35
		ctx.beginPath();
        ctx.moveTo(575,235);
        ctx.lineTo(575,215);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		
		//36
		ctx.beginPath();
        ctx.moveTo(560,233);
        ctx.lineTo(560,215);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		
		//37
		ctx.beginPath();
        ctx.moveTo(540,230);
        ctx.lineTo(540,210);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		
		//36
		ctx.beginPath();
        ctx.moveTo(680,242);
        ctx.lineTo(680,221);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=3;
        ctx.stroke();
		
		ctx.beginPath();
        ctx.moveTo(732,225);
        ctx.lineTo(675,221);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=4;
        ctx.stroke();
		
		ctx.beginPath();
        ctx.moveTo(520,208);
        ctx.lineTo(580,215);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=4;
        ctx.stroke();

        //arbol
		ctx.beginPath();
        ctx.moveTo(52,120);
        ctx.lineTo(52,140);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=5;
        ctx.stroke();
        
		ctx.beginPath();
        ctx.arc(50,110,10,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();  
		
        ctx.beginPath();
        ctx.arc(50,100,5,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(60,105,8,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(60,115,6,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(55,120,4,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(45,115,7,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(45,105,5,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        //caseta

        ctx.beginPath();
        ctx.moveTo(150,140);
        ctx.lineTo(150,180);
        ctx.lineTo(200,175);        
        ctx.lineTo(200,135);
        ctx.lineTo(147,140);
        ctx.lineTo(175,100);
        ctx.lineTo(206,136);
        ctx.fillStyle = '#d2b681';  
        ctx.strokeStyle = "#924f3a";
        ctx.fill();        
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(176,100);
        ctx.lineTo(176,140);
        ctx.strokeStyle = "#924f3a";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(159,119);
        ctx.lineTo(176,139);
        ctx.strokeStyle = "#924f3a";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(193,119);
        ctx.lineTo(176,138);
        ctx.strokeStyle = "#924f3a";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(175,100);
        ctx.lineTo(149,80);
        ctx.lineTo(120,118); 
        ctx.lineTo(145,142);
        ctx.fillStyle = '#924f3a';  
        ctx.strokeStyle = "#924f3a";
        ctx.fill();        
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(150,180);
        ctx.lineTo(125,145);
        ctx.lineTo(125,120);
        ctx.lineTo(149,142);
        ctx.lineTo(150,180);
        ctx.fillStyle = '#d2b681';  
        ctx.strokeStyle = "#924f3a";
        ctx.fill();        
        ctx.stroke();
        //puerta casa
        ctx.beginPath();
        ctx.moveTo(180,179);
        ctx.lineTo(180,160);
        ctx.lineTo(174,160);
        ctx.lineTo(174,180);
        ctx.fillStyle = '#2d2c20';  
        ctx.strokeStyle = "#2d2c20";
        ctx.fill();        
        ctx.stroke();

        //ventana
        ctx.beginPath();
        ctx.moveTo(169,146);
        ctx.lineTo(184,145);
        ctx.lineWidth=9;
        ctx.strokeStyle = "#2d2c20";       
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(176,149,5,0,Math.PI, true);
        ctx.fillStyle = '#f3c627';  
        ctx.fill();  


        //arbol
        ctx.beginPath();
        ctx.moveTo(322,130);
        ctx.lineTo(322,150);
        ctx.strokeStyle = "brown";
        ctx.lineWidth=5;       
        ctx.stroke();

        
        ctx.beginPath();
        ctx.arc(320,120,10,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();  
        
        ctx.beginPath();
        ctx.arc(320,110,5,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(330,115,8,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(330,125,6,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(325,130,4,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(315,125,7,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(315,115,5,0,Math.PI*2, true);
        ctx.fillStyle = 'green';  
        ctx.fill();

        //arbusto

        ctx.beginPath();
        ctx.arc(280,140,8,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();  
        
        ctx.beginPath();
        ctx.arc(280,130,4,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(290,135,9,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(290,145,5,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(285,150,3,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(275,145,8,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(275,135,6,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        //arbusto

        ctx.beginPath();
        ctx.arc(300,143,8,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();  
        
        ctx.beginPath();
        ctx.arc(300,133,4,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(310,138,9,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(310,148,5,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(305,153,3,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(295,148,8,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(295,138,6,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        //arbusto      

        ctx.beginPath();
        ctx.arc(360,145,8,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();  
        
        ctx.beginPath();
        ctx.arc(360,135,4,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(370,140,9,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(370,150,5,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(365,155,3,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(355,150,8,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();

        ctx.beginPath();
        ctx.arc(355,140,6,0,Math.PI*2, true);
        ctx.fillStyle = '#458b00';  
        ctx.fill();	       
		
		// arbusto bajo
		
		ctx.beginPath();
		ctx.arc(60,470,30,0,Math.PI*2, true);
		ctx.fillStyle='#33D633';
		 ctx.strokeStyle = "#33D633";
        ctx.lineWidth=1;
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(80,450,30,0,Math.PI*2, true);
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(50,430,30,0,Math.PI*2, true);
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(30,470,30,0,Math.PI*2, true);
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(60,470,30,0,Math.PI*2, true);
		ctx.fill();
		ctx.stroke();
		// frutos
		ctx.beginPath();
		ctx.arc(60,470,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0000';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(65,478,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0066';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(40,470,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0000';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(30,450,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0000';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(25,420,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0066';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(43,420,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0000';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(43,440,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0000';
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(60,445,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0066';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(95,445,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0000';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(15,460,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0000';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(15,480,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0066';
		ctx.fill();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(70,420,3,0,Math.PI*2, true);
		ctx.fillStyle='#FF0000';
		ctx.fill();
		ctx.stroke();

		
		/*
		ctx.beginPath();
        ctx.moveTo(570,260);
        ctx.lineTo(570,210);
        ctx.strokeStyle = "white";
        ctx.lineWidth=5;
        ctx.stroke();
		
		ctx.beginPath();
        ctx.moveTo(575,215);
        ctx.lineTo(525,200);
        ctx.strokeStyle = "white";
        ctx.lineWidth=5;
        ctx.stroke();
		*/
		
		// arbusto 
		/*
		ctx.beginPath();
        ctx.arc(300,300,62,0,Math.PI*2, true);
        ctx.fillStyle = 'white';  
        ctx.fill();
		*/		 
}