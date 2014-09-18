function update() {
	Cell.update()
	Cell.draw()
	setTimeout(update, 20)
}

function main(canvas, food) {
	Cell.initialize(food, canvas.width, canvas.height, canvas.getContext("2d"))
	update()
}

function start() {
	var petri_canvas = document.getElementById("petri_dish")
	var width = petri_canvas.width
	var height = petri_canvas.height
	var petri_ctx = petri_canvas.getContext("2d")

	var image_canvas = document.createElement("canvas")
	image_canvas.width = width
	image_canvas.height = height
	var image_ctx = image_canvas.getContext("2d")

	// var light_food = petri_ctx.getImageData(0, 0, petri_canvas.width, petri_canvas.height) 

	var image = new Image()
	image.onload = function () {
		image_ctx.drawImage(image, 0, -400)

	    var food = new Uint8Array(petri_canvas.width * petri_canvas.height)
		var image_data = image_ctx.getImageData(0, 0, image_canvas.width, image_canvas.height)
		for (var row=0; row<petri_canvas.height; row++)
		for (var col=0; col<petri_canvas.width; col++){
			var index = ( row * petri_canvas.width + col ) * 4
			var value = 0
			for (var color=0; color<3; color++)
			   value += image_data.data[index + color]		    
			value /=3
			food[index/4] = value
			// light_food.data[index + 0] = light_food.data[index + 1] = light_food.data[index + 2] = value
			// light_food.data[index + 3] = 255 

		}
		main(petri_canvas, food)
		// petri_ctx.putImageData(light_food, 0, 0)
	}
	image.src="images/snake.jpg"
}

