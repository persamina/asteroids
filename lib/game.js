function Game(backgroundImg, asteroidImg, shipImg) {
  this.asteroids = new Array(Game.NUM_ASTEROIDS);

  this.bullets = [];
  this.backgroundImg = backgroundImg;
  this.asteroidImg = asteroidImg;
  this.shipImg = shipImg;
  this.ship = new Ship(this.randomPosition(), this, this.shipImg);
  this.addAsteroids();
  this.score = 0;
  this.highScore = 0;
};
Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;
Game.prototype.add = function(obj)
{
  if (obj instanceof Bullet)
  {
    this.bullets.push(obj);
  }
  if (obj instanceof Asteroid)
  {
    this.asteroids.push(obj);
  }
};
Game.prototype.allObjects = function()
{
  var allObj = this.asteroids.concat(this.bullets);
  allObj.push(this.ship);
  return allObj;
};

Game.prototype.addAsteroids = function()
{
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++)
  {
    this.asteroids[i] = new Asteroid(this.randomPosition(), this, this.asteroidImg);
  }
};
Game.prototype.draw = function(ctx)
{
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.drawImage(this.backgroundImg, 0, 0);
  var allObj = this.allObjects();
  for (var i = 0; i < allObj.length; i++)
  {
    if(!allObj[i].isWrappable && this.isOutOfBounds(allObj[i].pos))
    {
      this.remove(allObj[i]);
    }
    else
    {
      allObj[i].draw(ctx);
    }

  }
};
Game.prototype.randomPosition = function()
{
  var pos = new Array(2);
  pos[0] = Math.round(Math.random() * Game.DIM_X);
  pos[1] = Math.round(Math.random() * Game.DIM_Y);
  return pos;
};
Game.prototype.step = function()
{
  this.moveObjects();
  this.checkCollisions();
}
Game.prototype.moveObjects = function()
{
  var allObj = this.allObjects();
  for (var i = 0; i < allObj.length; i++)
  {
    allObj[i].move();
  }
};
Game.prototype.wrap = function(pos)
{
  if (pos[0] > Game.DIM_X)
  {
    pos[0] = 0;
  }
  if (pos[1] > Game.DIM_Y)
  {
    pos[1] = 0;
  }
  if (pos[0] < 0)
  {
    pos[0] = Game.DIM_X;
  }
  if (pos[1] < 0)
  {
    pos[1] = Game.DIM_Y;
  }
};
Game.prototype.checkCollisions = function() {
  var allObj = this.allObjects();
  for (var i = 0; i < allObj.length; i++)
  {
    for (var j=i+1; j<allObj.length; j++)
    {
      if (allObj[i].isCollidedWith(allObj[j]))
      {
        allObj[i].collideWith(allObj[j]);
      }
    }
  }
};
Game.prototype.remove = function(obj)
{
  var arrToSearch;
  if (obj instanceof Bullet)
  {
    arrToSearch = this.bullets;
  }
  if (obj instanceof Asteroid)
  {
    this.score += 10;
    if (this.highScore < this.score) {this.highScore = this.score;}
    arrToSearch = this.asteroids;
  }
  var index = arrToSearch.indexOf(obj)
  arrToSearch.splice(index, 1);
};
Game.prototype.isOutOfBounds = function(pos)
{
  if (pos[0] >= Game.DIM_X || pos[1] >= Game.DIM_Y)
  {
    return true;
  }
  return false;
}
module.exports = Game;
