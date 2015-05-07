 /**
 * @class Being
 *
 * Creates a Being
 *
 * @constructor Being
 *
 * @return {Being}
 */

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
          that.zone_changed = false
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

/**
 * @method  start
 *
 * Starts the zone in the world.
 *
 */
Being.prototype.start = function(){
    this.my_world.start_zone(this)
}


/**
 * @method run
 *
 * Updates the world zone and the distances
 *
 * @param {Array}   near All the beings near.
 *
 */
Being.prototype.run = function(near){
  this.zone_changed = false
  this.my_world.update_zone(this)
  if(!near)
     near = this.my_world.beings_near(this.zone)


     //for(var i = 0; i < 10; i++)
        //this.brain.interested_in_this(this)
       // for(var j = 0; j < 100; j++)
        //var a = 0
      //for(var i = 0; i < near.length; i++)
        // for(var j = 0;  j < near[i].length; j ++)
          //  this.brain.interested_in_this(this)
            //this.brain.interested_in_this(near[i][j])
    // this.delete_obsolete_distances(near)
    // //delete this.my_world.boid_distances[this.boid_id]
    // this.targets.splice(0,this.targets.length)
    // for(var i = 0; i < near.length; i++)
    //   for(var j = 0;  j < near[i].length; j ++){
    //       if(near[i][j] != undefined && near[i][j] instanceof Boid && near[i][j] != this)
    //         if(this.boid_id < near[i][j].boid_id){
    //              var distance = 7//near[i][j].geo_data.position.subs(this.geo_data.position).module()
    //              this.my_world.boid_distances[this.boid_id][near[i][j].boid_id] = {boid: near[i][j],
    //                distance: distance}
    //               near[i][j].my_world.boid_distances[near[i][j].boid_id][this.boid_id] = {boid: this,
    //                 distance: distance}
    //         }
    //   }
}