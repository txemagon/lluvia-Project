/* Variables globales */ 
var loader      // Cargador de una pista
var cvs         // canvas
var drawContext // Contexto del canvas
var tracklist
var songLoader
var WIDTH 
var HEIGHT 
var SPACING = 5
var OFFSET = 100
var ff
function init_setup(){
   loader = document.getElementById('loader')
   cvs = document.getElementById('canvas_sound')
   ff = document.getElementById('ff')
   WIDTH = cvs.width
   HEIGHT = cvs.height
   drawContext = cvs.getContext('2d')
   tracklist = document.getElementById("lista")
   songLoader = new SongLoader(WebAudio.ctx, function() {
        if (WebAudio.isPlaying)
		     WebAudio.source.start(0)
         WebAudio.isPlaying = true
    })
}

function draw(){
  requestAnimFrame(draw)

  WebAudio.frequencyData()
	var results = WebAudio.freqs
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
  ff = max_cell / results.length  * WebAudio.sampleFrequency() / 2
	//ff.innerHTML = max_cell / results.length  * WebAudio.sampleFrequency() / 2 + " Hz"
}  


function playSound(){
    songLoader.playNewSong("media/Buffalo_Soldier.ogg")
    WebAudio.isPlaying = true
    draw()
}


function stopSound() {
    WebAudio.isFinished = true
    WebAudio.isPlaying = false
    WebAudio.source.stop()
}

function changeVolumen(volume){
   WebAudio.frequencyData()
   WebAudio.gain(volume)
}
