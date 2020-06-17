var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 5 },
            debug: false
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let player;
let alien;
let enter;
let shot;
let xSpeed = 0;
let ySpeed = 0;
let alienXSpeed = 1;
let alienYSpeed = 1;
const ACCEL = 8;
let alienAccel = 4;
let accuracy = 25;

function preload ()
{
    this.load.image('background', 'assets/background.png');
    this.load.image('crosshair', 'assets/crosshair.png');
    this.load.audio('shot', 'assets/shoot.wav');
    this.load.spritesheet('alien', 'assets/alien.png', { frameWidth: 100, frameHeight: 100 });
}

function create ()
{
    this.add.image(400,300,'background');
    alien = this.physics.add.sprite(200, 150, 'alien');
    alien.setCollideWorldBounds(true);
    player = this.physics.add.sprite(400, 300, 'crosshair');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    shot = this.sound.add('shot');

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
}


function update()
{
    //Alien Movement
    if(alien.x >= 750){
        console.log("REVERSE");
        alien.x = 749;
        alienXSpeed = alienXSpeed * (-1);
        alien.setVelocityX(alienXSpeed);
    }  else {
       // console.log("Moving the alien:" + alien.x + " at speed: " + alienXSpeed);
        alien.x = alien.x + alienXSpeed;
    }


    if(alien.x <= 50){
        console.log("REVERSE");
        alien.x = 51;
        alienXSpeed = alienXSpeed * (-1);
        alien.setVelocityX(alienXSpeed);
    }  else {
       // console.log("Moving the alien:" + alien.x + " at speed: " + alienXSpeed);
        alien.x = alien.x + alienXSpeed;
    }

    if(alien.y >= 550){
        console.log("REVERSE-VERTICAL");
        alien.y = 549;
        alienYSpeed = alienYSpeed * (-1);
        alien.setVelocityY(alienYSpeed);
    } else {
        alien.y = alien.y + alienYSpeed;
    }

    if(alien.y <= 50){
        console.log("REVERSE-VERTICAL");
        alien.y = 51;
        alienYSpeed = alienYSpeed * (-1);
        alien.setVelocityY(alienYSpeed);
    } else {
        alien.y = alien.y + alienYSpeed;
    }


    //Player cursor movement
    if(cursors.left.isDown){
        xSpeed = xSpeed - ACCEL;
        player.setVelocityX(xSpeed);
        console.log(xSpeed);
    }
    if(cursors.right.isDown){
        xSpeed = xSpeed + ACCEL;
        player.setVelocityX(xSpeed);
        console.log(xSpeed);
    }
    if(cursors.up.isDown){
        ySpeed = ySpeed - ACCEL;
        player.setVelocityY(ySpeed);
        console.log(ySpeed);
    }
    if(cursors.down.isDown){
        ySpeed = ySpeed + ACCEL;
        player.setVelocityY(ySpeed);
        console.log(ySpeed);
    }
    if(enter.isDown){
       //Fire
        shot.play();
        if(Math.abs(player.x - alien.x) < accuracy && Math.abs(player.y - alien.y) < accuracy){
            //Hit
            console.log("Hit");
        } else {
            //Miss
            console.log("Miss");
        }
    }

   

}
