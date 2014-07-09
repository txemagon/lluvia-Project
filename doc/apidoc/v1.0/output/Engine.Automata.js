Ext.data.JsonP.Engine_Automata({"tagname":"class","name":"Engine.Automata","autodetected":{},"files":[{"filename":"ll_Automata.js","href":"ll_Automata.html#Engine-Automata"}],"members":[{"name":"state","tagname":"property","owner":"Engine.Automata","id":"property-state","meta":{}},{"name":"constructor","tagname":"method","owner":"Engine.Automata","id":"method-constructor","meta":{}},{"name":"drive_state","tagname":"method","owner":"Engine.Automata","id":"method-drive_state","meta":{}},{"name":"run","tagname":"method","owner":"Engine.Automata","id":"method-run","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Engine.Automata","short_doc":"Creates a state machine. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/ll_Automata.html#Engine-Automata' target='_blank'>ll_Automata.js</a></div></pre><div class='doc-contents'><p>Creates a state machine. A lluvia state machine has a continous and derivable state,\nmade of the previous, the current and the requested one. During state transition, several solicitor functions\nget executed: down function of the current state, up solicitor of the requested state and finally we arrive to the\nsteady state.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-state' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Engine.Automata'>Engine.Automata</span><br/><a href='source/ll_Automata.html#Engine-Automata-property-state' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Engine.Automata-property-state' class='name expandable'>state</a> : Enumeration<span class=\"signature\"></span></div><div class='description'><div class='short'>Group of constants representing the\n                              numbers for every possible state. ...</div><div class='long'><p>Group of constants representing the\n                              numbers for every possible state.</p>\n\n<h3>Example</h3>\n\n<pre><code>this.state = new Enumeration(\"killing\", \"running\", [\"phase1\", \"phase2\"], \"supended\")\n//=&gt; {\n//=&gt;    killing:    {0:{}},\n//=&gt;    running:    {1:{}, phase1:{1:{1:{}}}, phase2:{1:{2:{}}}},\n//=&gt;    supended:   {2:{}})\n//=&gt; }\n</code></pre>\n\n<p>Every value, dispite an object, behaves as a number.</p>\n\n<pre><code>this.state.running.phase2 == 2\n//=&gt; true\n</code></pre>\n\n<p>And keeps track of its path.</p>\n\n<pre><code>this.state.running.phase2.toString()\n//=&gt; \"1.2\"\n</code></pre>\n\n<p>Entrusted with the gifts of Enumeration we cand do:</p>\n\n<pre><code>this.state.keys()\n//=&gt; [\"killing\", \"running\", \"supended\"]\n</code></pre>\n\n<p>and</p>\n\n<pre><code>this.state.running.branches()\n//=&gt; [\"phase1\", \"phase2\"]\n</code></pre>\n\n<p>And because of the special VersionNumber method toString and the mathematical ring\ncomposed by VersionNumber, InterleavedArray and Enumerate we can state:</p>\n\n<pre><code>// InterleavedArray mate.\nvar i = new InterleavedArray(\"a\", \"b\", [\"b1\", \"b2\"], \"c\")\ni[this.state.running.phase1]\n//=&gt; \"b1\"\n</code></pre>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Engine.Automata'>Engine.Automata</span><br/><a href='source/ll_Automata.html#Engine-Automata-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Engine.Automata-method-constructor' class='name expandable'>Engine.Automata</a>( <span class='pre'>states, initialState, solicitor</span> ) : Automata<span class=\"signature\"></span></div><div class='description'><div class='short'>Example\n\nvar state = new Enumeration(\"initial\", \"running\", \"sleeping\")\nvar a = new Automata( states,\n                ...</div><div class='long'><h2>Example</h2>\n\n<pre><code>var state = new Enumeration(\"initial\", \"running\", \"sleeping\")\nvar a = new Automata( states,\n                     {previous:  state.initial,\n                      current:   state.initial,\n                      requested: state.running })\n</code></pre>\n\n<p>or, for nested states:</p>\n\n<pre><code>var a = new Automata([\"killing\", [\"running\", [\"phase1\", \"phase2\"], \"supended\" ]])\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>states</span> : Object | Array<div class='sub-desc'><p>Possibles states of an automata (Enumeration).\n                                  Array is an extesnsion for Hierarchical State Machines.</p>\n</div></li><li><span class='pre'>initialState</span> : Object<div class='sub-desc'><p>Initial state of the automata.</p>\n</div></li><li><span class='pre'>solicitor</span> : Array<div class='sub-desc'><p>State Manager functions. An array with three functions (up, steady, down).</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Automata</span><div class='sub-desc'><p>New created state machine automata..</p>\n</div></li></ul></div></div></div><div id='method-drive_state' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Engine.Automata'>Engine.Automata</span><br/><a href='source/ll_Automata.html#Engine-Automata-method-drive_state' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Engine.Automata-method-drive_state' class='name expandable'>drive_state</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Executes the solicitor functions related to the fsm state. ...</div><div class='long'><p>Executes the solicitor functions related to the fsm state.\nAll arguments are passed to solicitors.</p>\n</div></div></div><div id='method-run' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Engine.Automata'>Engine.Automata</span><br/><a href='source/ll_Automata.html#Engine-Automata-method-run' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Engine.Automata-method-run' class='name expandable'>run</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Behavior of the automata according to its internal state. ...</div><div class='long'><p>Behavior of the automata according to its internal state.\nThis function takes care of state transitions.</p>\n</div></div></div></div></div></div></div>","meta":{}});