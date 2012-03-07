/**
 * @classDescription Creates a ViewPort for observing the world from different points of view
 *
 * @param  {}  
 * @return {ViewPort}
 * @constructor
 */

function ViewPort(reference_frame, view_distance){
    this.reference_frame = reference_frame
    this.zv = view_distance
    this.canvas_pos = [0, 0]
}

ViewPort.prototype.coords_of = function(vector){
    return this.reference_frame.coords_of(vector)
}

ViewPort.prototype.project = function(vector){
  var v = this.coords_of(vector).get_coord()
  var f= this.zv/(this.zv - v.Coord[2]) 
  return [v[0] * f, v[1] * f]
}

ViewPort.prototype.screen_coord = function(vector){
    var sc = this.project(vector)
    return [sc[0] + this.canvas_pos[0], sc[1] + this.canvas_pos[1]]
}
