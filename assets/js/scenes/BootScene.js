class BootScene extends Phaser.Scene {

    constructor (){
        super ('Boot')

    }

    preload() {

        this.load.image ('button1', 'assets/images/ui/blue_button01.png');
this.load.spritesheet ('items', 'assets/images/items.png', { frameWidth:32, frameHeight: 32 });
this.load.spritesheet ('characters', 'assets/images/characters.png', { frameWidth:32, frameHeight: 32 });

 // load the audio asset

this.load.audio ('goldSound', ['assets/audio/Pickup.wav']);

    }

    create(){

           // create sound game object
    var goldPickupAudio = this.sound.add ('goldSound', {loop:false, volume: 0.4});
   

    //create an image
    var button = this.add.image(100, 100, 'button1');
    button.setOrigin(0.5,0.5);
  
    // create a sprite
    this.add.sprite(300,100, 'button1'); 

   this.chest = this.physics.add.image(300, 300, 'items', 0);

    // make the button immovable

    this.wall = this.physics.add.image (500, 100, 'button1');
    this.wall.setImmovable ();

     // create character game object

    this.player = this.physics.add.image (32, 32, 'characters', 0);
    this.player.setScale(2);

    // prevent the player from leaving the game area

    this.player.body.setCollideWorldBounds(true);

    // add a collider between player and buttons
    this.physics.add.collider (this.player, this.wall)

    // check for overlap between player and other physics objects
    // play audio and destroy chest
    this.physics.add.overlap (this.player, this.chest, function(player, chest){ goldPickupAudio.play (); chest.destroy();})

    // create bindings to the arrow keys

    this.cursors = this.input.keyboard.createCursorKeys();

    }

    update () {

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

}