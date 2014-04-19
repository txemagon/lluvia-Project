Continue.prototype.constructor = Continue;

/**
 * @classDescription Make a copy of a generic object to be evaluated in two instants of time.
 * 
 * @param  {Object} 	magnitude   Magnitude to be derived. Must be of type Object and have a copy from the builder.
 * @return {Continue} 				Returns an object capable of being derived / integrated.
 * @constructor 
 */
function Continue(magnitude){
	this.magnitude0 = new magnitude.constructor(magnitude);
	this.magnitude  = new magnitude.constructor(magnitude);
}

/**
 * Sets the value of property in the current moment of time
 * 
 * @memberOf {Continue}
 * @method	set	
 * @param {Object} magnitude	Value of the magnitude
 */
Continue.prototype.set = function (magnitude){
	this.magnitude0 = this.magnitude;
	this.magnitude  = new magnitude.constructor(magnitude);
}

/**
 * 	
 * make a copy of this object
 * 
 * @memberOf 	{Continue}
 * @method		clone			
 * 
 * @return 		{Continue} 	returns a copy of this object   
 */
Continue.prototype.clone = function(){
	var copy = new Continue(this.magnitude);
	copy.magnitude0 = this.magnitude0;
	return copy;	
}

/**
 * This drift towards another object.
 * 
 * @memberOf	{Continue}
 * @method		derive		
 * @param 		{Continue}  regard the objects to be derived.
 * @return		{Object} 	derived search.
 */
Continue.prototype.derive = function(regard){
	var derived = this.clone().magnitude;
	var prp = new Array();
	for (var j in regard.magnitude)
		prp.push(j);
	for (var i in derived)
		try{
			derived[i] = (this.magnitude[i] - this.magnitude0[i]) / (regard.magnitude[prp[0]] - regard.magnitude0[prp[0]]);
		} catch (error) {
			alert("The derivative is infinite: " + error.toString());	
		}
	return derived;
}

/**
 * Calculate the size of a variable differential. (For functions of 1 variable moment)
 * 
 * @memberOf	{Continue}
 * @method      differential	
 * @param {Object} regard
 */
Continue.prototype.differential = function (regard){
	var differential = this.clone().magnitude;
	var prp = new Array();
	for (var j in regard.magnitude)
		prp.push(j);
	for (var i in differential)
			differential[i] = this.magnitude[i] * (regard.magnitude[prp[0]] - regard.magnitude0[prp[0]]);
		
	return differential;
}

/**
 * Add a diferend function.
 * 
 * @memberOf {Continue}
 * @method	embed	
 * @param {Object} 	differential amount to be added.
 */
Continue.prototype.integrate = function(amount){
	var newValue = this.clone().magnitude;
	for( var i in newValue)
		newValue[i] += amount[i];	
	this.magnitude = newValue;
}

Time.prototype.constructor = Time;

/**
 * @classDescription  Represents an instant of time as a continuous scale.
 * @param {Number} t Time in seconds
 * @return {Time} The new instant of time.
 * @constructor
 */
function Time(t){
	if ((arguments.length == 1) && (arguments[0] instanceof Time)){
		this.date = arguments[0].date;
		return this;
	}
	this.date = t;
}


Mobile.prototype.constructor = Mobile;

/**
 * @classDescription  A body whit position, velocity and acceleration.
 *  
 * @param {Continue} position		position mobile.
 * @param {Continue} velocity 	    Velocity mobile.
 * @param {Continue} aceleration	Aceleration mobile.
 * @param {Continue} time			Instant of the time 
 * @return {Movil} 	 the recently created new mobile point.
 * @constructor
 */
function Mobile(position, velocity, acceleration, time){
	this.position     = new Continue(position);
	this.velocity     = new Continue(velocity);
	this.acceletation = new Continue(acceleration);
	this.moment       = new Continue(time);
}



Mobile.prototype.update = function(moment){
	var i = this.moment.clone();
	delete i;
	this.moment.set(moment);
	this.velocity.moment(this.acceleration.differential(this.moment));
	this.position.moment(this.velocity.differential(this.moment));
}

SystemDamped.prototype.constructor = SystemDamped;
/**
 * On a system with critical damping w^2 = ro^2 => k = ro^2/(4�m)
 * @param {Object} rigidity
 * @param {Object} damping
 * @param {Object} mass
 * @param {Object} initialPosition
 * @param {Object} anchorage
 */
function SystemDamped(rigidity, damping, mass, initialPosition, anchorage){
	this.rigideity = rigidity;
	this.damping   = damping;
	this.mass      = mass;
	this.position  = new Mobile(initialPosition, new Point(0,0), new Point(0,0), new Point(0,0));
	this.anchorage = new Mobile(anchorage, new Point(0,0), new Point(0,0), new Point(0,0));
}

SystemDamped.prototype.update = function(moment){
	var Frx = - this.rigidity * (this.position.positcion.magnitude.x - this.anchorage.position.magnitude.x);
	var Fry = - this.rigidity * (this.position.position.magnitude.y - this.anchorage.position.magnitude.y);
	var Fvx = - this.damping / this.mass * this.position.velocity.magnitude.x;
	var Fvy = - this.damping / this.mass * this.position.velocity.magnitude.y;
	this.position.acceleration.set(new Point((Frx+ Fvx) / this.mass, (Fry + Fvy)/this.mass));
	this.position.update(moment);
}