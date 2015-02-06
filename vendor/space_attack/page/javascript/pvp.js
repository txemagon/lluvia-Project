function draw(){
	var c = document.getElementById("mundo");
    var ctx = c.getContext("2d");
    var img = document.getElementById("ship");
    ctx.drawImage(img,120,100, 50, 50);
}