//1º Cargar el kernel
function loadKernel(id){
	var kernel_element = document.getElementById(id)
	//Coger el codigo que hay escrito en la función kernel
	var kernel_source = kernel_element.text

	return kernel_source
}

function vectorAdd(){
	//Coger la variable donde saldran los datos en html
	var output = document.getElementById("output")
	output.innerHTML = ""

	try{
		var start = new Date().getTime()

		//Comprobar que esta instalada la extension de WebCL
		if(window.webcl == undefined){
			alert("No esta WebCL")
			return false
		}

		//Generar los datos de entrada
		var vector_length = MAX
		var UI_vector_1 = new Uint32Array(vector_length)
		var UI_vector_2 = new Uint32Array(vector_length)
		//Rellenan con numeros aleatorios
		for(var i=0; i<vector_length; i++){
			UI_vector_1[i] = Math.floor(Math.random() * 100) //Random number 0..99
			UI_vector_2[i] = Math.floor(Math.random() * 100) //Random number 0..99
		}

		output.innerHTML += "<br>Vector length = " + vector_length;

		//Configurar el contexto de WebCL usando el dispositivo por defecto
		var ctx = webcl.createContext()

		//Reservar los buffers
		//Se multiplica por 4 que el lo que vale un int
		var buf_size = vector_length * 4
		//Buffers de entrada
		var buf_in1 = ctx.createBuffer(WebCL.MEM_READ_ONLY, buf_size)
		var buf_in2 = ctx.createBuffer(WebCL.MEM_READ_ONLY, buf_size)
		//Buffer de salida
		var buf_out = ctx.createBuffer(WebCL.MEM_WRITE_ONLY, buf_size)

		output.innerHTML += "<br>Buffer size: " + buf_size + " bytes";

		//Crear y compilar el programa para el primer dispositivo
		//Cargar el kernel
		var kernel_src = loadKernel("clProgramVectorAdd")
		//Hacemos el programa
		var program = ctx.createProgram(kernel_src)
		//Cogemos el dispositivo
		var device = ctx.getInfo(WebCL.CONTEXT_DEVICES)[0]

		try{
			//Compila el programa en tiempo de ejecución y se le dice el dispositivo donde se ejecutará
			program.build([device],"")
		} catch(e) {
			alert ("Failed to build WebCL program. Error "
		           + program.getBuildInfo (device, 
			         WebCL.PROGRAM_BUILD_STATUS)
		           + ":  " 
		           + program.getBuildInfo (device, 
			         WebCL.PROGRAM_BUILD_LOG));
	        throw e;
		}

		//Crear el kernel, se le pasa el nombre de la funcion del kernel
		var kernel = program.createKernel("ckVectorAdd")
		//Añaden los argumentos
		kernel.setArg(0, buf_in1)
		kernel.setArg(1, buf_in2)
		kernel.setArg(2,buf_out)
		kernel.setArg(3, new Uint32Array([vector_length]))

		//Creamos la fila de comandos usando el primer dispositivo disponible
		var cmd_queue = ctx.createCommandQueue(device)

		//Escribir en el buffer de memoria del dispositivo WebCL
		cmd_queue.enqueueWriteBuffer(buf_in1, false, 0, buf_size, UI_vector_1)
		cmd_queue.enqueueWriteBuffer(buf_in2, false, 0, buf_size,UI_vector_2)

		//Declaramos el tamaño de trabajo
		//Memoria local
		var local_ws = [8]
		//Memoria global
		var global_ws = [Math.ceil(vector_length / local_ws) * local_ws]

		output.innerHTML += "<br>Global work item size: " + global_ws
	    output.innerHTML += "<br>Local work item size: " + local_ws

	    //Ejecutamos la cola en el kernel
	    cmd_queue.enqueueNDRangeKernel(kernel, global_ws.length, null, global_ws, local_ws)

	    //Leer el resultado del buffer desde el dispositivo WebCL
        var out_buffer = new Uint32Array(vector_length)
	    cmd_queue.enqueueReadBuffer(buf_out, false, 0, buf_size, out_buffer)
	    //Cerrrar todas las operaciones
	    cmd_queue.finish()

	    //Imprimir el resultado
	    output.innerHTML += "<br>Vector1 = "; 
	    for (var i = 0; i < vector_length; i++) {
	       output.innerHTML += UI_vector_1[i] + ", ";
	    }
	    output.innerHTML += "<br>Vector2 = ";
	    for (var i = 0; i < vector_length; i++) {
	       output.innerHTML += UI_vector_2[i] + ", ";
	     }
	     output.innerHTML += "<br>Result = ";
	     for (var i = 0; i < vector_length; i++) {
	        output.innerHTML += out_buffer[i] + ", ";
	     }

	     var end = new Date().getTime();
         var time = end - start;
         output.innerHTML += " execution time: " + time + "ms"

    } catch(e) {
	    document.getElementById("output").innerHTML 
	    += "ERROR 2" + "<h3>ERROR:</h3><pre style=\"color:red;\">" + e.message + "</pre>";
	    throw e;
    }

}