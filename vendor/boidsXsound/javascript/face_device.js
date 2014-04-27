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
// cambiar nombre del mensaje
FaceDevice.prototype.attend_face_boid_animation = function(date, mssg){
	//alert("Llega el mensaje, bien cojones!!!")
  this.gates[0].init_animation()
}