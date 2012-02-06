/**
 * Classes related to geometry.
 * @author Txema
 * @version 1.00, June 2007
 * @translated by Jaime Villanueva
 */


Point.prototype.constructor = Point;

/**
 * 	class that defines a 2D point
 * 
 * @classDescription  Defines a Point.
 * @param 	{int} 	  coordX Coordinate X.
 * @param 	{int} 	  coordY Coordinate Y.
 * @return	{Point}	  Returns a new point.
 * @constructor
 */
function Point(coordX, coordY){
	if ((arguments.length == 1) && (arguments[0] instanceof Point)){
		this.x = arguments[0].x;
		this.y = arguments[0].y;
		return this;
	}
	this.x = coordX;
	this.y = coordY;
}

Point.prototype.multiply = function (amount){
	this.x *= amount;
	this.y *= amount;
}

Point.prototype.divide = function (amount){
	this.x /= amount;
	this.y /= amount;
}

rectangle.prototype.constructor = rectangle;

/**
 * @classDescription   build a rectangle given the coordinates of the upper left corner and wide and high.
 * @param  {Point}     coord coordinates of the upper left corner
 * @param  {Point}     dimen Wide and high of the rectangle.
 * @return {rectangle} Returns a new rectangle.
 * @see Point
 */
function rectangle(coord,dimen){
	this.x0 = coord.x;
	this.y0 = coord.y;
	this.x1 = this.x0 + dimen.x;
	this.y1 = this.y0 + dimen.y;
}

/**
 * @memberOf 	{rectangle}
 * @method 		getRectDimen 	Returns the dimensions of rectangle (wide and high).
 * @return 		{Point}			Wide and high as Point.
 */
rectangle.prototype.getRectDimen = function(){
			return new Point(this.x1 - this.x0, this.y1 - this.y0);
} 

/**
 * @memberOf	{rectangle}
 * @method		getRectCoord	Returns the coordinates of the upper left corner.
 * 
 * @return		{Point}			Coordinates of the rectangle.
 */
rectangle.prototype.getRectCoord = function(){

	return new Point(this.x0, this.y0);
}

/**
 * @memberOf 	{rectangle}
 * @method		displace moves the rectangle.
 * @param       {Point} despl Displacement vector.
 * 
 */
rectangle.prototype.displace = function (despl){
	this.x0 += despl.x;
	this.y0 += despl.y;
	this.x1 += despl.x;
	this.y1 += despl.y;
}

/**
 * @memberOf {rectangle}
 * @method	         enlarge   Enlarges the rectangle.
 * @param    {Point} despl     Displacement vector.
 */
rectangle.prototype.elarge = function (despl){
	this.x1 += despl.x;
	this.y1 += despl.y;
}