// This is more an expectation than real software

function World3D(){
  this.dpi = parseInt(document.getElementById('ppitest').offsetWidth) // todo: Use vertical and horizontal dpi
  this.current_unit = "mm"
  this.unit = { mm: 25.4, cm: 2.54, dm: 0.254, m:0.0254, km: 0.0000254 }  //todo: provide a whole list of units.
                                                                          //todo: avoid creating the units in each instance

  this.point_of_view = new Vector(0,0,1000)
  this.canvas = document.getElementById("worldCanvas")
    this.view = { /* todo: make the views as a class */
	main: { width: parseInt(this.canvas.width), height: parseInt(this.canvas.height) }
    }
  //todo: provide a scale for every view
  this.view_scale = this.dpi / this.unit[this.current_unit] 
}

World3D.initialize = function(){
  Vector.prototype.world  = new World3D()
}

World3D.prototype.draw_line = function(coord3D){
    var that = this
    function wp(coord){  // stands for world projection
      return that.view_scale * coord
    }
  var XS = this.view.main.width / 2 //todo: change the variable names to smthing more verbose.
  var YS = this.view.main.height / 2
  var factor = this.point_of_view.Coord[2] / (this.point_of_view.Coord[2] - coord3D[2] )
    var x =  wp(factor * coord3D[0]) + XS
    var y = wp(-factor * coord3D[1]) + YS
  var cxt = this.canvas.getContext("2d");
  cxt.moveTo(XS,YS);
    cxt.lineTo(x,y);
  cxt.stroke();
}


Vector.prototype.draw = function(){
  this.world.draw_line(this.Coord)
}
