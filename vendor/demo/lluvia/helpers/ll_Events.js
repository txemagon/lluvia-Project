/**
 * @author Josh Davis
 * @version 1.00 June 2007
 * @translated for Antonio Carhuatocto
 */

/**
 * Binds a function to the given object's scope
 *
 * @param {Object} object The object to bind the function to.
 * @return {Function} Returns the function bound to the object's scope.
 */
Function.prototype.bind = function (object)
{
	var method = this;
	return function ()
	{
		return method.apply(object, arguments);
	};
};

/**
 * Create a new instance of Event.
 *
 * @classDescription	This class creates a new Event.
 * @return {Object}		Returns a new Event object.
 * @constructor
 */
function Event()
{
	this.events = [];
	this.builtinEvts = [];
}

/**
 * Gets the index of the given action for the element
 *
 * @memberOf Event
 * @param  {Object}   obj     The element attached to the action.
 * @param  {String}   evt     The name of the event.
 * @param  {Function} action  The action to execute upon the event firing.
 * @param  {Object}   binding The object to scope the action to.
 * @return {Number}           Returns an integer.
 */
Event.prototype.getActionIdx = function(obj,evt,action,binding)
{
	if(obj && evt)
	{

		var curel = this.events[obj][evt];
		if(curel)
		{
			var len = curel.length;
			for(var i = len-1;i >= 0;i--)
			{
				if(curel[i].action == action && curel[i].binding == binding)
				{
					return i;
				}
			}
		}
		else
		{
			return -1;
		}
	}
	return -1;
};

/**
 * Adds a listener
 *
 * @memberOf Event
 * @param {Object}   obj 	 The element attached to the action.
 * @param {String}   evt 	 The name of the event.
 * @param {Function} action  The action to execute upon the event firing.
 * @param {Object}   binding The object to scope the action to.
 * @return {null}            Returns null.
 */
Event.prototype.addListener = function(obj,evt,action,binding)
{
	if(this.events[obj])
	{
		if(this.events[obj][evt])
		{
			if(this.getActionIdx(obj,evt,action,binding) == -1)
			{
				var curevt = this.events[obj][evt];
				curevt[curevt.length] = {action:action,binding:binding};
			}
		}
		else
		{
			this.events[obj][evt] = [];
			this.events[obj][evt][0] = {action:action,binding:binding};
		}
	}
	else
	{
		this.events[obj] = [];
		this.events[obj][evt] = [];
		this.events[obj][evt][0] = {action:action,binding:binding};
	}
};

/**
 * Removes a listener
 *
 * @memberOf Event
 * @param  {Object}   obj     The element attached to the action.
 * @param  {String}   evt     The name of the event.
 * @param  {Function} action  The action to execute upon the event firing.
 * @param  {Object}   binding The object to scope the action to.
 * @return {null}             Returns null.
 */
Event.prototype.removeListener = function(obj,evt,action,binding)
{
	if(this.events[obj])
	{
		if(this.events[obj][evt])
		{
			var idx = this.actionExists(obj,evt,action,binding);
			if(idx >= 0)
			{
				this.events[obj][evt].splice(idx,1);
			}
		}
	}
};

/**
 * Fires an event
 *
 * @memberOf Event
 * @param e [(event)]     A builtin event passthrough
 * @param   {Object} obj  The element attached to the action.
 * @param   {String} evt  The name of the event.
 * @param   {Object} args The argument attached to the event.
 * @return  {null}        Returns null.
 */
Event.prototype.fireEvent = function(e,obj,evt,args)
{
	if(!e){e = window.event;}

	if(obj && this.events)
	{
		var evtel = this.events[obj];
		if(evtel)
		{
			var curel = evtel[evt];
			if(curel)
			{
				for(var act in curel)
				{
					var action = curel[act].action;
					if(curel[act].binding)
					{
						action = action.bind(curel[act].binding);
					}
					action(e,args);
				}
			}
		}
	}
};
/**
 * Checks for the existance of a builtin listener
 *
 * @memberOf Event
 * @param  {Object}   obj 	  The element attached to the action.
 * @param  {String}   evt 	  The name of the event.
 * @param  {Function} action  The action to execute upon the event firing.
 * @param  {Object}   binding The object to scope the action to.
 * @return {Object} 		  Returns a builtin event object.
 */
Event.prototype.getBuiltinListenerIdx = function(obj,evt,action,binding)
{
	for(var i = this.builtinEvts.length-1;i >= 0;i--)
	{
		var ArrayEl = this.builtinEvts[i];
		if(ArrayEl)
			if(ArrayEl.obj == obj && ArrayEl.evt == evt && ArrayEl.action == action && ArrayEl.binding == binding)
				return i;
	}
	return -1;
};
/**
 * Adds a builtin listener
 *
 * @memberOf Event
 * @param  {Object}   obj 	  The element attached to the action.
 * @param  {String}   evt 	  The name of the event.
 * @param  {Function} action  The action to execute upon the event firing.
 * @param  {Object}   binding The object to scope the action to.
 * @return {null} 		      Returns null.
 */
Event.prototype.addBuiltinListener = function(obj,evt,action,binding, captura)
{
	if(obj && evt && action)
	{
		if(this.getBuiltinListenerIdx(obj,evt,action,binding) < 0)
		{
			var boundAction = action;
			if(binding)
				boundAction = action.bind(binding);
			if(obj.addEventListener)
				if (!captura)
					obj.addEventListener(evt,boundAction, false);
				else
					obj.addEventListener(evt,boundAction, captura);
			else if(obj.attachEvent)
				obj.attachEvent('on' + evt,boundAction);
			else
				obj['on' + evt] = boundAction;
			this.builtinEvts[this.builtinEvts.length] = {obj:obj,evt:evt,action:action,binding:binding,boundAction:boundAction};
		}
	}
};
/**
 * Removes a builtin listener
 *
 * @memberOf Event
 * @param  {Object}   obj 	  The element attached to the action.
 * @param  {String}   evt 	  The name of the event.
 * @param  {Function} action  The action to execute upon the event firing.
 * @param  {Object}   binding The object to scope the action to.
 * @return {null} 			  Returns null.
 */
Event.prototype.removeBuiltinListener = function(obj,evt,action,binding)
{
	for(var i = this.builtinEvts.length-1;i >= 0;i--)
	{
		var ArrayEl = this.builtinEvts[i];
		if(ArrayEl)
		{
			if(obj && evt && action && binding){
				if(ArrayEl.obj == obj && ArrayEl.evt == evt && ArrayEl.action == action && ArrayEl.binding == binding)
				{
					this.detachListener(ArrayEl,i);
					break;
				}
			}else if(obj && evt && action){
				if(ArrayEl.obj == obj && ArrayEl.evt == evt && ArrayEl.action == action)
					this.detachListener(ArrayEl,i);
			}else if(obj && evt){
				if(ArrayEl.obj == obj && ArrayEl.evt == evt)
					this.detachListener(ArrayEl,i);
			}else if(obj){
				if(ArrayEl.obj == obj)
					this.detachListener(ArrayEl,i);
			}else
				this.detachListener(ArrayEl,i);
		}
	}
};
/**
 * Detaches a builtin listener from a DOM object (prevents memory leaks)
 *
 * @memberOf Event
 * @param  {Object} arrayEl The builtin listener object.
 * @param  {Number} idx   	The index of the object in the builtin listener array.
 * @return {null}  			Returns null.
 */
Event.prototype.detachListener = function(arrayEl,idx)
{
	var obj = arrayEl.obj;
	var evt = arrayEl.evt;
	var boundAction = arrayEl.boundAction;

	if(obj.removeEventListener)
		obj.removeEventListener(evt,boundAction,false);
	evt = 'on' + evt;
	if(obj.detachEvent)
		obj.detachEvent(evt,boundAction);
	obj[evt] = null;

	delete arrayEl.obj;
	delete arrayEl.evt;
	delete arrayEl.action;
	delete arrayEl.binding;
	delete arrayEl.boundAction;

	delete this.builtinEvts[idx];
	this.builtinEvts.splice(idx,1);
};