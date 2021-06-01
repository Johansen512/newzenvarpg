class BootScene extends Phaser.Scene {

    constructor (){
        super ('Boot')

    }

    preload() {
        //Load images
        this.loadImages ();

        //Load spritesheets
        this.loadSpritesheets ();

        // load the audio asset
         this.loadAudio ();

    }

    loadImages (){
    //Load images
    this.load.image ('button1', 'assets/images/ui/blue_button01.png');
    this.load.image ('button2', 'assets/images/ui/blue_button02.png');

    }

    loadSpritesheets(){
               //Load spritesheets
               this.load.spritesheet ('items', 'assets/images/items.png', { frameWidth:32, frameHeight: 32 });
               this.load.spritesheet ('characters', 'assets/images/characters.png', { frameWidth:32, frameHeight: 32 });

    }

    loadAudio(){
         // load the audio asset

         this.load.audio ('goldSound', ['assets/audio/Pickup.wav']);

    }

   create() {
       // transition to Title Scene 
this.scene.start ('Title');

   }

}