
function Cell(x, y, dir, life){
	this.life = life || Cell.life
	this.x = x || Math.random() * Cell.width
	this.y = y || Math.random() * Cell.height
	this.dir = dir || Math.PI * 2 *  Math.random() 
	this.ate = 0
}

Cell.initialize = function (food, width, height, ctx){
	Cell.food = food
	Cell.width = width
	Cell.height = height
        Cell.gradient = new Int16Array(Cell.width * Cell.height * 2)
	Cell.ctx   = ctx // Context to paint
	Cell.ctx.fillStyle = "#FFFFFF"
	Cell.canvas_data = Cell.ctx.getImageData(0, 0, Cell.width, Cell.height)
	Cell.amount = 15 // Amount of food eaten in each turn (if available)
	Cell.life = 35  // Initial life when not splitting
	Cell.cost = 10  // Cost of Moving
	Cell.population = 1000
	Cell.max_population = 40000
	Cell.reproduction = 845 // 1245 // 845
	Cell.variation = Math.PI / 26 //  26
        Cell.use_gradient = false
        Cell.update_gradient = false
	Cell.entities = []
	for (var i=0; i<Cell.population; i++)
	  Cell.entities.push(new Cell())

        if (Cell.use_gradient)
         for (var row=0; row<Cell.height; row++)
	   for (var col=0; col<Cell.width; col++)
               if (row > 10 && col > 10){
                            var position = col + row * Cell.width 
                            Cell.gradient[2 * position + 0] = ( Cell.food[position] - Cell.food[position - 10] ) / 10
                            Cell.gradient[2 * position + 1] = ( Cell.food[position] - Cell.food[position - 10 * Cell.width] ) / 10
                        }
}

Cell.raise = function( x, y,  amount) {
	x = Math.floor(x)
	y = Math.floor(y)
	var index = (x + Cell.width * y) * 4
	if (amount +  Cell.canvas_data.data[index] > 255)
		amount = 255 - Cell.canvas_data.data[index] 
	for (var i=0; i<3; i++)
	  Cell.canvas_data.data[index + i ] +=  amount
	  Cell.canvas_data.data[index + 3 ] = 255
}

Cell.draw = function() {
	for (var i=0; i<Cell.entities.length; i++)
	   //Cell.ctx.fillRect(Cell.entities[i].x, Cell.entities[i].y, 1, 1)
	   Cell.raise( Cell.entities[i].x, Cell.entities[i].y, Cell.entities[i].ate)
	Cell.ctx.putImageData(Cell.canvas_data, 0, 0)
}

Cell.food_at = function(x,y){
	 x = Math.floor(x)
	 y = Math.floor(y)
	var available = Cell.food[x + y * Cell.width] || 0
	available = (available > 0) ? available : 0
	return available 
}

Cell.eat = function(x, y, amount){
	x = Math.floor(x)
	y = Math.floor(y)
	amout = amount || Cell.amount
	var vanish = ( Cell.food_at(x,y) > amount) ? amount : Cell.food_at(x,y)
	Cell.food[x + y * Cell.width] -= vanish

	return vanish
}

Cell.update = function() {
	for (var i=0; i<Cell.entities.length; i++){
	   Cell.entities[i].update()
	   if (Cell.entities[i].life < 0)
		   Cell.entities.splice(i,1)
	}

	for (var i=Cell.entities.length; i<Cell.population; i++)
	   Cell.entities.push(new Cell())

       if (Cell.update_gradient)
        for (var row=0; row<Cell.height; row++)
	   for (var col=0; col<Cell.width; col++)
               if (row > 10 && col > 10){
                            var position = col + row * Cell.width 
                            Cell.gradient[2 * position + 0] = ( Cell.food[position] - Cell.food[position - 10] ) / 10
                            Cell.gradient[2 * position + 1] = ( Cell.food[position] - Cell.food[position - 10 * Cell.width] ) / 10
                        }

}

Cell.prototype.getx = function(){ return Math.floor(this.x) }
Cell.prototype.gety = function(){ return Math.floor(this.y) }

Cell.prototype.update = function() {
	this.life += (this.ate = Cell.eat(this.x, this.y))

	this.x += Cell.gradient[ ( this.getx() + Cell.width * this.gety() ) * 2 + 0 ]   + Math.cos(this.dir) 
	this.y += Cell.gradient[ ( this.getx() + Cell.width * this.gety() ) * 2 + 1 ]   + Math.sin(this.dir)
	this.dir += Cell.variation * ( Math.random() - 1/2)
	this.life -= Cell.cost
	if (this.life > Cell.reproduction && Cell.entities.length < Cell.max_population){
		this.life /= 2
		Cell.entities.push(new Cell(this.x, this.y, this.dir + Cell.variation / 2, this.life))
		this.dir -= Cell.variation / 2
	}
}
