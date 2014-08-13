var $K_script_response = 
   {
	"_path": "/src/",
	"files": [
		{"name": "test.js", "description": ""}],
	"provides": [
		   {
			"_path": "/src/lib/",
			"files": [],
			"provides": [],
			"requires": [
				   {
					"_path": "/src/lib/builder/",
					"files": [
						{"name": "table_symbols.js", "description": "."},
						{"name": "ll_Builder.js", "description": "."}],
					"provides": [],
					"requires": [],
					"offers": [],
					"package": "builder",
					"description": ".",
				 }
],
			"offers": [],
			"package": "lib",
			"description": ".",
		 }
],
	"requires": [
		   {
			"_path": "/src/engine/",
			"files": [
				{"name": "ll_Processor.js", "description": "Manage multiple threads."},
				{"name": "ll_Thread.js", "description": "Thread functionality."},
				{"name": "ll_State.js", "description": "Each of the states of an Automaton."},
				{"name": "ll_Automata.js", "description": "Finite automaton."},
				{"name": "ll_StateGear.js", "description": ""},
				{"name": "ll_ThreadAutomata.js", "description": "Diferential automata."},
				{"name": "ll_Device.js", "description": "App thread with queue mechanism"},
				{"name": "ll_EventDispatcher.js", "description": "Event dispatcher."},
				{"name": "ll_Gate.js", "description": "HTML mapping in lluvia."},
				{"name": "ll_Lookup.js", "description": ""},
				{"name": "ll_MessageEvent.js", "description": "Message generator."},
				{"name": "effects/ll_MoveLeftEffect.js", "description": "Movement Effect"},
				{"name": "effects/ll_MoveDownEffect.js", "description": "Movement Effect"},
				{"name": "effects/ll_RectangleEffect.js", "description": "Movement Effect"}],
			"provides": [],
			"requires": [],
			"offers": [],
			"package": "engine",
			"description": "Event and execution control.",
		 }
],
	"offers": [
		   {
			"_path": "/src/mathematics/",
			"files": [
				{"name": "ll_Angle.js", "description": "Class Angle."},
				{"name": "ll_Expression.js", "description": "Mathematical expression."}],
			"provides": [
				   {
					"_path": "/src/mathematics/analysis/",
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
					"_path": "/src/mathematics/function/",
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
					"_path": "/src/mathematics/geometry/",
					"files": [
						{"name": "Vector_Static.js", "description": "Class Angle."},
						{"name": "ll_FixedVector.js", "description": "Class Angle."},
						{"name": "ll_ReferenceFrame.js", "description": "Class Angle."},
						{"name": "ll_Vector.js", "description": "Mathematical expression."}],
					"provides": [],
					"requires": [],
					"offers": [
						   {
							"_path": "/src/mathematics/geometry/shape/",
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
