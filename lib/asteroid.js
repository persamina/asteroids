var MovingObject = require('./movingObject.js');
var Util = require('./util.js');

function Asteroid(pos, game, asteroidImg) {
  this.asteroidImg = asteroidImg;
  MovingObject.call(this, {game: game, pos: pos, vel: Util.randVec(), radius: Asteroid.RADIUS, color: Asteroid.COLOR});

};
Asteroid.RADIUS = 50;
Asteroid.COLOR = "#00C685";
Util.inherits(Asteroid, MovingObject);
Asteroid.prototype.collideWith = function(otherObject)
{
  if (otherObject instanceof Ship)
  {
    otherObject.relocate();
  }
  if (otherObject instanceof Bullet)
  {
    this.game.remove(this);
    this.game.remove(otherObject);
  //Game.NUM_ASTEROIDS -= 2;
  }
};
Asteroid.prototype.draw = function(ctx) {
  //ctx.beginPath();
  ctx.drawImage(this.asteroidImg, this.pos[0], this.pos[1], this.radius, this.radius);
  //ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, false);
  //ctx.fillStyle = this.color;
  //ctx.fill();
};
module.exports = Asteroid;
