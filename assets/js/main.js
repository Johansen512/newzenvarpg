var config = {

    type:Phaser.Auto,
    width: 800,
    height: 600,
    scene: {
       
        preload: preload,
        create: create,
        update: update,
        
    }, 
    physics: {
        default: 'arcade',
        arcade:{
            debug:true,
            gravity: {
                y:0
            },
        },

    }

};

var game = new Phaser.Game (config)

function preload () {
this.load.image ('button1', 'assets/images/ui/blue_button01.png');
this.load.spritesheet ('items', 'assets/images/items.png', { frameWidth:32, frameHeight: 32 });
this.load.spritesheet ('characters', 'assets/images/characters.png', { frameWidth:32, frameHeight: 32 });
}

function create () {

    //create an image
    var button = this.add.image(100, 100, 'button1')
    button.setOrigin(0.5,0.5);
  
    // create a sprite
    this.add.sprite(300,100, 'button1'); 

    this.add.image(300, 300, 'items', 3);

    this.physics.add.image (500, 100, 'button1');

     // create character game object

    this.player = this.physics.add.image (32, 32, 'characters', 0);
    this.player.setScale(2);

    // create bindings to the arrow keys

    this.cursors = this.input.keyboard.createCursorKeys();
}

function update () {

    // implement function for detecting key press and updating movement

    this.player.setVelocity (0);

    // update the velocity on the player's physics body

    if (this.cursors.left.isDown) {

        this.player.setVelocityX(-160)

    } else if (this.cursors.right.isDown){

        this.player.setVelocityX(160)

    } 


    if (this.cursors.up.isDown) {

        this.player.setVelocityY(-160)

    } else if (this.cursors.down.isDown){

        this.player.setVelocityY(160)

    } 

}