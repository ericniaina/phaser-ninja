
  var game = new Phaser.Game(800, 700, Phaser.AUTO, '', {preload: preload, create: create, update: update});

  var player;

  function preload() {
      game.load.atlasJSONHash('player', 'sprites/Ninja.png', 'sprites/Ninja.json');
  }

  function create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.gravity.y = 950;
      player = new Player(game, 0, 0);

      game.physics.enable(player, Phaser.Physics.ARCADE);
      player.body.bounce.y = 0.2;
      player.body.collideWorldBounds = true;
      player.body.setSize(363, 458);
  }

  function update() {
  }
