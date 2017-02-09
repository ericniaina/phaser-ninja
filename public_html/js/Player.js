/* 
 * Rakotonirina Eric Niaina
 * ericniaina@msn.com
 * Player Class to handle animation and user input
 */


//
// Player
//

Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');

    this.scale.setTo(0.5, 0.5);

    // handle mirror flip
    this.anchor.setTo(.5, .5);

    //
    // Animations
    //

    this.animations.add('walking', Phaser.Animation.generateFrameNames('Run__', 0, 9, '', 3), 15, true, false);
    this.animations.add('idle', Phaser.Animation.generateFrameNames('Idle__', 0, 9, '', 3), 15, true, false);
    this.animations.add('jumping', Phaser.Animation.generateFrameNames('Jump__', 0, 9, '', 3), 15, false, false);
    this.animations.add('falling', Phaser.Animation.generateFrameNames('Jump__', 0, 9, '', 3), 15, false, false);
    this.animations.add('gliding', Phaser.Animation.generateFrameNames('Glide_', 0, 9, '', 3), 15, false, false);

    //
    // State Machine
    //

    this.sm = new StateMachine(this, {debug: false});
    var self = this;

    this.sm.state('idle', {
        enter: function () { },
        update: function () {
            goIdle();
        },
        exit: function () { }
    });

    this.sm.state('walking', {
        enter: function () { },
        update: function () {
            if (self.leftKey.isDown)
            {
                moveLeft();
            } else if (self.rightKey.isDown)
            {
                moveRight();
            }
        },
        exit: function () { }
    });

    this.sm.state('jumping', {
        enter: function () {
            goJump();
        },
        update: function () { },
        exit: function () { }
    });

    this.sm.state('falling', {
        enter: function () { },
        update: function () { },
        exit: function () { }
    });

    this.sm.state('gliding', {
        enter: function () { 
            self.body.velocity.y -= 450;
        },
        update: function () { },
        exit: function () { }
    });

    //  Register the keys.
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //
    // state machine transitions
    //

    // walking
    this.sm.transition('walk', 'idle', 'walking', function () {
        return (self.leftKey.isDown || self.rightKey.isDown);
    });

    this.sm.transition('walk_idle', 'walking', 'idle', function () {
        return (!self.leftKey.isDown && !self.rightKey.isDown);
    });

    this.sm.transition('jump_idle', 'idle', 'jumping', function () {
        return (self.spaceKey.isDown);
    });

    this.sm.transition('jump_walking', 'walking', 'jumping', function () {
        return (self.spaceKey.isDown);
    });

    this.sm.transition('fall', 'jumping', 'falling', function () {
        return (game.time.now > jumpTimer);
    });

    this.sm.transition('glide', 'falling', 'gliding', function () {
        return (self.spaceKey.isDown);
    });

    this.sm.transition('glide_fall', 'gliding', 'falling', function () {
        return (!self.spaceKey.isDown);
    });

    this.sm.transition('glide_stand', 'gliding', 'idle', function () {
        return (self.body.onFloor());
    });

    this.sm.transition('stand', 'falling', 'idle', function () {
        return (self.body.onFloor());
    });

    this.animations.play(this.sm.initialState);

    // Call Back
    var jumpTimer = 0;
    var jumpDuration = 750;

    var max_speed = 250;
    var acceleration = 10;

    var moveRight = function () {
        self.scale.x = Math.abs(self.scale.x);
        self.body.velocity.x += acceleration;

        if (self.body.velocity.x > max_speed) {
            self.body.velocity.x = max_speed;
        }
    };

    var moveLeft = function () {
        self.scale.x = Math.abs(self.scale.x) * -1;
        self.body.velocity.x -= acceleration;

        if (self.body.velocity.x < -max_speed) {
            self.body.velocity.x = -max_speed;
        }
    };

    var goIdle = function () {
        if (self.body.velocity.x < 0) {
            self.body.velocity.x += acceleration;
            if (self.body.velocity.x >= 0) {
                self.body.velocity.x = 0;
            }
        } else if (self.body.velocity.x > 0) {
            self.body.velocity.x -= acceleration;
            if (self.body.velocity.x <= 0) {
                self.body.velocity.x = 0;
            }
        }

    }

    var goJump = function () {
        self.body.velocity.y = -550;
        jumpTimer = game.time.now + jumpDuration;
    }

    game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {
    this.sm.update();
}