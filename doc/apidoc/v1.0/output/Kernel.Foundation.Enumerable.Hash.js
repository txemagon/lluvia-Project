Ext.data.JsonP.Kernel_Foundation_Enumerable_Hash({"tagname":"class","name":"Kernel.Foundation.Enumerable.Hash","autodetected":{},"files":[{"filename":"ll_Hash.js","href":"ll_Hash.html#Kernel-Foundation-Enumerable-Hash"}],"members":[{"name":"constructor","tagname":"method","owner":"Kernel.Foundation.Enumerable.Hash","id":"method-constructor","meta":{}},{"name":"collect","tagname":"method","owner":"Kernel.Foundation.Enumerable.Hash","id":"method-collect","meta":{}},{"name":"each","tagname":"method","owner":"Kernel.Foundation.Enumerable.Hash","id":"method-each","meta":{}},{"name":"own_values","tagname":"method","owner":"Kernel.Foundation.Enumerable.Hash","id":"method-own_values","meta":{}},{"name":"self_values","tagname":"method","owner":"Kernel.Foundation.Enumerable.Hash","id":"method-self_values","meta":{}},{"name":"size","tagname":"method","owner":"Kernel.Foundation.Enumerable.Hash","id":"method-size","meta":{}},{"name":"values","tagname":"method","owner":"Kernel.Foundation.Enumerable.Hash","id":"method-values","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Kernel.Foundation.Enumerable.Hash","component":false,"superclasses":[],"subclasses":["Kernel.Foundation.Enumerable.AutoHash"],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Subclasses</h4><div class='dependency'><a href='#!/api/Kernel.Foundation.Enumerable.AutoHash' rel='Kernel.Foundation.Enumerable.AutoHash' class='docClass'>Kernel.Foundation.Enumerable.AutoHash</a></div><h4>Files</h4><div class='dependency'><a href='source/ll_Hash.html#Kernel-Foundation-Enumerable-Hash' target='_blank'>ll_Hash.js</a></div></pre><div class='doc-contents'><p>Creates an associative array.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.Hash'>Kernel.Foundation.Enumerable.Hash</span><br/><a href='source/ll_Hash.html#Kernel-Foundation-Enumerable-Hash-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Kernel.Foundation.Enumerable.Hash-method-constructor' class='name expandable'>Kernel.Foundation.Enumerable.Hash</a>( <span class='pre'>initial_data</span> ) : <a href=\"#!/api/Kernel.Foundation.Enumerable.Hash\" rel=\"Kernel.Foundation.Enumerable.Hash\" class=\"docClass\">Kernel.Foundation.Enumerable.Hash</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Example\n\nvar a = new Hash({name: \"John\"}, function(){} ) ...</div><div class='long'><h3>Example</h3>\n\n<pre><code>var a = new Hash({name: \"John\"}, function(){} )\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>initial_data</span> : Object<div class='sub-desc'><p>Initial values for the Hash.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Kernel.Foundation.Enumerable.Hash\" rel=\"Kernel.Foundation.Enumerable.Hash\" class=\"docClass\">Kernel.Foundation.Enumerable.Hash</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-collect' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.Hash'>Kernel.Foundation.Enumerable.Hash</span><br/><a href='source/ll_Hash.html#Kernel-Foundation-Enumerable-Hash-method-collect' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.Hash-method-collect' class='name expandable'>collect</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Collects into an Array all the values returned by a block. ...</div><div class='long'><p>Collects into an Array all the values returned by a block.</p>\n\n<h3>Example</h3>\n\n<pre><code>var a = new Hash({\"ramon\", \"pepe\"})\na.collect(function(obj) {\n  return 1\n})\n// =&gt; [1, 1]\n</code></pre>\n</div></div></div><div id='method-each' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.Hash'>Kernel.Foundation.Enumerable.Hash</span><br/><a href='source/ll_Hash.html#Kernel-Foundation-Enumerable-Hash-method-each' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.Hash-method-each' class='name expandable'>each</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Calls the block with every key/value pair. ...</div><div class='long'><p>Calls the block with every key/value pair. Notice that those\nkey reached via the prototype chain are explicitly excluded.</p>\n</div></div></div><div id='method-own_values' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.Hash'>Kernel.Foundation.Enumerable.Hash</span><br/><a href='source/ll_Hash.html#Kernel-Foundation-Enumerable-Hash-method-own_values' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.Hash-method-own_values' class='name expandable'>own_values</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>.\nAlias of Hash#self_values. ...</div><div class='long'><p>.\nAlias of Hash#self_values.</p>\n</div></div></div><div id='method-self_values' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.Hash'>Kernel.Foundation.Enumerable.Hash</span><br/><a href='source/ll_Hash.html#Kernel-Foundation-Enumerable-Hash-method-self_values' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.Hash-method-self_values' class='name expandable'>self_values</a>( <span class='pre'></span> ) : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns a list with values set directly on this object keys. ...</div><div class='long'><p>Returns a list with values set directly on this object keys.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array</span><div class='sub-desc'><p>List of non inherited values.</p>\n</div></li></ul></div></div></div><div id='method-size' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.Hash'>Kernel.Foundation.Enumerable.Hash</span><br/><a href='source/ll_Hash.html#Kernel-Foundation-Enumerable-Hash-method-size' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.Hash-method-size' class='name expandable'>size</a>( <span class='pre'></span> ) : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the numbers of selk keys ...</div><div class='long'><p>Returns the numbers of selk keys</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-values' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.Hash'>Kernel.Foundation.Enumerable.Hash</span><br/><a href='source/ll_Hash.html#Kernel-Foundation-Enumerable-Hash-method-values' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.Hash-method-values' class='name expandable'>values</a>( <span class='pre'></span> ) : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns an array with the values of all the reachable keys of this object. ...</div><div class='long'><p>Returns an array with the values of all the reachable keys of this object.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array</span><div class='sub-desc'><p>Object values list.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});