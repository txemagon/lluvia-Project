
function print_line(){
	var canvas=document.getElementById("myCanvas");
	var ctx =canvas.getContext("2d");
	
	var myLine=new Line ();
	myLine.initial_point=[0,0];
	myLine.final_point=[180,180];
	alert(myLine.initial_point);
	alert(myLine.final_point);

	ctx.moveTo(myLine.initial_point[0],myLine.initial_point[1]);
	ctx.lineTo(myLine.final_point[0],myLine.final_point[1]);

	ctx.stroke()
}

