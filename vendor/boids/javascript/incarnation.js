
/**
 * @class Incarnation
 * @param {[type]} default_action [description]
 * @param {[type]} configuration  [description]
 */
function Incarnation(default_action){
	this.list = {}
	this.list["default"] = default_action
}

/**
 * [add_new_list_element description]
 * @param {[type]} name   [description]
 * @param {[type]} action [description]
 */
Incarnation.prototype.add_new_list_element = function(name, action){
	if(name in this.list){
		throw("This list object already exists")
		return;
	}
	this.list[name] = action
}

/**
 * [edit_list_element description]
 * @param  {[type]} name   [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
Incarnation.prototype.edit_list_element = function(name, action){
	if(!(name in this.list))
		throw("This list object does not exist")
	this.list[name] = action
}

/**
 * [delete_list_element description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
Incarnation.prototype.delete_list_element = function(name){
	if(!(name in this.list))
		throw("This list object does not exist")
	delete this.list[name]	
}

/**
 * [search_list_element description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
var end_object  = {Object:"", Number:"", String:"", Array:""}
Incarnation.prototype.search_list_element = function(obj){
	if(typeof(obj) == "string"){
		if(obj in this.list)
			return obj
		else
			return "default"
	}
	var constructor = obj.__proto__

	
    if(constructor.constructor.name in this.list)
		return constructor.constructor.name

	if( !(constructor.constructor.name in this.list) && !(constructor.constructor.name in end_object))
		  return this.search_list_element(constructor)
    else
    	return "default"
}

/**
 * [get_list_element description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
Incarnation.prototype.get_list_element = function(obj){
	return this.list[this.search_list_element(obj)]
}