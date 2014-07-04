var $K_script_response = 
   {
	"files": [],
	"provides": [
		   {
			"files": [
				{"name": "ll_Events.js", "description": "Core javascript for the global object."},
				{"name": "ll_Geometry.js", "description": "Exceptions."},
				{"name": "ll_Physics.js", "description": "Redefinition of Module class."}],
			"provides": [],
			"requires": [],
			"offers": [],
			"package": "utils",
			"description": "Javascript extensions && global objects.",
		 }
,
		   {
			"files": [
				{"name": "ll_BrowserFeatures.js", "description": "Facilities to ensure browser compatibility."},
				{"name": "ll_CodeBlockFinder.js", "description": "Finite Automaton for finding code blocks."},
				{"name": "ll_HTMLElement.js", "description": "DOM utilities."},
				{"name": "ll_JavascriptSource.js", "description": "Reads Javascript Files via AJAX and rips code blocks."},
				{"name": "ll_Logger.js", "description": "Creates logger depending of the severity level."}],
			"provides": [],
			"requires": [],
			"offers": [],
			"package": "browser",
			"description": "Facilities to ensure browser compatibility.",
		 }
,
		   {
			"files": [
				{"name": "ll_Kernel.js", "description": "Core javascript for the global object."},
				{"name": "ll_Exception.js", "description": "Exceptions."}],
			"provides": [
				   {
					"files": [
						{"name": "ll_Object.js", "description": "Redefinition of Object class."},
						{"name": "ll_Number.js", "description": "Something for Numbers."},
						{"name": "ll_Function.js", "description": "Adds functionality to objects (classes, functions, etc)."},
						{"name": "ll_String.js", "description": "String addons."},
						{"name": "ll_Array.js", "description": "Adds functionality to arrays."}],
					"provides": [],
					"requires": [],
					"offers": [],
					"package": "Core Extensions",
					"description": "Javascript extensions to native objects.",
				 }
,
				   {
					"files": [],
					"provides": [
						   {
							"files": [
								{"name": "ll_ClassFactory.js", "description": "Utility for automating class creation."},
								{"name": "ll_ClassTemplate.js", "description": "Utility for creating a constructor giving a default object."}],
							"provides": [],
							"requires": [],
							"offers": [],
							"package": "class",
							"description": "lluvia facilites for creating classes.",
						 }
],
					"requires": [],
					"offers": [],
					"package": "facilities",
					"description": "Javascript new classes and helpers.",
				 }
,
				   {
					"files": [],
					"provides": [
						   {
							"files": [
								{"name": "ll_Module.js", "description": "Base class of all Class."},
								{"name": "ll_Class.js", "description": "Base class of all classes"},
								{"name": "ll_Delegate.js", "description": "Creates a fake class that delegates all non existing method calls to another one"},
								{"name": "ll_ProxyConstructor.js", "description": "Delegated anonymous class intended to be used as a constructor used via Function#call"},
								{"name": "ll_ApplyProxyConstructor.js", "description": "Delegated anonymous class intended to be used as a constructor used via Function#apply"}],
							"provides": [],
							"requires": [],
							"offers": [],
							"package": "architecture",
							"description": "Classes related to hierarchical language organization.",
						 }
,
						   {
							"files": [
								{"name": "ll_Set.js", "description": "Array with not repeated elements."},
								{"name": "ll_Hash.js", "description": "Hash, Dictionary, Map"},
								{"name": "ll_AutoHash.js", "description": "Executes a Constructor block when key is undefined"},
								{"name": "ll_Constant.js", "description": "String-Number equivalence."},
								{"name": "ll_Enumeration.js", "description": "Object with keys associated to consecutive numbers."},
								{"name": "ll_Map.js", "description": "True Map where objects can be keys."},
								{"name": "ll_InterleavedArray.js", "description": "Array with special indices. ie '1.2.1' "}],
							"provides": [],
							"requires": [],
							"offers": [],
							"package": "enumerable",
							"description": "Foundation classes",
						 }
],
					"requires": [],
					"offers": [],
					"package": "foundation",
					"description": "Foundation classes",
				 }
],
			"requires": [],
			"offers": [],
			"package": "kernel",
			"description": "Javascript extensions && global objects.",
		 }
],
	"requires": [
		   {
			"files": [
				{"name": "log_module_interface.js", "description": ""},
				{"name": "log_module_load.js", "description": ""}],
			"provides": [],
			"requires": [
				   {
					"files": [
						{"name": "package.js", "description": ""},
						{"name": "package_manager.js", "description": ""}],
					"provides": [],
					"requires": [],
					"offers": [],
					"package": "package_manager",
					"description": ".",
				 }
],
			"offers": [],
			"package": "loader",
			"description": "Mechanism to request remote files from the server.",
		 }
],
	"offers": [
		   {
			"files": [
				{"name": "ll_Processor.js", "description": "Manage multiple threads."},
				{"name": "ll_Thread.js", "description": "Thread functionality."},
				{"name": "ll_Automata.js", "description": "Finite automaton."},
				{"name": "ll_ThreadAutomata.js", "description": "Diferential automata."},
				{"name": "ll_Device.js", "description": "App thread with queue mechanism"},
				{"name": "ll_EventDispatcher.js", "description": "Event dispatcher."},
				{"name": "ll_Gate.js", "description": "HTML mapping in lluvia."},
				{"name": "ll_Lookup.js", "description": ""},
				{"name": "ll_MessageEvent.js", "description": "Message generator."}],
			"provides": [],
			"requires": [],
			"offers": [],
			"package": "engine",
			"description": "Event and execution control.",
		 }
,
		   {
			"files": [
				{"name": "ll_Angle.js", "description": "Class Angle."},
				{"name": "ll_Expression.js", "description": "Mathematical expression."}],
			"provides": [
				   {
					"files": [
						{"name": "ll_Complex_Instance.js", "description": "Objext of class Complex."},
						{"name": "ll_Complex_Static.js", "description": "Class Complex."}],
					"provides": [],
					"requires": [],
					"offers": [],
					"package": "analysis",
					"description": "Number types",
				 }
,
				   {
					"files": [
						{"name": "ll_func.js", "description": "Mathematical functions."},
						{"name": "ll_Trail.js", "description": "Function discretization."}],
					"provides": [],
					"requires": [],
					"offers": [],
					"package": "function",
					"description": "Mathematical functions utilities.",
				 }
,
				   {
					"files": [
						{"name": "Vector_Static.js", "description": "Class Angle."},
						{"name": "ll_FixedVector.js", "description": "Class Angle."},
						{"name": "ll_ReferenceFrame.js", "description": "Class Angle."},
						{"name": "ll_Vector.js", "description": "Mathematical expression."}],
					"provides": [],
					"requires": [],
					"offers": [
						   {
							"files": [
								{"name": "ll_Line.js", "description": "."},
								{"name": "ll_Path.js", "description": "."},
								{"name": "ll_StraightLine.js", "description": "."}],
							"provides": [],
							"requires": [],
							"offers": [],
							"package": "shape",
							"description": ".",
						 }
],
					"package": "geometry",
					"description": ".",
				 }
],
			"requires": [],
			"offers": [],
			"package": "mathematics",
			"description": "Mathematics library.",
		 }
],
	"package": "lluvia",
	"description": "lluvia loader. User application loader. Booter.",
 }
