

function load_kernel(id){
    var kernel_element = document.getElementById(id);
    var kernel_source = kernel_element.text;
    if (kernel_element.src != "") {
	   var mHttpReq = new XMLHttpRequest();
	   mHttpReq.open("GET", kernel_element.src, false);
	   mHttpReq.send(null);
	   kernel_source = mHttpReq.responseText;
    } 
    return kernel_source;
}


var ctx = null
var kernel_src = null
var program = null
var device = null
var kernel = null

var buf_size = null
var buf_sp_y = null
var buf_sp_x = null
var buf_ac_y = null
var buf_ac_x = null
var buf_pos_y = null
var buf_pos_x = null

var buf_dt = null

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
		kernel_src = load_kernel("clProgramVectorAdd");
		program = ctx.createProgram(kernel_src);
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
		buf_size = vector_length * 4; // size in bytes

		buf_sp_y  = ctx.createBuffer (WebCL.MEM_READ_WRITE, buf_size);
		buf_sp_x  = ctx.createBuffer (WebCL.MEM_READ_WRITE, buf_size);
		buf_ac_y  = ctx.createBuffer (WebCL.MEM_READ_WRITE, buf_size);
		buf_ac_x  = ctx.createBuffer (WebCL.MEM_READ_WRITE, buf_size);
		buf_pos_y = ctx.createBuffer (WebCL.MEM_READ_WRITE, buf_size);
		buf_pos_x = ctx.createBuffer (WebCL.MEM_READ_WRITE, buf_size);
		buf_dt    = ctx.createBuffer (WebCL.MEM_READ_ONLY, 4)
	} catch(e) {
	               document.getElementById("output").innerHTML 
	               += "ERROR 2" + "<h3>ERROR:</h3><pre style=\"color:red;\">" + e.message + "</pre>";
	               //throw e;
	               return false
    }
    return true
}


var cmd_queue = null
var local_WS = null
var global_WS = null


function update() {
	try{

	    // All output is written to element by id "output"  

		// Generate input vectors
		
		// Setup WebCL context using the default device

		// Create kernel and set arguments
		
		kernel.setArg (0, buf_pos_y);
		kernel.setArg (1, buf_pos_x); 
		kernel.setArg (2, buf_sp_y);
		kernel.setArg (3, buf_sp_x);
		kernel.setArg (4, buf_ac_y);
		kernel.setArg (5, buf_ac_x);
		kernel.setArg (6, delta);
		//kernel.setArg (6, buf_dt)
		kernel.setArg (7, new Uint32Array([vector_length]));
		

		// Create command queue using the first available device
		cmd_queue = ctx.createCommandQueue (device);

		// // Write the buffer to OpenCL device memory
		// cmd_queue.enqueueWriteBuffer (buf_pos_y, false, 0, buf_size, pos_y);
		// cmd_queue.enqueueWriteBuffer (buf_pos_x, false, 0, buf_size, pos_x);
		// cmd_queue.enqueueWriteBuffer (buf_sp_y, false, 0, buf_size, speed_y);
		// cmd_queue.enqueueWriteBuffer (buf_sp_x, false, 0, buf_size, speed_x);
		// cmd_queue.enqueueWriteBuffer (buf_ac_y, false, 0, buf_size, aceleration_y);
		// cmd_queue.enqueueWriteBuffer (buf_ac_x, false, 0, buf_size, aceleration_x);
		set()
		//update_dt(delta)

		// Init ND-range
	    local_WS = [8]
		global_WS = [Math.ceil (vector_length / local_WS) * local_WS];
		

   }catch(e){
      alert(e)
   }
   
}

function set(){
	// Write the buffer to OpenCL device memory
	cmd_queue.enqueueWriteBuffer (buf_pos_y, false, 0, buf_size, pos_y)
	cmd_queue.enqueueWriteBuffer (buf_pos_x, false, 0, buf_size, pos_x)
	cmd_queue.enqueueWriteBuffer (buf_sp_y, false, 0, buf_size, speed_y)
	cmd_queue.enqueueWriteBuffer (buf_sp_x, false, 0, buf_size, speed_x)
	cmd_queue.enqueueWriteBuffer (buf_ac_y, false, 0, buf_size, aceleration_y)
	cmd_queue.enqueueWriteBuffer (buf_ac_x, false, 0, buf_size, aceleration_x)
}

function update_dt(){
	kernel.setArg (6, delta);
	//cmd_queue.enqueueWriteBuffer (buf_dt, false, 0, 4, delta)
}

function run(){
	// Execute (enqueue) kernel
	cmd_queue.enqueueNDRangeKernel(kernel, global_WS .length, null, global_WS , local_WS);
}

function get(){
	// Read the result buffer from OpenCL device
    cmd_queue.enqueueReadBuffer (buf_pos_y, false, 0, buf_size, pos_y);
	cmd_queue.enqueueReadBuffer (buf_pos_x, false, 0, buf_size, pos_x);
	cmd_queue.enqueueReadBuffer (buf_sp_y, false, 0, buf_size, speed_y);
	cmd_queue.enqueueReadBuffer (buf_sp_x, false, 0, buf_size, speed_x);
	cmd_queue.enqueueReadBuffer (buf_ac_y, false, 0, buf_size, aceleration_y);
	cmd_queue.enqueueReadBuffer (buf_ac_x, false, 0, buf_size, aceleration_x);
	
	cmd_queue.finish (); //Finish all the operations
}