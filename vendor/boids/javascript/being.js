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
          that.being_id = Being.id ++
          that.zone = {x:0, y:0} //Zone
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

Being.id = 0

Being.prototype.run = function(){
   this.update_zone()
}

Being.prototype.start_zone = function(){
  this.zone.x = parseInt(this.geo_data.position.get_coord(0)/this.my_world.visibility)
  this.zone.y = parseInt(this.geo_data.position.get_coord(1)/this.my_world.visibility)
  this.my_world.map_zone[this.zone.y][this.zone.x].push(this)
}

Being.prototype.update_zone = function(){
  var last_zone = {x: this.zone.x, y:this.zone.y}
  this.zone.x = parseInt(this.geo_data.position.get_coord(0)/this.my_world.visibility)
  this.zone.y = parseInt(this.geo_data.position.get_coord(1)/this.my_world.visibility)
  if(this.zone.x != last_zone.x || this.zone.y != last_zone.y){
    delete this.my_world.map_zone[last_zone.y][last_zone.x][this.being_id]
    this.my_world.map_zone[this.zone.y][this.zone.x][this.being_id] = this
  }
}