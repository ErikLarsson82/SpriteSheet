(function() {
  var SpriteSheet = {};

  SpriteSheet.new = function(url, frameData) {
    var spriteSheet = {};

    spriteSheet.url = url;
    spriteSheet.frameData = frameData;
    spriteSheet.totalAnimationTime = 0;
    spriteSheet.currentTick = 0;
    spriteSheet.currentFrame = 0;
    spriteSheet.playing = false || frameData.autoPlay;
    spriteSheet.restart = false || frameData.restart;
    spriteSheet.callback = frameData.callback || function() {};

    for (var i = 0; i < spriteSheet.frameData.frames.length; i++) {
      spriteSheet.totalAnimationTime = spriteSheet.totalAnimationTime + spriteSheet.frameData.frames[i];
    }

    spriteSheet.play = function() {
      spriteSheet.playing = true;
    };

    spriteSheet.stop = function() {
      spriteSheet.playing = false;
      spriteSheet.currentTick = 0;
      spriteSheet.currentFrame = 0;
    };

    spriteSheet.pause = function() {
      spriteSheet.playing = false;
    };

    spriteSheet.tick = function(delta) {
      delta = delta || 1000/60;
      if (spriteSheet.playing) {
        spriteSheet.currentTick = spriteSheet.currentTick + delta;
        if (spriteSheet.currentTick > spriteSheet.frameData.frames[spriteSheet.currentFrame]) {

          spriteSheet.currentTick = spriteSheet.currentTick - spriteSheet.frameData.frames[spriteSheet.currentFrame];

          spriteSheet.currentFrame = spriteSheet.currentFrame + 1;

          if (spriteSheet.currentFrame >= spriteSheet.frameData.frames.length ) {
            spriteSheet.callback();
            if ( spriteSheet.frameData.restart ) {
              spriteSheet.currentFrame = 0;
              spriteSheet.currentTick = 0;
            } else {
              spriteSheet.pause();
              spriteSheet.currentFrame = spriteSheet.frameData.frames.length-1;
            }
          }
        }
      }

    };

    spriteSheet.draw = function(context) {
      context.drawImage(spriteSheet.url, spriteSheet.currentFrame * frameData.width, 0, frameData.width, frameData.height, frameData.x, frameData.y, frameData.width, frameData.height);
    };

    return spriteSheet;
  };

  if (typeof define !== 'undefined') {
    define('SpriteSheet', [], function() {
      return SpriteSheet;
    });
  } else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = SpriteSheet;
    }
    exports.SpriteSheet = SpriteSheet;
  } else {
    this.SpriteSheet = SpriteSheet;
  }

}.call(this));