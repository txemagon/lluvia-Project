Being.prototype.constructor = Being

function Being(config_object, block){

    var that = this
    var args = arguments


    //if (typeof(block) === "undefined")
      //  if (typeof(config_object) === "function" ){
        //    block = config_object
         //   config_object = new Hash()
        //}
       function initialize(){
          var config = new Hash()

          that.my_world = null
          that.area = {x:0, y:0}
          /* Overridable configuration */

          var default_config = {
              geo_data: {
                  position: new Vector(Math.floor(Math.random()*1000), Math.floor(Math.random()*400)),
              },
              //gt: {colour: "blue"},
              colour: "blue",

              mass: 2

              // force_limits: {
              //     thrust: 20,
              //     steering: 50,
              //     braking: 70
              // }
          }

          //config_object.soft_merge$B(default_config)
          //if ( typeof(block) === "function")
          //    config = block(config_object) || new Hash()
          that.merge$B(default_config)
          //if (that.color)
            //  that.colour = that.color
       }

       //if (arguments.length)
             initialize()
}

Being.prototype.run = function(){
   this.update_area()
}

Being.prototype.update_area = function(){
  var last_area = {x: this.area.x, y:this.area.y}
  this.area.x = parseInt(this.geo_data.position.get_coord(0)/this.my_world.visibility)
  this.area.y = parseInt(this.geo_data.position.get_coord(1)/this.my_world.visibility)
  if(this.area.x != last_area.x || this.area.y != last_area.y){
    var index = this.my_world.map_area[last_area.y][last_area.x].indexOf(this)
    this.my_world.map_area[last_area.y][last_area.x].splice(index, index+1)
    this.my_world.map_area[this.area.y][this.area.x].push(this)
  }
}