
Bull.prototype = new Boid
Bull.prototype.constructor = Bull
function Bull(){
  return Boid.apply(this, arguments)
}

Bull.prototype.draw = function(ctx){
  var p = this.geo_data.position;
  var v = this.geo_data.velocity;
  var a = this.geo_data.acceleration;

  var torete = new Image();

  torete.src = "images/torete.png";
  var angle = this.heading().angle(0,1)
  var x = p.get_coord(0)
  var y = p.get_coord(1)
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.drawImage(torete, 0, 0, 50, 50);
  ctx.rotate(-angle)
  ctx.translate(-x, -y)
  

/*
  ctx.fillStyle = this.colour
  ctx.strokeStyle = "black"
  ctx.beginPath();
  ctx.arc(p.get_coord(0), p.get_coord(1), 10, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(p.get_coord(0), p.get_coord(1), 12, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.stroke()
*/


  if (this.focused){
    ctx.strokeStyle = "red"
    ctx.beginPath();
    ctx.arc(p.get_coord(0), p.get_coord(1), 18, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke()
  }


  /* Speed */
  ctx.strokeStyle = "black"  
  ctx.beginPath();
  ctx.moveTo(p.get_coord(0), p.get_coord(1))
  ctx.lineTo(p.get_coord(0) + v.get_coord(0), p.get_coord(1) + v.get_coord(1))
  ctx.closePath();
  ctx.stroke()
  
  /* Acceleration */
  ctx.strokeStyle = "red"  
  ctx.beginPath();
  ctx.moveTo(p.get_coord(0), p.get_coord(1))
  ctx.lineTo(p.get_coord(0) + a.get_coord(0), p.get_coord(1) + a.get_coord(1))
  ctx.closePath();
  ctx.stroke()
  /*
  if (this.target && this.target != this){
  /* Displacement to target 
  ctx.beginPath();
  ctx.moveTo(p.get_coord(0), p.get_coord(1))
  ctx.lineTo(p.get_coord(0) + this.target_at().get_coord(0), p.get_coord(1) + this.target_at().get_coord(1))
  ctx.closePath();
  ctx.stroke()

  if (this.target != this){
    var p_target = this.target_data().position
  /*
    // Desired Velocity 
    ctx.strokeStyle = "black"  
    ctx.beginPath();
    ctx.moveTo(p.get_coord(0), p.get_coord(1))
    ctx.lineTo(p.get_coord(0) + this.desired_velocity().get_coord(0), p.get_coord(1) + this.desired_velocity().get_coord(1))
    ctx.closePath();
    ctx.stroke()
  
   
   // Approach distance
    ctx.strokeStyle = "black"
    ctx.beginPath();
    ctx.arc(p_target.get_coord(0), p_target.get_coord(1), this.approach_distance, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.stroke();

    // Arrival distance
    var arrival_distance = this.target_at().module()
    if (this.approach_distance > arrival_distance ){
      ctx.strokeStyle = "red"
      ctx.beginPath();
      ctx.arc(p_target.get_coord(0), p_target.get_coord(1), arrival_distance, 0, Math.PI*2, true); 
      ctx.closePath();
      ctx.stroke();
    }
    
    }
  }
  */
}