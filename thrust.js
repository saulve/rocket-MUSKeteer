
var game = new Phaser.Game(400, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('stars', 'images/starfield.jpg');
    game.load.spritesheet('ship', 'images/rockets.png', 35, 177, 8);
    game.load.image('platform', 'images/platform2.png');
    game.load.spritesheet('explosion', 'images/explode.png', 128, 128);
    game.load.bitmapFont('desyrel', 'fonts/desyrel.png', 'fonts/desyrel.xml');


}

var ship;
var starfield;
var cursors;


function create() {

    game.world.setBounds(0, 0, 600, 800);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.gravity.y = 100;
    game.physics.p2.defaultRestitution = 0.7;


    //  Create our collision groups. One for the player, one for the pandas
        var playerCollisionGroup = game.physics.p2.createCollisionGroup();
        var platformCollisionGroup = game.physics.p2.createCollisionGroup();

        game.physics.p2.updateBoundsCollisionGroup();

    starfield = game.add.tileSprite(0, 0, 400, 600, 'stars');
    starfield.fixedToCamera = true;


    platform = game.add.sprite(200,775, 'platform');
    game.physics.p2.enable(platform);
    platform.body.static = true;
    platform.body.setRectangle(250, 15, 0, 10, 0);

    platform.body.setCollisionGroup(platformCollisionGroup);
    platform.body.collides([platformCollisionGroup, playerCollisionGroup]);
    
    ship = game.add.sprite(350, 100, 'ship');
    // ship.body.setRectangle(35, 177);
    game.physics.p2.enable(ship);
    ship.animations.add('flames');
    ship.body.setCollisionGroup(playerCollisionGroup);
    //If ship collides
    ship.body.collides(platformCollisionGroup, hitShip, ship);

    game.camera.follow(ship);

    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.enabled = true;
    
  

}
  function hitShip(ship, platform) {
    
    if(ship.angle > 5 || ship.angle < -5) {
        console.log("Should explode");
        this.loadTexture('explosion', 0);
        animate = this.animations.add('bam', [0,1,2,3], 60, false);
        animate.killOnComplete = true;
        this.animations.play('bam');
        game.input.keyboard.enabled = false;
        var spc = this;
        setTimeout(function(){spc.kill();
            create();}, 2000);
    }
    else{
        var text = game.add.bitmapText(200, 400, 'desyrel', 'Congratulations!', 32);
            text.anchor.x = 0.5;
            text.anchor.y = 0.25;
    }
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
