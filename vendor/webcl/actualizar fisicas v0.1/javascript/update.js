

function loadKernel(id){
    var kernelElement = document.getElementById(id);
    var kernelSource = kernelElement.text;
    if (kernelElement.src != "") {
	   var mHttpReq = new XMLHttpRequest();
	   mHttpReq.open("GET", kernelElement.src, false);
	   mHttpReq.send(null);
	   kernelSource = mHttpReq.responseText;
    } 
    return kernelSource;
}


var ctx = null
var kernelSrc = null
var program = null
var device = null
var kernel = null

var bufSize = null
var buf_sp_y = null
var buf_sp_x = null
var buf_ac_y = null
var buf_ac_x = null
var buf_pos_y = null
var buf_pos_x = null
function init_gpu(){
	try {
		// First check if the WebCL extension is installed at all 
		if (window.webcl == undefined) {
		    alert("Unfortunately your system does not support WebCL. " +
			    "Make sure that you have both the OpenCL driver " +
			    "and the WebCL browser extension installed.");
		    return false;
		}
		ctx = webcl.createContext ();

		// Create and build program for the first device
		kernelSrc = loadKernel("clProgramVectorAdd");
		program = ctx.createProgram(kernelSrc);
		device = ctx.getInfo(WebCL.CONTEXT_DEVICES)[0];

		try {
		    program.build ([device], "");
		} catch(e) {
		    alert ("Failed to build WebCL program. Error "
			    + program.getBuildInfo (device, 
				WebCL.PROGRAM_BUILD_STATUS)
			    + ":  " 
			    + program.getBuildInfo (device, 
				WebCL.PROGRAM_BUILD_LOG));
		    throw e;
		}

		kernel = program.createKernel ("ckVectorAdd");

			// Reserve buffers
		bufSize = vectorLength * 4; // size in bytes
		//output.innerHTML += "<br>Buffer size: " + bufSize + " bytes";
		buf_sp_y = ctx.createBuffer (WebCL.MEM_READ_WRITE, bufSize);
		buf_sp_x = ctx.createBuffer (WebCL.MEM_READ_WRITE, bufSize);
		buf_ac_y = ctx.createBuffer (WebCL.MEM_READ_WRITE, bufSize);
		buf_ac_x = ctx.createBuffer (WebCL.MEM_READ_WRITE, bufSize);
		buf_pos_y = ctx.createBuffer (WebCL.MEM_READ_WRITE, bufSize);
		buf_pos_x = ctx.createBuffer (WebCL.MEM_READ_WRITE, bufSize);
	} catch(e) {
	               document.getElementById("output").innerHTML 
	               += "ERROR 2" + "<h3>ERROR:</h3><pre style=\"color:red;\">" + e.message + "</pre>";
	               //throw e;
	               return false
    }
    return true
}


var cmdQueue = null
var localWS = null
var globalWS = null
function update(delta_time) {
	try{

    // All output is written to element by id "output"
    //var output = document.getElementById("output");
    //output.innerHTML = "";

    

	// Generate input vectors
	
	

	//output.innerHTML += "<br>Vector length = " + vectorLength;
	// Setup WebCL context using the default device

	// Create kernel and set arguments
	
	kernel.setArg (0, buf_pos_y);
	kernel.setArg (1, buf_pos_x); 
	kernel.setArg (2, buf_sp_y);
	kernel.setArg (3, buf_sp_x);
	kernel.setArg (4, buf_ac_y);
	kernel.setArg (5, buf_ac_x);
	kernel.setArg (6, new Float32Array([delta_time]));
	kernel.setArg (7, new Uint32Array([vectorLength]));

	// Create command queue using the first available device
	cmdQueue = ctx.createCommandQueue (device);

	// Write the buffer to OpenCL device memory
	cmdQueue.enqueueWriteBuffer (buf_pos_y, false, 0, bufSize, pos_y);
	cmdQueue.enqueueWriteBuffer (buf_pos_x, false, 0, bufSize, pos_x);
	cmdQueue.enqueueWriteBuffer (buf_sp_y, false, 0, bufSize, speed_y);
	cmdQueue.enqueueWriteBuffer (buf_sp_x, false, 0, bufSize, speed_x);
	cmdQueue.enqueueWriteBuffer (buf_ac_y, false, 0, bufSize, aceleration_y);
	cmdQueue.enqueueWriteBuffer (buf_ac_x, false, 0, bufSize, aceleration_x);

	// Init ND-range
    localWS = [8];
	globalWS = [Math.ceil (vectorLength / localWS) * localWS];

	//output.innerHTML += "<br>Global work item size: " + globalWS;
	//output.innerHTML += "<br>Local work item size: " + localWS;

	// Execute (enqueue) kernel
	//run()

	// Read the result buffer from OpenCL device
	//get()

	// //Print input vectors and result vector
	// output.innerHTML += "<br>posY = "; 
	 //for (var i = 0; i < vectorLength; i = i + 1) {
	 //    output.innerHTML += pos_y[0];
	 //}
	// output.innerHTML += "<br>pos_x = "; 
	// for (var i = 0; i < vectorLength; i = i + 1) {
	//     output.innerHTML += pos_x[i] + " = " + speed_x[i] + " + " + aceleration_x[i] + ", ";
	// }

	// output.innerHTML += "<br>ace_y = ";
	// for (var i = 0; i < vectorLength; i = i + 1) {
	//     output.innerHTML += aceleration_y[i] + ", ";
	// }
	// output.innerHTML += "<br>ace_x = ";
	// for (var i = 0; i < vectorLength; i = i + 1) {
	//     output.innerHTML += aceleration_x[i] + ", ";
	// }
   }catch(e){
      alert(e)
   }
   
}

function run(){
	cmdQueue.enqueueNDRangeKernel(kernel, globalWS.length, null, 
		globalWS, localWS);
}

function get(){
    cmdQueue.enqueueReadBuffer (buf_pos_y, false, 0, bufSize, pos_y);
	cmdQueue.enqueueReadBuffer (buf_pos_x, false, 0, bufSize, pos_x);
	cmdQueue.enqueueReadBuffer (buf_sp_y, false, 0, bufSize, speed_y);
	cmdQueue.enqueueReadBuffer (buf_sp_x, false, 0, bufSize, speed_x);
	cmdQueue.enqueueReadBuffer (buf_ac_y, false, 0, bufSize, aceleration_y);
	cmdQueue.enqueueReadBuffer (buf_ac_x, false, 0, bufSize, aceleration_x);
	
	cmdQueue.finish (); //Finish all the operations
}
