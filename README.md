# spritesheet-canvas

  Small lib to easily create, tick and draw a spritesheet from one source image, rendering it to Canvas.
  
 * Small
 * Flexible
 * Fits nicely into a canvas game

Install with:
```bash
npm install spritesheet-canvas --saveDev
```
 
  ![alt tag](https://raw.githubusercontent.com/ErikLarsson82/SpriteSheet/master/docs/help.png)
  
  ### Example code
  ```javascript
  var SpriteSheet = require('SpriteSheet')
    
  var walk_texture = new Image();
  walk_texture.src = "./assets/images/walk_texture.png";

  var walk_spritesheet = SpriteSheet.new(walk_texture, {
    frames: [200, 200, 200], //Each frame defined by the amount of time it will be rendered before moving on
    x: 0, //Start coordinates of the sequence
    y: 0,
    width: 48, //Size of each frame. Only supports one frame size for all
    height: 48,
    restart: true, //Loops the sequence
    autoPlay: true, //Starts the 
  });

  walk_spritesheet.play(); //Help methods to toggle the state
  walk_spritesheet.pause();

  //Do this every game loop, advances the sequence by a 60th of a second by default. Will not advance if paused, so call this always and let the internal state dictate if the tick takes effect
  walk_spritesheet.tick();

  //Use your own methods for placing and rotating the canvas before drawing
  context.save()
  context.translate(50, 30);

  //Draw the current sprite in the texture
  walk_spritesheet.draw(context);

  context.restore();
```