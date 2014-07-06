Ext.data.JsonP.Kernel_Foundation_Enumerable_InterleavedArray({"tagname":"class","name":"Kernel.Foundation.Enumerable.InterleavedArray","autodetected":{},"files":[{"filename":"ll_InterleavedArray.js","href":"ll_InterleavedArray.html#Kernel-Foundation-Enumerable-InterleavedArray"}],"members":[{"name":"constructor","tagname":"method","owner":"Kernel.Foundation.Enumerable.InterleavedArray","id":"method-constructor","meta":{}},{"name":"enumerate","tagname":"method","owner":"Kernel.Foundation.Enumerable.InterleavedArray","id":"method-enumerate","meta":{}},{"name":"go","tagname":"method","owner":"Kernel.Foundation.Enumerable.InterleavedArray","id":"method-go","meta":{}},{"name":"infiltrate","tagname":"method","owner":"Kernel.Foundation.Enumerable.InterleavedArray","id":"method-infiltrate","meta":{"chainable":true}},{"name":"inspect","tagname":"method","owner":"Kernel.Foundation.Enumerable.InterleavedArray","id":"method-inspect","meta":{}},{"name":"keys","tagname":"method","owner":"Kernel.Foundation.Enumerable.InterleavedArray","id":"method-keys","meta":{}},{"name":"size","tagname":"method","owner":"Kernel.Foundation.Enumerable.InterleavedArray","id":"method-size","meta":{}},{"name":"to_a","tagname":"method","owner":"Kernel.Foundation.Enumerable.InterleavedArray","id":"method-to_a","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Kernel.Foundation.Enumerable.InterleavedArray","short_doc":"Creates an array with subindexes as in semantic version controlling. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/ll_InterleavedArray.html#Kernel-Foundation-Enumerable-InterleavedArray' target='_blank'>ll_InterleavedArray.js</a></div></pre><div class='doc-contents'><p>Creates an array with subindexes as in <a href=\"http://semver.org/\">semantic version controlling</a>.\nIt is the complementary class of Enumeration <a href=\"#!/api/Kernel.Foundation.Enumerable.Enumeration\" rel=\"Kernel.Foundation.Enumerable.Enumeration\" class=\"docClass\">Kernel.Foundation.Enumerable.Enumeration</a></p>\n\n<h3>Example</h3>\n\n<pre><code>new Interleaved Array([2, 1, [2, [3, [5,7], 5]], 7, 10, [4, [5,7]], 5])\n//=&gt; {\n//=&gt;   0: 2\n//=&gt;   1: 1\n//=&gt;   2: 2\n//=&gt;   2.1: 3\n//=&gt;   2.2: 5,7\n//=&gt;   2.3: 5\n//=&gt;   3: 7\n//=&gt;   4: 10\n//=&gt;   5: 4\n//=&gt;   5.1: 5\n//=&gt;   5.2: 7\n//=&gt;   6: 5\n//=&gt; }\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.InterleavedArray'>Kernel.Foundation.Enumerable.InterleavedArray</span><br/><a href='source/ll_InterleavedArray.html#Kernel-Foundation-Enumerable-InterleavedArray-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Kernel.Foundation.Enumerable.InterleavedArray-method-constructor' class='name expandable'>Kernel.Foundation.Enumerable.InterleavedArray</a>( <span class='pre'>elements</span> ) : <a href=\"#!/api/Kernel.Foundation.Enumerable.InterleavedArray\" rel=\"Kernel.Foundation.Enumerable.InterleavedArray\" class=\"docClass\">Kernel.Foundation.Enumerable.InterleavedArray</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates a new InterleavedArray\n\nExample\n\nnew InterleavedArray(2)\n//=&gt; { 0: 2}\n\nnew InterleavedArray([2])\n//=&gt; {...</div><div class='long'><p>Creates a new InterleavedArray</p>\n\n<h3>Example</h3>\n\n<pre><code>new InterleavedArray(2)\n//=&gt; { 0: 2}\n\nnew InterleavedArray([2])\n//=&gt; {0: undefined, 0.1: 2}\n\nnew InterleavedArray(2,3)\n//=&gt; {0: 2, 1:3 }\n\nnew InterleavedArray([2,3], [5,7])\n//=&gt; {0: undefined, 0.1: 2, 0.2: 3, 1:undefined, 1.1: 5, 1.2: 7}\n\nnew InterleavedArray(1, [2,3], [5,7])\n//=&gt; {0: 1, 0.1: 2, 0.2: 3, 1:undefined, 1.1: 5, 1.2: 7}\n\nnew InterleavedArray([2,3])\n//=&gt; {0: undefined, 0.1: 2, 0.2: 3}\n\nnew InterleavedArray([2,3], 3, [5,7])\n//=&gt; {0: undefined, 0.1: 2, 0.2: 3, 1:3, 1.1: 5, 1.2: 7}\n\nnew InterleavedArray([2], 3)\n//=&gt; { 0: undefined, 0.1: 2, 1: 3}\n\nnew InterleavedArray([[2], 3], 7)\n//=&gt; { 0: undefined, 0.1: undefined, 0.1.1: 2, 0.2: 3, 1: 7}\n\nnew InterleavedArray(2, [3, 5])\n//=&gt; {0: 2, 0.1: 3, 0.2: 5}\n\nnew InterleavedArray( [2, [3, 5]] )\n//=&gt; {0: undefined, 0.1: 2, 0.1.1: 3, 0.1.2: 5}\n\nnew InterleavedArray( [2, [3, 5], 8], 9 )\n//=&gt; {0: undefined, 0.1: 2, 0.1.1: 3, 0.1.2: 5, 0.2: 8, 1: 9}\n\nnew Interleaved Array( 2, 1, [2, [3, [5,7], 5]], 7, 10, [4, [5,7]], 5)\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>elements</span> : Object | Array<div class='sub-desc'><p>Variadic list or elements.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Kernel.Foundation.Enumerable.InterleavedArray\" rel=\"Kernel.Foundation.Enumerable.InterleavedArray\" class=\"docClass\">Kernel.Foundation.Enumerable.InterleavedArray</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-enumerate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.InterleavedArray'>Kernel.Foundation.Enumerable.InterleavedArray</span><br/><a href='source/ll_InterleavedArray.html#Kernel-Foundation-Enumerable-InterleavedArray-method-enumerate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.InterleavedArray-method-enumerate' class='name expandable'>enumerate</a>( <span class='pre'>base_index, subarray</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Reenumerates all of the entries of the InterleavedArray ...</div><div class='long'><p>Reenumerates all of the entries of the InterleavedArray</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>base_index</span> : Number|String<div class='sub-desc'><p>Base number for the enumeration.</p>\n</div></li><li><span class='pre'>subarray</span> : InterleavedArray<div class='sub-desc'><p>Subelements to interleave</p>\n</div></li></ul></div></div></div><div id='method-go' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.InterleavedArray'>Kernel.Foundation.Enumerable.InterleavedArray</span><br/><a href='source/ll_InterleavedArray.html#Kernel-Foundation-Enumerable-InterleavedArray-method-go' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.InterleavedArray-method-go' class='name expandable'>go</a>( <span class='pre'>index</span> ) : Array | InterleavedArray<span class=\"signature\"></span></div><div class='description'><div class='short'>Gains access to a subarray\n\nExample\n\nvar a = new InterleavedArray(4, [3, [2, 5]], 2, 1)\n\na.go().inspect()\n//=&gt; 0: ...</div><div class='long'><p>Gains access to a subarray</p>\n\n<h3>Example</h3>\n\n<pre><code>var a = new InterleavedArray(4, [3, [2, 5]], 2, 1)\n\na.go().inspect()\n//=&gt; 0: 4\n//=&gt; 0.1: 3\n//=&gt; 0.1.1: 2\n//=&gt; 0.1.2: 5\n//=&gt; 1: 2\n//=&gt; 2: 1\n\na.go(0).inspect()\n//=&gt; 0: 3\n//=&gt; 0.1: 2\n//=&gt; 0.2: 5\n\na.go(0.1).inspect()\n//=&gt; 0: 2\n//=&gt; 1: 5\n\nvar a = new InterleavedArray(4, [3, [2, [5]]], 2, 1)\na.go(\"1.1.2\").inspect()\n//=&gt; 0: 5\n//=&gt; 0.1: 4\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : String | Number<div class='sub-desc'><p>Index of subarray</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array | InterleavedArray</span><div class='sub-desc'><p>Nested array between two integer positions.</p>\n</div></li></ul></div></div></div><div id='method-infiltrate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.InterleavedArray'>Kernel.Foundation.Enumerable.InterleavedArray</span><br/><a href='source/ll_InterleavedArray.html#Kernel-Foundation-Enumerable-InterleavedArray-method-infiltrate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.InterleavedArray-method-infiltrate' class='name expandable'>infiltrate</a>( <span class='pre'>position, elements</span> ) : InterleavedArray<span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Sets an element or an array as a subelement. ...</div><div class='long'><p>Sets an element or an array as a subelement.</p>\n\n<h3>Example</h3>\n\n<pre><code>var a = new InterleavedArray(4, 3, [2, 5], 2, 1)\na.infiltrate(1, [2, [3, [5, 7]]])\n//=&gt; {\n//=&gt;    0: 4,\n//=&gt;    1: 3,\n//=&gt;    1.1: 2,\n//=&gt;    1.2: 5,\n//=&gt;    1.3: 2,\n//=&gt;    1.3.1: 3,\n//=&gt;    1.3.1.1: 5,\n//=&gt;    1.3.1.2: 7,\n//=&gt;    2: 2,\n//=&gt;    3: 1\n//=&gt; }\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>position</span> : Number<div class='sub-desc'><p>Major number for all subelements.</p>\n</div></li><li><span class='pre'>elements</span> : Object | InterleavedArray<div class='sub-desc'><p>Variadic elements to insert.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>InterleavedArray</span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div><div id='method-inspect' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.InterleavedArray'>Kernel.Foundation.Enumerable.InterleavedArray</span><br/><a href='source/ll_InterleavedArray.html#Kernel-Foundation-Enumerable-InterleavedArray-method-inspect' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.InterleavedArray-method-inspect' class='name expandable'>inspect</a>( <span class='pre'>index</span> ) : string<span class=\"signature\"></span></div><div class='description'><div class='short'>Return the keys and value in the InterleavedArray\n\nExample\n\nvar a = new InterleavedArray(1,[2, [3, 5]], [5, 1],3,[4])...</div><div class='long'><p>Return the keys and value in the InterleavedArray</p>\n\n<h2>Example</h2>\n\n<p>var a = new InterleavedArray(1,[2, [3, 5]], [5, 1],3,[4])\na.inspect()\n//=> 0: 1\n     0.1: 2\n     0.1.1: 3\n     0.1.2: 5\n     1: undefined\n     1.1: 5\n     1.2: 1\n     2: 3\n     2.1: 4</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : String | void<div class='sub-desc'><p>The position index.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>string</span><div class='sub-desc'><p>txt All keys and values in the InterleavedArray.</p>\n</div></li></ul></div></div></div><div id='method-keys' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.InterleavedArray'>Kernel.Foundation.Enumerable.InterleavedArray</span><br/><a href='source/ll_InterleavedArray.html#Kernel-Foundation-Enumerable-InterleavedArray-method-keys' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.InterleavedArray-method-keys' class='name expandable'>keys</a>( <span class='pre'></span> ) : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>Return the keys in the InterleavedArray\n\nExample\n\nvar a = new InterleavedArray(0, 1, [5, [[7], 8, 9], 4)\na.keys()\n//=...</div><div class='long'><p>Return the keys in the InterleavedArray</p>\n\n<h3>Example</h3>\n\n<p>var a = new InterleavedArray(0, 1, [5, [[7], 8, 9], 4)\na.keys()\n//=> [\"0\", \"1\", \"1.1\", \"1.1.1\", \"1.2\", \"1.3\", \"2\"]</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array</span><div class='sub-desc'><p>array The keys in order.</p>\n</div></li></ul></div></div></div><div id='method-size' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.InterleavedArray'>Kernel.Foundation.Enumerable.InterleavedArray</span><br/><a href='source/ll_InterleavedArray.html#Kernel-Foundation-Enumerable-InterleavedArray-method-size' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.InterleavedArray-method-size' class='name expandable'>size</a>( <span class='pre'></span> ) : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>Return the number of elements in InterleavedArray ...</div><div class='long'><p>Return the number of elements in InterleavedArray</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-to_a' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kernel.Foundation.Enumerable.InterleavedArray'>Kernel.Foundation.Enumerable.InterleavedArray</span><br/><a href='source/ll_InterleavedArray.html#Kernel-Foundation-Enumerable-InterleavedArray-method-to_a' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kernel.Foundation.Enumerable.InterleavedArray-method-to_a' class='name expandable'>to_a</a>( <span class='pre'>index</span> ) : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>Converts to array\n\nExample\n\nvar a = new InterleavedArray(2, [3, 5])\n//=&gt; {0: 2, 0.1: 3, 0.2: 5}\na.to_a()\n//=&gt; [...</div><div class='long'><p>Converts to array</p>\n\n<h3>Example</h3>\n\n<pre><code>var a = new InterleavedArray(2, [3, 5])\n//=&gt; {0: 2, 0.1: 3, 0.2: 5}\na.to_a()\n//=&gt; [2, [3, 5]]\na.to_a(0)\n//=&gt; [3, 5]\n\nvar a = new InterleavedArray(4, [3, [2, 5]], 2, 1)\na.to_a().toSource()\n//=&gt; [4, [3, [2, 5]], 2, 1]\n\na.to_a(0).toSource()\n//=&gt; [3, [2, 5]]\n\na.to_a(1).toSource()\n//=&gt; []\n\nvar a = new InterleavedArray(1, 4, [3, [2, 7, [5, [4] ]], 2], 1)\na.to_a(\"1.1.2\").toSource()\n//=&gt; [5, [4]]\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : String | Number | undefined<div class='sub-desc'><p>The index of the position in the InterleavedArray</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array</span><div class='sub-desc'><p>array Returns the array with data. in the InterleavedArray</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});