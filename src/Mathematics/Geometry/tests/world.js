// This is more an expectation than real software

function World3D(){
  this.point_of_view = new Vector(0,0,1)
  this.canvas = document.getElementById("worldCanvas")
}


World3D.initialize = function(){
  Vector.prototype.world  = new World3D()
}

World3D.prototype.draw_line = function(coord3D){
  var XS = 100
  var YS = 50
  var factor = this.point_of_view.Coord[2] / (this.point_of_view.Coord[2] - coord3D[2] )
  var x =  factor * coord3D[0] + XS
  var y = -factor * coord3D[1] + YS
  var cxt = this.canvas.getContext("2d");
  cxt.moveTo(XS,YS);
  cxt.lineTo(x,y);
  cxt.stroke();
}


Vector.prototype.draw = function(){
  this.world.draw_line(this.Coord)
}
