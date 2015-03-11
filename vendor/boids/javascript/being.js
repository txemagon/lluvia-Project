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
return;
}
