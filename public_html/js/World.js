Ground = function (game, x, y, width, height) {
    Phaser.Sprite.call(this, game, x, y, width, height, 'ground');
    game.physics.arcade.enable(this);
    this.body.allowGravity = false;
};
Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

World = function (game) {
  this.group = game.add.group();
  var ground;
  this.initiate = function() {
    ground = new Ground(game,0 ,0 ,2400, 238);
  };
};
