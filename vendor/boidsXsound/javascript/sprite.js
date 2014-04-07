/**
 * @classDescription Sprite handler.
 *
 * @param  {screen} World screen
 * @return {World}
 * @constructor
*/

function Sprite(ctx, image_source, width, height) {
   var that = this
   this.ctx = ctx
   this.sprite = null 
   this.width = width
   this.height = height
   this.im = new Image()
   this.bckg = null
   this.position = { 
      now:    { x:0, y:0 },
      before: { x:0, y:0 }
   }
   this.loaded = false
   this.im.onload = function(){ that.loaded = true; }
   this.im.src = image_source

  function initialize(){
     var ld = that.loaded
     Sprite.yield(that)
     that.bckg = that.ctx.getImageData(that.position.now.x, that.position.now.y, that.width + 1, that.height)
     that.bckg = that.bckg || null
     while(ld) ld = !that.loaded;    
     that.ctx.drawImage(that.im, that.position.now.x, that.position.now.y)
     that.sprite = that.ctx.getImageData(that.position.now.x, that.position.now.y, that.width + 1, that.height)
  }


  if (arguments && arguments.length)
     try{
     initialize()
    } catch (err){;}
}

/*
 * var a = new Sprite(canvas_ctx, "/img.jpg",
 *   function(new_sprite){
 *   el.position.now.x = 3
 * })
 **/

/*
 * var a = new Sprite(canvas_ctx, "/img.jpg",
 *   function(new_sprite){
 *   el.position = { now: {x:5, y:7}, before: {x=5, y:7} }
 * })
 **/


Sprite.prototype.next_turn_in = function(x, y){
   this.position.before.x = this.position.now.x
   this.position.before.y = this.position.now.y
   this.position.now.x = x
   this.position.now.y = y

}

Sprite.prototype.draw = function(x, y){
     
   this.next_turn_in(x, y) 
   //this.ctx.putImageData(this.bckg, this.position.before.x, this.position.before.y)
   //this.bckg = this.ctx.getImageData(this.position.now.x, this.position.now.y, this.width, this.height)
   this.ctx.putImageData(this.sprite, this.position.now.x, this.position.now.y)
}
