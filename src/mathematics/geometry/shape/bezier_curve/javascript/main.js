window.addEventListener("load", ini, false)
var canvas = null
var ctx = null
var a, b, c, d, e = null
var o = null
function ini(){
    canvas = document.getElementById("canvas") 
    ctx = canvas.getContext("2d")
    a = new Point(1, 3)
    b = new Point(200, 500)
    c = new Point(300, 300)
    d = new Point(500, 600)
    e = new Point(200, 100)
    o = new Bezier(a, b, c, d, e)
    update_bezier(0.01)
    paint() 
}

function update_bezier(r){
    o.raster(r)
}

function paint(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle  = "black";
    ctx.lineWidth  = 3;
    ctx.lineCap  = 'square';
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(d.x, d.y);
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(e.x, e.y);
    ctx.stroke();
    ctx.closePath()

    for(var i=0; i<o.trail.length; i+= 1)
        paint_point(o.trail[i])
}

function paint_point(point){
    ctx.beginPath()
    ctx.fillStyle  = "black"
    ctx.arc(point.x, point.y, 3, 0, (Math.PI/180)*360, false)
    ctx.fill()
    ctx.closePath()
}
