function draw_player(){
	var c = document.getElementById("mundo");
    var ctx = c.getContext("2d");
    var img = document.getElementById("ship");
    ctx.drawImage(img,125,110, 40, 40);
}

function draw_planets(){
	var c = document.getElementById("mundo");
    var ctx = c.getContext("2d");
    var img = document.getElementById("planet1");
    ctx.drawImage(img,40,100, 50, 25);
    var img = document.getElementById("planet2");
    ctx.drawImage(img,100,10, 50, 30);
    var img = document.getElementById("planet3");
    ctx.drawImage(img,200,80, 50, 40);
    var img = document.getElementById("planet4");
    ctx.drawImage(img,10,50, 50, 30);
    var img = document.getElementById("planet5");
    ctx.drawImage(img,80,50, 50, 30);
    var img = document.getElementById("planet6");
    ctx.drawImage(img,250,10, 50, 30);
}

function planet1(){
    window.location.href="planet1.html";
}


