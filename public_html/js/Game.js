
  var game = new Phaser.Game(800, 700, Phaser.AUTO, '', {preload: preload, create: create, update: update});

  var player;
  var ground;
  var bg_8;
  var bg_7;
  var bg_6;
  var bg_5;
  var bg_4;
  var bg_3;
  var bg_2;


  function preload() {
      game.load.atlasJSONHash('player', 'sprites/Ninja.png', 'sprites/Ninja.json');
      game.load.image('ground', 'sprites/bg/layer_01.png');
      for (var i= 2; i <= 8; i++) {
          game.load.image('bg_' + i , 'sprites/bg/layer_0' + i + '.png');
      }
  }

  function create() {

      // World Boundary
      game.world.setBounds(0, 0, 2400, 700);

      // Background
      bg_8 = this.game.add.tileSprite(0,
        -238,
        2400,
        938,
        'bg_8'
      );
      bg_7 = this.game.add.tileSprite(0,
        -238,
        2400,
        938,
        'bg_7'
      );
      bg_6 = this.game.add.tileSprite(0,
        -238,
        2400,
        938,
        'bg_6'
      );
      bg_5 = this.game.add.tileSprite(0,
        -238,
        2400,
        938,
        'bg_5'
      );
      bg_4 = this.game.add.tileSprite(0,
        -238,
        2400,
        938,
        'bg_4'
      );
      bg_3 = this.game.add.tileSprite(0,
        -238,
        2400,
        938,
        'bg_3'
      );
      bg_2 = this.game.add.tileSprite(0,
        -238,
        2400,
        938,
        'bg_2'
      );

      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.gravity.y = 950;
      player = new Player(game, 0, 0);

      game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);

      // Ground
      ground = game.add.tileSprite(0, 600, 2400, 100, 'ground');
      game.physics.enable(ground, Phaser.Physics.ARCADE);
      ground.body.collideWorldBounds = true;
      ground.body.allowGravity = false;
      ground.body.immovable = true;
  }

  function update() {
    game.physics.arcade.collide(player, ground);
    bg_8.tilePosition.x = 0.95 * game.camera.x;
    bg_7.tilePosition.x = 0.85 * game.camera.x;
    bg_6.tilePosition.x = 0.65 * game.camera.x;
    bg_5.tilePosition.x = 0.45 * game.camera.x;
    bg_4.tilePosition.x = 0.35 * game.camera.x;
    bg_3.tilePosition.x = 0.25 * game.camera.x;
    bg_2.tilePosition.x = 0.15 * game.camera.x;
  }
