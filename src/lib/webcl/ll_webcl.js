function Webcl(kernel_name, buf_size, n_write_buffer, n_read_buffer, n_r_w_buffer, local_ws, global_ws){
	this.ctx                = null
	this.program            = null
	this.device             = null
	this.kernel             = null
	this.buf_size      		= buf_size * 4
	this.cmd_queue          = null
	this.local_ws           = local_ws
	this.global_ws          = global_ws
	this.write_buffers      = []
	this.n_write_buffer     = n_write_buffer
	this.read_buffers       = []
	this.n_read_buffer      = n_read_buffer
	this.read_write_buffers = []
	this.n_r_w_buffer       = n_r_w_buffer
	this.total_buffers      = n_write_buffer + n_read_buffer + n_r_w_buffer
	this.kernel_name        = kernel_name
}

Webcl.prototype.load_kernel = function(name){
	var source = null
	switch(name){
	   case "ckVectorAdd":
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
          case "clDesaturate":
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

Webcl.prototype.init_gpu = function (){
    try {
        // First check if the WebCL extension is installed at all 
        if (window.webcl == undefined) {
            alert("Unfortunately your system does not support WebCL. " +
                "Make sure that you have both the OpenCL driver " +
                "and the WebCL browser extension installed.");
            return false;
        }
        this.ctx = webcl.createContext ();

        // Create and build program for the first device
        var kernel_src = this.load_kernel(this.kernel_name);
        this.program = this.ctx.createProgram(kernel_src);
        this.device = this.ctx.getInfo(WebCL.CONTEXT_DEVICES)[0];

        try {
            this.program.build ([this.device], "");
        } catch(e) {
            alert ("Failed to build WebCL program. Error "
                + this.program.getBuildInfo (this.device, 
                WebCL.PROGRAM_BUILD_STATUS)
                + ":  " 
                + this.program.getBuildInfo (this.device, 
                WebCL.PROGRAM_BUILD_LOG));
            throw e;
        }

        this.kernel = this.program.createKernel(this.kernel_name)
        this.load_buffers()
        this.cmd_queue = this.ctx.createCommandQueue(this.device)

    } catch(e) {
                   document.getElementById("output").innerHTML 
                   += "ERROR 2" + "<h3>ERROR:</h3><pre style=\"color:red;\">" + e.message + "</pre>";
                   //throw e;
                   return false
    }
    return true
}

Webcl.prototype.load_buffers = function(){
    for(var i = 0; i<this.n_write_buffer; i++){
        this.write_buffers[i] = this.ctx.createBuffer(WebCL.MEM_WRITE_ONLY,this.buf_size)
    }
    for(var i = 0; i<this.n_read_buffer; i++){
        this.read_buffers[i] = this.ctx.createBuffer(WebCL.MEM_READ_ONLY,this.buf_size)
    }
    for(var i = 0; i<this.n_r_w_buffer; i++){
        this.read_write_buffers[i] = this.ctx.createBuffer(WebCL.MEM_READ_WRITE,this.buf_size)
    }
}

Webcl.prototype.set_kernel_arguments = function(){
	for(var i=0; i<arguments[0].length; i++)
	   this.kernel.setArg (i, arguments[0][i]);
}

Webcl.prototype.set_buffers = function(buffer, variable){
	if(buffer.length != variable.length){
		throw(alert("Error, arrays length not equuals"))
		return
	}
	for(var i=0; i<buffer.length; i++)
	   this.cmd_queue.enqueueWriteBuffer (buffer[i], false, 0, this.buf_size, variable[i])
}

Webcl.prototype.get_buffers = function(buffer, variable){
	if(buffer.length != variable.length){
		throw(alert("Error, arrays length not equuals"))
		return
	}
	for(var i=0; i<buffer.length; i++)
	   this.cmd_queue.enqueueReadBuffer (buffer[i], false, 0, this.buf_size, variable[i])
	this.cmd_queue.finish (); //Finish all the operations
}

Webcl.prototype.run = function(){
	this.cmd_queue.enqueueNDRangeKernel(this.kernel, this.global_ws.length, null, this.global_ws, this.local_ws)
}