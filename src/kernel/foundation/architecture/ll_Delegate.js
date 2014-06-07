/**
 * @class Kernel.Facilities.Class.Delegate
 * Creates a Class that delegates all of its method calls via Delegate#method_missing.
 * Take a look to {@link ProxyConstructor} to find out other ways.
 *
 * @constructor
 * Creates a Delegated class.
 *
 * @param {String} class_name Name of the class to delegate missing methods.
 */
function Delegate(class_name){
  this.delegate_class = eval(class_name)
}

/**
 * @method method_missing
 * Forward all failed method calls to class_name
 * This method is automatically called by the framework.
 */
Delegate.prototype.method_missing = function(method, params){
  return this.delegate_class[method].call(this, params)
}
