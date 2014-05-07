/**
 * @class FaceDevice
 * 
 * Description 
 *
 * @param {} 
 *
 * @constructor
*/

FaceDevice.prototype = new Device 
FaceDevice.prototype.constructor = FaceDevice

function FaceDevice(view){
  var that = this
  var args = arguments
  
  /* Events */
  this.self_events = []
  
  function initialize(){
    Device.call(that, view)
    that.newGate("face", FaceBoid)
  }
  
  if (arguments.length)
    initialize()

}

FaceDevice.prototype.attend_face_boid_animation = function(date, mssg){
  //alert(mssg.event.face_boid_animation.data.level_emotion)
  var actual_boid = mssg.event.face_boid_animation.data
  this.gates[0].init_animation(actual_boid)
}