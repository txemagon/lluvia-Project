/* ======================================================================= 
                            CLASE BUFFERLOADER               
   ======================================================================= */

//  ------------------------- Constructor -------------------------------

/* Se sobrecarga el constructor con el audioContext, 
   la lista de canciones, y la llamada XMLHttpRequest */

function SongLoader(context, callback) {
    this.context = context
    this.onload = callback
}

SongLoader.prototype.playNewSong = function(track) {
        var loader  = this
        var request = new XMLHttpRequest()
        /* Petición GET. Al decir "true", 
           la carga del buffer se hace de 
           forma asíncrona. */
        request.open("GET", track, true)
        /* Indicarle (responseType) el tipo de respuesta 
           que queremos obtener.                              
           'arraybuffer': Conjunto de bytes que no se
                          pueden modificar(solo lectura) */
        request.responseType = "arraybuffer"
        request.onload = function() {
             /* De forma asincrona decodificar los datos de los 
                archivos de audio 

               'decodeAudioData': Pasa del flujo de bytes, que son 
                números y no los podemos interpretar, en un buffer 
                de audio a fin de que nuestro audioContext lo pueda
                usar. Requiere de tres argumentos:
                         - resquest.response            
                         - Una función en caso de haya ido todo bien,
                           que recibiría el 'buffer'.                               
                         - Una función que nos indique 'error' . */
            loader.context.decodeAudioData(request.response,
                function(buffer) {
                    if (!buffer){
                        alert('Error al decodificar los datos del archivo: ' + path)
                        return;
                    }

                        WebAudio.source.buffer = buffer
						loader.onload()
                        //document.dispatchEvent(new Event('bufferLoaded'))
                },
                function(error) {
                    console.error('Error en la decodificación de datos de audio', error)
                }
            )
        }

        request.onerror = function() {
            alert('Error en la petición al cargador')
        }
        request.send()
    }

// ===================================================================================



