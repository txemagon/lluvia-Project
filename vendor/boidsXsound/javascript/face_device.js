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

FaceDevice.prototype.attend_face_boid = function(date, mssg){
	alert("Llega el mensaje, bien cojones!!!")
}