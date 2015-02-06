

(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var KEY_ENTER=13;
    var KEY_SPACE=32;
    var KEY_LEFT=37;
    var KEY_RIGHT=39;

    var canvas=null,ctx=null;
    var lastPress=null;
    var pressing=[];
    var pause=true;
    var gameover=true;
    var score=0;
    var multishot=1;
    var elapsedTime=0;
    var player=new Rectangle(90,280,10,10,0,3);
    var shots=[];
    var enemies=[];
    var powerups=[];
    var messages=[];
    var spritesheet=new Image();
    spritesheet.src='../images/ships/player.png';

    function random(max){
        return ~~(Math.random()*max);
    }

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=200;
        canvas.height=300;
        
        run();
        repaint();
    }

    function run(){
        setTimeout(run,50);
        act(0.05);
    }

    function repaint(){
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function reset(){
        score=0;
        multishot=1;
        player.x=90;
        player.y=280;
        player.health=3;
        player.timer=0;
        shots.length=0;
        powerups.length=0;
        messages.length=0;
        gameover=false;
    }

    function act(deltaTime){
        if(!pause){
            // GameOver Reset
            if(gameover)
                reset();
            
            // Move Player
            //if(pressing[KEY_UP])
            //    player.y-=10;
            if(pressing[KEY_RIGHT])
                player.x+=10;
            //if(pressing[KEY_DOWN])
            //    player.y+=10;
            if(pressing[KEY_LEFT])
                player.x-=10;

            // Out Screen
            if(player.x>canvas.width-player.width)
                player.x=canvas.width-player.width;
            if(player.x<0)
                player.x=0;
            
            // New Shot
            if(lastPress==KEY_SPACE){
                if(multishot==3){
                    shots.push(new Rectangle(player.x-3,player.y+2,5,5));
                    shots.push(new Rectangle(player.x+3,player.y,5,5));
                    shots.push(new Rectangle(player.x+9,player.y+2,5,5));
                }
                else if(multishot==2){
                    shots.push(new Rectangle(player.x,player.y,5,5));
                    shots.push(new Rectangle(player.x+5,player.y,5,5));
                }
                else
                    shots.push(new Rectangle(player.x+3,player.y,5,5));
                lastPress=null;
            }
            
            // Move Shots
            for(var i=0,l=shots.length;i<l;i++){
                shots[i].y-=10;
                if(shots[i].y<0){
                    shots.splice(i--,1);
                    l--;
                }
            }
            
            // Move Messages
            for(var i=0,l=messages.length;i<l;i++){
                messages[i].y+=2;
                if(messages[i].y<260){
                    messages.splice(i--,1);
                    l--;
                }
            }
            
            // Move PowerUps
            for(var i=0,l=powerups.length;i<l;i++){
                powerups[i].y+=5;
                // Powerup Outside Screen
                if(powerups[i].y>canvas.height){
                    powerups.splice(i--,1);
                    l--;
                    continue;
                }
                
                // Player intersects
                if(player.intersects(powerups[i])){
                    if(powerups[i].type==1){ // MultiShot
                        if(multishot<3){
                            multishot++;
                            messages.push(new Message('MULTI',player.x,player.y));
                        }
                        else{
                            score+=5;
                            messages.push(new Message('+5',player.x,player.y));
                        }
                    }
                    else{ // ExtraPoints
                        score+=5;
                        messages.push(new Message('+5',player.x,player.y));
                    }
                    powerups.splice(i--,1);
                    l--;
                }
            }
             
            
            // Elapsed time
            elapsedTime+=deltaTime;
            if(elapsedTime>3600)
                elapsedTime-=3600;
            
            // Damaged
            if(player.timer>0)
                player.timer--;
            
            // GameOver
            if(player.health<1){
                gameover=true;
                pause=true;
            }
        }
        // Pause/Unpause
        if(lastPress==KEY_ENTER){
            pause=!pause;
            lastPress=null;
        }
    }

    function paint(ctx){
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        ctx.strokeStyle='#0f0';
        if(player.timer%2==0)
            //player.fill(ctx);
            player.drawImageArea(ctx,spritesheet,(~~(elapsedTime*10)%3)*10,0,10,10);
        for(var i=0,l=powerups.length;i<l;i++){
            if(powerups[i].type==1){
                ctx.strokeStyle='#f90';
                powerups[i].drawImageArea(ctx,spritesheet,50,0,10,10);
            }
            else{
                ctx.strokeStyle='#cc6';
                powerups[i].drawImageArea(ctx,spritesheet,60,0,10,10);
            }
            //powerups[i].fill(ctx);
        }
        for(var i=0,l=enemies.length;i<l;i++){
            if(enemies[i].timer%2==0){
                ctx.strokeStyle='#00f';
                enemies[i].drawImageArea(ctx,spritesheet,30,0,10,10);
            }
            else{
                ctx.strokeStyle='#fff';
                enemies[i].drawImageArea(ctx,spritesheet,40,0,10,10);
            }
            //enemies[i].fill(ctx);
        }
        ctx.strokeStyle='#f00';
        for(var i=0,l=shots.length;i<l;i++)
            //shots[i].fill(ctx);
            shots[i].drawImageArea(ctx,spritesheet,70,(~~(elapsedTime*10)%2)*5,5,5);
        
        ctx.fillStyle='#fff';
        for(var i=0,l=messages.length;i<l;i++)
            ctx.fillText(messages[i].string,messages[i].x,messages[i].y);
        ctx.fillText('Score: '+score,0,20);
        ctx.fillText('Health: '+player.health,150,20);
        //ctx.fillText('Last Press: '+lastPress,0,20);
        //ctx.fillText('Shots: '+shots.length,0,30);
        if(pause){
            ctx.textAlign='center';
            if(gameover)
                ctx.fillText('GAME OVER',100,150);
            else
                ctx.fillText('PAUSE',100,150);
            ctx.textAlign='left';
        }
    }

    document.addEventListener('keydown',function(evt){
        lastPress=evt.keyCode;
        pressing[evt.keyCode]=true;
    },false);

    document.addEventListener('keyup',function(evt){
        pressing[evt.keyCode]=false;
    },false);

    function Rectangle(x,y,width,height,type,health){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
        this.type=(type==null)?1:type;
        this.health=(health==null)?1:health;
        this.timer=0;
    }

    Rectangle.prototype.intersects=function(rect){
        if(rect!=null){
            return(this.x<rect.x+rect.width&&
                this.x+this.width>rect.x&&
                this.y<rect.y+rect.height&&
                this.y+this.height>rect.y);
        }
    }
    
    Rectangle.prototype.fill=function(ctx){
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    Rectangle.prototype.drawImageArea=function(ctx,img,sx,sy,sw,sh){
        if(img.width)
            ctx.drawImage(img,sx,sy,sw,sh,this.x,this.y,this.width,this.height);
        else
            ctx.strokeRect(this.x,this.y,this.width,this.height);
    }

    function Message(string,x,y){
        this.string=(string==null)?'?':string;
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
    }

    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();


/*
function game() {
	"use strict"
	window.addEventListener('load', draw_player, false);

	var lastPress=null;
	var x=1000;
	var pause = true;
	var pressing = [];
	var spritesheet = new Image();
	spritesheet.src = "../images/player.png";

	var KEY_LEFT=37;
	var KEY_RIGHT=39;
	var KEY_ENTER=13;
	var KEY_SPACE=32;


	Rectangle.prototype.drawImageArea = function(ctx, img, sx, sy,sw, sh) {
		if (img.width)
			ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
		else
			ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

	function draw_player() {
		var c = document.getElementById("mundo");
    	var ctx = c.getContext("2d");
    	var img = document.getElementById("ship");
    	ctx.drawImage(img,125,110, 40, 40);
    	run();
    	repaint();
	}

	function draw_enemy() {
		var c = document.getElementById("mundo");
   	 	var ctx = c.getContext("2d");
    	var img = document.getElementById("enemy");
    	ctx.drawImage(img,110,10, 70, 40); //X, Y, Ancho, Largo
	}

	function run() {
		setTimeout(run, 50);
		player_move();
	}

	function repaint() {
		requestAnimationFrame(repaint);
		draw_player(img);
	}

	function player_move() {

		if (!pause){
			//Cambiar direccion de la nave
			if (pressing[KEY_LEFT])
				dir = 0;
			if (pressing[KEY_RIGHT])
				dir = 1;

			if (dir == 0)
				x -= 10;
			if (dir == 1)
				x += 10;

			//Para que no se salga del canvas
			if (x > c.width)
				x = 0;
			if (x < c.width)
				x = c.width;
		}

		//Pause-Play
		if (lastPress == KEY_ENTER) {
			pause =! pause;
			lastPress = null;
		}
	}

	document.addEventListener('keydown',function(evt){
    	lastPress=evt.keyCode;
    	pressing[evt.keyCode]=true;
	},false);

	document.addEventListener('keyup',function(evt){
    	pressing[evt.keyCode]=false;
	},false);

}
*/