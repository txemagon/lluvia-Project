var WebAudio = (new function () {
    // Comprobación de compatibilidad navegador <--> Web Audio API
    var contextClass = (window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.oAudioContext ||
        window.msAudioContext)
    if (contextClass) {
        // Se crea el audio context
        this.ctx = new contextClass()
    }
/*--------------------------------------------------*/
    // Crear fuente de audio y nodos necesarios
    this.gainNode = this.ctx.createGain()
    this.analyser = this.ctx.createAnalyser()
    this.source   = this.ctx.createBufferSource()
    
    this.startTime  = this.ctx.currentTime
    this.isPlaying = false
    this.isFinished = false
    
    this.freqs = new Uint8Array(this.analyser.frequencyBinCount)
    this.times = new Uint8Array(this.analyser.frequencyBinCount)

/* ===============================================================
                       CADENA DE CONEXIÓN
   ===============================================================*/
    // TODO: Revisar la cadena de conexión
    // TODO: La ganancia no funciona
    this.source.connect(this.gainNode)
    this.gainNode.connect(this.analyser)
    this.analyser.connect(this.ctx.destination)
/*================================================================*/    

    this.gain = function(v){
			    this.gainNode.gain.value = v
            }	
	// defineProperties: Agrega una propiedad a un objeto 
    this.FFT_SIZE = function (fft_size) {
                this.analyser.fftSize = fft_size || 2048
            }
    this.timeData = function () {
                return this.analyser.getByteTimeDomainData(this.times)
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