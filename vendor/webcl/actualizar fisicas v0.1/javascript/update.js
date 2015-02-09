

function load_kernel(n){
	var source = null
	switch(n){
	   case 1:
	     source = "kernel void ckVectorAdd(\
			         global float* pos_y,\
			         global float* pos_x,\
			         global float* speed_y,\
			         global float* speed_x,\
			         global float* aceleration_y,\
			         global float* aceleration_x,\
			         float deltatime,\
			         uint uiVectorWidth) {\
			                uint x = get_global_id(0);\
			                if (x >= uiVectorWidth)\
			            	    return;\
			                    speed_y[x] += aceleration_y[x];\
			                    speed_x[x] += aceleration_x[x];\
			                    if(pos_y[x]+speed_y[x] > 800 || pos_y[x]+speed_y[x] < 0){\
			                      speed_y[x] *= -1;\
			                      aceleration_y[x]*=-1;\
			                    }\
			    				pos_y[x]   += speed_y[x] * deltatime;\
			                    if(pos_x[x]+speed_x[x] > 800 ||pos_x[x]+speed_x[x] < 0){\
			                      speed_x[x] *= -1;\
			                      aceleration_x[x]*=-1;\
			                    }\
			    				pos_x[x]   += speed_x[x]  * deltatime;\
                     }"
          break;
          case 2:
             source = "kernel void clDesaturate(\
             	          global const uchar4* src,\
                          global uchar4* dst,\
                          global int* pos_y,\
                          global int* pos_x,\
                          uint width, \
                          uint height){\
				            int x = get_global_id(0);\
				            int y = get_global_id(1);\
				            if (x >= width || y >= height) return;\
				            int i = y * width + x;\
				            for(int a = 0; a < 4; a++)\
				                if(x == pos_x[a] && y == pos_y[a]){\
				                   dst[i] = (uchar4)(0, 0, 0, 255);\
				                   break;\
				                }\
				                else\
				                   dst[i] = (uchar4)(0, 0, 0, 0);\
                      }"
          break;
      }
    return source;
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
		kernel_src = load_kernel(1);
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