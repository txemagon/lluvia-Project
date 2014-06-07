//CONSTRUCTOR

function Monitor() {
   this.loader = document.getElementById('loader')
   this.cvs = document.getElementById('canvas_sound')
   this.ff = 0
   this.WIDTH = this.cvs.width
   this.HEIGHT = this.cvs.height
   this.SPACING = 5
   this.OFFSET = 100
   this.drawContext = this.cvs.getContext('2d')
   this.tracklist = ["Take_Five", "New_York", "The_Maker", "Set_fire_to_the_rain", "Viktorious", "All_That_She_Wants", "False_pretense", "First_of_the_Year"]
   this.actual_song = 0
   this.songLoader = new SongLoader(WebAudio.ctx, function(){})
}

//MÉTODOS

Monitor.prototype.init_setup = function() {  
   
}	

draw = function() {
   requestAnimFrame(draw)
   WebAudio.frequencyData()
   var results = WebAudio.freqs
   var cvs = document.getElementById('canvas_sound')
   
   var drawContext = cvs.getContext('2d')
   var ff = document.getElementById('ff')
   var WIDTH = cvs.width
   var HEIGHT = cvs.height
   var SPACING = 5
   var OFFSET = 100
   var max_cell = OFFSET
   drawContext.clearRect(0, 0, WIDTH, HEIGHT)
   drawContext.fillStyle ='#000000'
   
   for(var i = 0; i < results.length-OFFSET; i++){
		var magnitude = results[i + OFFSET]
		drawContext.fillRect(i * SPACING, HEIGHT, SPACING/2, -magnitude)
		if ( results[max_cell] < results[ i + OFFSET] )
			max_cell = i + OFFSET
   }
   
   drawContext.fillStyle ='#CCFF00'
   drawContext.fillRect((max_cell - OFFSET) * SPACING, HEIGHT, SPACING/2, -results[max_cell])

   // VALOR DE LA FRECUENCIA FUNDAMENTAL
   if(WebAudio.isFinished)
		this.ff = 0
   else		
		this.ff = max_cell / results.length * (WebAudio.sampleFrequency() / 2)
}  



Monitor.prototype.playSound = function() {
   try{
   this.songLoader.playNewSong("media/"+ this.tracklist[this.actual_song] +".ogg")
}catch(e){alert(e)}
   if(WebAudio.isPlaying)
		this.stopSound()
   WebAudio.isPlaying = true
   WebAudio.isFinished = false
   draw()
}	

Monitor.prototype.stopSound = function() {
   WebAudio.isFinished = true
   WebAudio.isPlaying = false
   WebAudio.source.stop()
}

Monitor.prototype.changeVolumen = function(_volumen) {
   WebAudio.frequencyData()
   WebAudio.gain(_volumen)
}

Monitor.prototype.next = function() {
   if(this.actual_song != this.tracklist.length-1)
      this.actual_song++
}

Monitor.prototype.previous = function() {
   if(this.actual_song != 0)
      this.actual_song--
}
