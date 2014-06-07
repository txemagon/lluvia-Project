var WebAudio = (new function () {
    
    var contextClass = (window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.oAudioContext ||
        window.msAudioContext)
    
    // Se crea el audio context
    this.ctx = new contextClass()
    
/*--------------------------------------------------*/
    // Crear fuente de audio y nodos necesarios
    this.gainNode = this.ctx.createGain()
    this.analyser = this.ctx.createAnalyser()
      
    this.isPlaying = false
    this.isFinished = false
    
    this.freqs = new Uint8Array(this.analyser.frequencyBinCount)
    
/* ===============================================================
                       CADENA DE CONEXIÓN
   ===============================================================*/
    this.gainNode.connect(this.analyser)
    this.analyser.connect(this.ctx.destination)
/*================================================================*/    

    this.gain = function(v){
			    this.gainNode.gain.value = v
            }	
	
    this.frequencyData = function () {
                return this.analyser.getByteFrequencyData(this.freqs)
            }
       
    this.frequencyBinCount = function () {
                return this.analyser.frequencyBinCount
            }
	this.sampleFrequency = function () {
                return this.ctx.sampleRate
            }
})