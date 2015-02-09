

function draw() {
  try{
    
    var width = canvas.width
    var height = canvas.height
    var pixels = context.getImageData(0, 0, width, height);

    // Dimm the existing canvas to highlight any errors we might get.
    // This does not affect the already retrieved pixel data.
    //canvas.width = canvas.width
    
    // Setup WebCL context using the default device
    //var ctx = webcl.createContext();

    // Setup buffers
    var imgSize = width * height;

    var buf_size = imgSize * 4; // size in bytes
        
    var bufIn = ctx.createBuffer (WebCL.MEM_READ_ONLY, buf_size);
    var bufOut = ctx.createBuffer (WebCL.MEM_WRITE_ONLY, buf_size);
    var buf_pos_y = ctx.createBuffer (WebCL.MEM_READ_ONLY, buf_size);
    var buf_pos_x = ctx.createBuffer (WebCL.MEM_READ_ONLY, buf_size);

     // Create and build program
    var kernelSrc = load_kernel("clProgramDesaturate");
    var program = ctx.createProgram(kernelSrc);
    var device = ctx.getInfo(WebCL.CONTEXT_DEVICES)[0];
    try {
      program.build ([device], "");
    } catch(e) {
      alert ("Failed to build WebCL program. Error "
             + program.getBuildInfo (device, 
                                            WebCL.PROGRAM_BUILD_STATUS)
             + ":  " + program.getBuildInfo (device, 
                                                    WebCL.PROGRAM_BUILD_LOG));
      throw e;
    }


    // Create kernel and set arguments
    var kernel = program.createKernel ("clDesaturate");
    kernel.setArg (0, bufIn);
    kernel.setArg (1, bufOut);
    kernel.setArg (2, buf_pos_y);
    kernel.setArg (3, buf_pos_x);
    kernel.setArg (4, new Uint32Array([width]));
    kernel.setArg (5, new Uint32Array([height]));

    // Create command queue using the first available device
    var cmdQueue = ctx.createCommandQueue (device);

    // Write the buffer to OpenCL device memory
    cmdQueue.enqueueWriteBuffer (bufIn, false, 0, buf_size, pixels.data);
    cmd_queue.enqueueWriteBuffer (buf_pos_y, false, 0, buf_size, pos_y)
    cmd_queue.enqueueWriteBuffer (buf_pos_x, false, 0, buf_size, pos_x)

    // Init ND-range 
    var localWS = [16,4];  
    var globalWS = [Math.ceil (width / localWS[0]) * localWS[0], 
                    Math.ceil (height / localWS[1]) * localWS[1]];
    
    // Execute (enqueue) kernel
    cmdQueue.enqueueNDRangeKernel(kernel, 2, null, 
                                  globalWS, localWS);

    // Read the result buffer from OpenCL device
    cmdQueue.enqueueReadBuffer (bufOut, false, 0, buf_size, pixels.data);
    cmdQueue.finish (); //Finish all the operations
    
    context.putImageData (pixels, 0, 0);

  } catch(e) {
    document.getElementById("output").innerHTML += 
      "<h3>ERROR:</h3><pre style=\"color:red;\">" + e.message + "</pre>";
    throw e;
  }
}     