
var game = new Phaser.Game(400, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('stars', 'images/starfield.jpg');
    game.load.spritesheet('ship', 'images/rockets.png', 35, 177, 8);
    game.load.image('platform', 'images/platform2.png');


}

var ship;
var starfield;
var cursors;


function create() {

    game.world.setBounds(0, 0, 600, 800);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.defaultRestitution = 0.8;

    starfield = game.add.tileSprite(0, 0, 400, 600, 'stars');
    starfield.fixedToCamera = true;

    ship = game.add.sprite(200, 0, 'ship');
    ship.animations.add('flames');

    platform = game.add.sprite(0, 800 - 56, 'platform');

    

    game.physics.p2.enable(ship);

    game.camera.follow(ship);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (cursors.left.isDown)
    {
        ship.body.rotateLeft(100);
    }
    else if (cursors.right.isDown)
    {
        ship.body.rotateRight(100);
    }
    else
    {
        ship.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
        ship.body.thrust(400);
        ship.animations.play('flames', 5, true, true);

    }
    else if (cursors.down.isDown)
    {
        ship.body.reverse(400);
        ship.animations.stop('flames', true);
    }
    else
    {
        ship.animations.stop('flames', true);
    }

    if (!game.camera.atLimit.x)
    {
        starfield.tilePosition.x -= (ship.body.velocity.x * game.time.physicsElapsed);
    }

    if (!game.camera.atLimit.y)
    {
        starfield.tilePosition.y -= (ship.body.velocity.y * game.time.physicsElapsed);
    }

}
