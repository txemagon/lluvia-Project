MenuAutomata.prototype = new ThreadAutomata
MenuAutomata.prototype.constructor = MenuAutomata

function MenuAutomata(processor, gate) {
	var that = this
	this.now = new Date()
	this.before = new Date()
	this.menu_height=50
	var state = this.state = new Enumeration("out", "getting_out", "getting_in", "inside")

	this.currentState = { previous: state.inside,
                          current: state.inside,
                          requested: state.inside }

    this.solicitors = [	
    /* out */	
        [
			function(){
			;
			},
			function(){
			;
			},
			function(){
			;
			}
	    ],
	/* getting_out */ [
			function(){
			;
			},
			function (){
				
				if( this.menu_height >= 50 && this.menu_height<=205)
					this.menu_height+=5
				this.gate.panel.style.height = "" + this.menu_height +"px"

			},
			function(){
			;
			}
	],
	/* getting_in */[
			function(){
			;
			},
			function(){
				if( this.menu_height >=55 )
					this.menu_height-=5
				this.gate.panel.style.height = "" + this.menu_height +"px"
			},
			function(){
			;
			}
	],
	/* inside */ [
			function(){
			;
			},
			function(){
			;
			},
			function(){
			;
			}
	]
]

    function initialize(){
     that.gate = gate
		try{
		    if(that.state){
		        ThreadAutomata.call(that, that.state, that.currentState, that.solicitors, processor)
		}
		}catch(e){
		    alert("No event handlers were found.\nException: " + e.toSource())
		}
		    }

    if (arguments.length)
        initialize()

} 