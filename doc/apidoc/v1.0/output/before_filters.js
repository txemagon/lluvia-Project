Ext.data.JsonP.before_filters({"tagname":"class","name":"before_filters","autodetected":{},"files":[{"filename":"ll_Class.js","href":"ll_Class.html#before_filters"}],"type":"Object","default":null,"properties":null,"members":[{"name":"add_after_filter","tagname":"method","owner":"before_filters","id":"method-add_after_filter","meta":{}},{"name":"add_before_filter","tagname":"method","owner":"before_filters","id":"method-add_before_filter","meta":{}},{"name":"attr_accessor","tagname":"method","owner":"before_filters","id":"method-attr_accessor","meta":{}},{"name":"attr_reader","tagname":"method","owner":"before_filters","id":"method-attr_reader","meta":{}},{"name":"attr_writer","tagname":"method","owner":"before_filters","id":"method-attr_writer","meta":{}},{"name":"call_after","tagname":"method","owner":"before_filters","id":"method-call_after","meta":{}},{"name":"call_before","tagname":"method","owner":"before_filters","id":"method-call_before","meta":{}},{"name":"create_attr","tagname":"method","owner":"before_filters","id":"method-create_attr","meta":{}},{"name":"method_missing","tagname":"method","owner":"before_filters","id":"method-method_missing","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-before_filters","html_type":"Object","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/ll_Class.html#before_filters' target='_blank'>ll_Class.js</a></div></pre><div class='doc-contents'><p>Base class of all lluvia classes.Hash with all the functions to be called before a particular method.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-add_after_filter' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='before_filters'>before_filters</span><br/><a href='source/ll_Class.html#before_filters-method-add_after_filter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/before_filters-method-add_after_filter' class='name expandable'>add_after_filter</a>( <span class='pre'>observed_function, filters</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Adds a function to be called before a particular method invocation.. ...</div><div class='long'><p>Adds a function to be called before a particular method invocation..</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>observed_function</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Name of the method to be wrapped.</p>\n</div></li><li><span class='pre'>filters</span> : function()<div class='sub-desc'><p>Function or functions to be called after the observed one.</p>\n\n<h3>Example</h3>\n\n<p>   var a = false;\n   var b = 0;</p>\n\n<p>   function change(){\n     a = true;\n   };\n   function Person() {;}</p>\n\n<p>   Person.prototype.greet = function (name){ return class_name };</p>\n\n<p>   me = new Person('Txema');\n   me.add_after_filter('greet', change, function(){ b = 2 } );\n   me.greet();\n   a //=> true\n   b //=> 2</p>\n\n<p>todo: When defined inside class it should keep track of scope. For this purpose\nuse Function#bind nowadays.</p>\n</div></li></ul></div></div></div><div id='method-add_before_filter' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='before_filters'>before_filters</span><br/><a href='source/ll_Class.html#before_filters-method-add_before_filter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/before_filters-method-add_before_filter' class='name expandable'>add_before_filter</a>( <span class='pre'>observed_function, filters</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Adds a function to be called before a particular method invocation.. ...</div><div class='long'><p>Adds a function to be called before a particular method invocation..</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>observed_function</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Name of the method to be wrapped.</p>\n</div></li><li><span class='pre'>filters</span> : function()<div class='sub-desc'><p>Function or functions to be called before the observed one.</p>\n\n<h3>Example</h3>\n\n<p>   var a = false;\n   var b = 0;</p>\n\n<p>   function change(){\n     a = true;\n   };\n   function Person() {;}</p>\n\n<p>   Person.prototype.greet = function (name){ return class_name };</p>\n\n<p>   me = new Person('Txema');\n   me.add_before_filter('greet', change, function(){ b = 2 } );\n   me.greet();\n   a //=> true\n   b //=> 2</p>\n\n<p>todo: When defined inside class it should keep track of scope. For this purpose\nuse Function#bind nowadays.</p>\n</div></li></ul></div></div></div><div id='method-attr_accessor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='before_filters'>before_filters</span><br/><a href='source/ll_Class.html#before_filters-method-attr_accessor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/before_filters-method-attr_accessor' class='name expandable'>attr_accessor</a>( <span class='pre'>attr_names</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Creates an attribute along with a setter and a getter. ...</div><div class='long'><p>Creates an attribute along with a setter and a getter. See Class#attr_reader or Class#attr_writer.\n*</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>attr_names</span> :  <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> | Array | Object <div class='sub-desc'><p>Arrays are parsed element by element.\n        Default values are possible passing an Object as a parameter.\n        See Class#create_attr for further details</p>\n\n<h3>Example</h3>\n\n<pre><code>Person.prototype = new Class\nPerson.prototype.constructor = Person\n\nfunction Person() {;}\nme = new Person()\nme.attr_accessor('name')\nme.attr_accessor('age', 'height')\n</code></pre>\n</div></li></ul></div></div></div><div id='method-attr_reader' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='before_filters'>before_filters</span><br/><a href='source/ll_Class.html#before_filters-method-attr_reader' target='_blank' class='view-source'>view source</a></div><a href='#!/api/before_filters-method-attr_reader' class='name expandable'>attr_reader</a>( <span class='pre'>attr_names</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Decorator function that creates attribute getters along with the attribute itself. ...</div><div class='long'><p>Decorator function that creates attribute getters along with the attribute itself.\nIt doesn't do anything if attribute exists.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>attr_names</span> :  <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> | Array | Object <div class='sub-desc'><p>Arrays are parsed element by element.\n        Default values are possible passing an Object as a parameter.\n        See Class#create_attr for further details</p>\n\n<h3>Example</h3>\n\n<pre><code>Person.prototype = new Class\nPerson.prototype.constructor = Person\n\nfunction Person() {;}\nme = new Person()\nme.attr_reader('name')\nme.attr_reader('age', 'height')\n</code></pre>\n\n<p> Then camelcased and undescored getters are provided.</p>\n\n<pre><code>me.get_name()\nme.getName()\n</code></pre>\n\n<p>A big todo is to achieve the class inside usage.</p>\n\n<pre><code>function Person() {\n    this.attr_reader('name')\n}\n</code></pre>\n</div></li></ul></div></div></div><div id='method-attr_writer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='before_filters'>before_filters</span><br/><a href='source/ll_Class.html#before_filters-method-attr_writer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/before_filters-method-attr_writer' class='name expandable'>attr_writer</a>( <span class='pre'>attr_names</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Decorator function that creates attribute setters along with the attribute itself. ...</div><div class='long'><p>Decorator function that creates attribute setters along with the attribute itself.\nIt doesn't do anything if attribute exists.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>attr_names</span> :  <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> | Array | Object <div class='sub-desc'><p>Arrays are parsed element by element.\n        Default values are possible passing an Object as a parameter.\n        See Class#create_attr for further details</p>\n\n<h3>Example</h3>\n\n<pre><code>Person.prototype = new Class\nPerson.prototype.constructor = Person\n\nfunction Person() {;}\nme = new Person()\nme.attr_writer('name')\nme.attr_writer('age', 'height')\n</code></pre>\n\n<p> Then camelcased and undescored getters are provided.</p>\n\n<pre><code>me.set_name('james')\nme.setName('jim')\n</code></pre>\n</div></li></ul></div></div></div><div id='method-call_after' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='before_filters'>before_filters</span><br/><a href='source/ll_Class.html#before_filters-method-call_after' target='_blank' class='view-source'>view source</a></div><a href='#!/api/before_filters-method-call_after' class='name expandable'>call_after</a>( <span class='pre'>function_name</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Executes all the after filters for a given function. ...</div><div class='long'><p>Executes all the after filters for a given function.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>function_name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Name of the observed method.</p>\n</div></li></ul></div></div></div><div id='method-call_before' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='before_filters'>before_filters</span><br/><a href='source/ll_Class.html#before_filters-method-call_before' target='_blank' class='view-source'>view source</a></div><a href='#!/api/before_filters-method-call_before' class='name expandable'>call_before</a>( <span class='pre'>function_name</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Executes all the before filters for a given function. ...</div><div class='long'><p>Executes all the before filters for a given function. Filters\nare executed automatically when _ClassFactory is used</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>function_name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Name of the observed method.</p>\n</div></li></ul></div></div></div><div id='method-create_attr' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='before_filters'>before_filters</span><br/><a href='source/ll_Class.html#before_filters-method-create_attr' target='_blank' class='view-source'>view source</a></div><a href='#!/api/before_filters-method-create_attr' class='name expandable'>create_attr</a>( <span class='pre'>attr, initial_value</span> ) : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>Creates an attribute. ...</div><div class='long'><p>Creates an attribute.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>attr</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>attribute to be created.</p>\n</div></li><li><span class='pre'>initial_value</span> : Object<div class='sub-desc'><p>Inital value for attr.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array</span><div class='sub-desc'><p>List of newly created attributes names.</p>\n\n<h3>Example</h3>\n\n<pre><code>Person.prototype = new Class\nPerson.prototype.constructor = Person\n\nfunction Person() {;}\n\nvar me = new Person()\nme.create_attr( 'name' )\nme.create_attr( 'age', 'height' )\nme.create_attr( ['age', 'height'] )\nme.create_attr( ['age', 'height'], name, ['money', 'studies'] )\nme.create_attr( {name: 'james', age: 22} )\n</code></pre>\n</div></li></ul></div></div></div><div id='method-method_missing' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='before_filters'>before_filters</span><br/><a href='source/ll_Class.html#before_filters-method-method_missing' target='_blank' class='view-source'>view source</a></div><a href='#!/api/before_filters-method-method_missing' class='name expandable'>method_missing</a>( <span class='pre'>method, object, arguments</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Throws an exception when a method is not defined. ...</div><div class='long'><p>Throws an exception when a method is not defined.</p>\n\n<p>provides the following dynamic method:</p>\n\n<p>Class_&lt;ClassName&gt;()</p>\n\n<h3>Example:</h3>\n\n<pre><code>// Create class MyClass\nClass_MyClass()\n\n// Create class Person\nClass_Person(function(name){this.name = 'juan'},\n             function initialize(name){ this.name = name },\n             function(){this.name = 'luis'});\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>method</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li><li><span class='pre'>object</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li><li><span class='pre'>arguments</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});