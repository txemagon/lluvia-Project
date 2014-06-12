Ext.data.JsonP.Engine_Gate({"tagname":"class","name":"Engine.Gate","autodetected":{},"files":[{"filename":"ll_Gate.js","href":"ll_Gate.html#Engine-Gate"}],"params":[{"tagname":"params","type":"String | HTMLElement","name":"element","optional":true,"doc":"<p>HTML Element to wrap.</p>\n","html_type":"<a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> | HTMLElement"},{"tagname":"params","type":"String | HTMLElement","name":"parent","optional":true,"doc":"<p>HTML container to place the Gate.</p>\n","html_type":"<a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> | HTMLElement"},{"tagname":"params","type":"Object","name":"config","optional":true,"doc":"<p>Action responders.</p>\n\n<h3>Example</h3>\n\n<p>Given this HTML:</p>\n\n<pre><code>&lt;div id=\"button_bar\"&gt;&amp;nbsp;&lt;/div&gt;\n</code></pre>\n\n<p>We write:</p>\n\n<pre><code>var brush_button = new Gate(\"brush_btn\", \"button_bar\")\n</code></pre>\n\n<p>That generates a div with id \"brush_btn\" and a javascript object that will respond to\nevery html event whenever it defines the corresponding handler.</p>\n\n<p>Don't use this class directly, but subclassify it preferently as in the following example.</p>\n\n<h3>Usage</h3>\n\n<pre><code>Button.prototype = new Gate\nButton.prototype.constructor = Button\n\nfunction Button(element){\n\ntry {\n    if (arguments.length)\n        Gate.call(this, element)    // Call to the super constructor (it does all the work).\n} catch (e) {\n    if ($K_debug_level &gt;= $KC_dl.DEVELOPER)\n        alert(\"No event handlers were found.\\nException: \" + e.toSource())\n}\n}\n\nButton.prototype.do_onclick   = function(event, element){\nalert(\"You have made click.\")\n}\n</code></pre>\n\n<h3>Example</h3>\n\n<pre><code>var b = new Button(id_of_html_element, null, {\n    do_onmouseover: function(event, element) {\n        alert(\"Hello\")\n    }\n})\n</code></pre>\n","html_type":"Object"}],"members":[{"name":"new_effect","tagname":"method","owner":"Engine.Gate","id":"method-new_effect","meta":{}},{"name":"run","tagname":"method","owner":"Engine.Gate","id":"method-run","meta":{"private":true}}],"alternateClassNames":[],"aliases":{},"id":"class-Engine.Gate","short_doc":"A Gate is a lluvia (javascript) wrapper for html elements. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/ll_Gate.html#Engine-Gate' target='_blank'>ll_Gate.js</a></div></pre><div class='doc-contents'><p>A Gate is a lluvia (javascript) wrapper for html elements. They're conceived\nto respond to html events keeping the object scope.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>element</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> | HTMLElement (optional)<div class='sub-desc'><p>HTML Element to wrap.</p>\n</div></li><li><span class='pre'>parent</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> | HTMLElement (optional)<div class='sub-desc'><p>HTML container to place the Gate.</p>\n</div></li><li><span class='pre'>config</span> : Object (optional)<div class='sub-desc'><p>Action responders.</p>\n\n<h3>Example</h3>\n\n<p>Given this HTML:</p>\n\n<pre><code>&lt;div id=\"button_bar\"&gt;&amp;nbsp;&lt;/div&gt;\n</code></pre>\n\n<p>We write:</p>\n\n<pre><code>var brush_button = new Gate(\"brush_btn\", \"button_bar\")\n</code></pre>\n\n<p>That generates a div with id \"brush_btn\" and a javascript object that will respond to\nevery html event whenever it defines the corresponding handler.</p>\n\n<p>Don't use this class directly, but subclassify it preferently as in the following example.</p>\n\n<h3>Usage</h3>\n\n<pre><code>Button.prototype = new Gate\nButton.prototype.constructor = Button\n\nfunction Button(element){\n\ntry {\n    if (arguments.length)\n        Gate.call(this, element)    // Call to the super constructor (it does all the work).\n} catch (e) {\n    if ($K_debug_level &gt;= $KC_dl.DEVELOPER)\n        alert(\"No event handlers were found.\\nException: \" + e.toSource())\n}\n}\n\nButton.prototype.do_onclick   = function(event, element){\nalert(\"You have made click.\")\n}\n</code></pre>\n\n<h3>Example</h3>\n\n<pre><code>var b = new Button(id_of_html_element, null, {\n    do_onmouseover: function(event, element) {\n        alert(\"Hello\")\n    }\n})\n</code></pre>\n</div></li></ul></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-new_effect' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Engine.Gate'>Engine.Gate</span><br/><a href='source/ll_Gate.html#Engine-Gate-method-new_effect' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Engine.Gate-method-new_effect' class='name expandable'>new_effect</a>( <span class='pre'>eff</span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Registers a new effect for the Gate. ...</div><div class='long'><p>Registers a new effect for the Gate. An effect is a ThreadAutomata used to handle\nthe gate html element (body of the gate) creating visual effects.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eff</span> : ThreadAutomata<div class='sub-desc'><p>Visual effect to handle the div of the Gate.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>ThreadAutomata created.</p>\n</div></li></ul></div></div></div><div id='method-run' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Engine.Gate'>Engine.Gate</span><br/><a href='source/ll_Gate.html#Engine-Gate-method-run' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Engine.Gate-method-run' class='name expandable'>run</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Animates all the threads that depends on this gate. ...</div><div class='long'><p>Animates all the threads that depends on this gate.\nA gate is supposed to have threads in order to generate animations -Effects.</p>\n</div></div></div></div></div></div></div>","meta":{}});