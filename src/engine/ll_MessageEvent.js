/**
 * @author txema
 */

/* Example event

"sync": {	type    : "synchronous", 					// Message type
					name: "app_down",
					creation: {creator: null, time: null}, 		// Reference to creator object and creation time
					current : 0, 								// Index of current status.
					status  : ["sent", "attended", "closed"]},	// Valid object status
					event   : {
						"app_down": null						// Inner data specific to the particular event
					}
					this.rId = null;							// Inqueue assigned id
		}			
*/

var systemEv = (function(){

      	
	return (function $_sev(type, event, behalf){ 
		var args = arguments
		function setup(){
			var sEvs = {
		"sync": {	type    : "synchronous", 					// Message type
					name	: null,
					creation: {creator: null, time: null}, 		// Reference to creator object and creation time
					current : 0, 								// Index of current status.
					status  : ["sent", "attended", "closed"],	// Valid object status
					event   : {}
				 }
				}								
                  newOb = sEvs[type]
			newOb.name             = event.name
			newOb.event[event.name]= event
			newOb.creation.creator = (typeof (behalf) === "object")? behalf : null 
			newOb.creation.time    = new Date()
			return newOb
		}
		var ob_msg = setup(  )
		$_sev.yield(ob_msg)
		return  ob_msg; })
	
	})()
	
	/* 
	 * Syntax:
	 * 
	 * SystemEv(<type_of_message>, {name: <message_name>, data: <extra_data>}[, <creator_reference>] [, <setup_function>] )
	 * 
	 * You can provide an specific setup function for a particular message
	 * 
	 * Example of use:
	 * 
	 * alert(systemEv("sync", {name: "activated", data: "no extra data available"}).toSource())
	 * 
	 * systemEv("sync", {name: "activated", data: "no extra data available"}, function(p){alert(p.toSource());})
	 * 
	 * systemEv("sync", {name: "activated", data: "no extra data available"}, new Date(), function(p){alert(p.toSource());})
	 * 
	 systemEv( "sync", {name: "activated", data: "no extra data     available"}, 
       new Date(), 
       function(msg){
         msg.event["activated"].data = "this is an activation message";    
         alert(msg.toSource());
    }
) 
	 */
	

