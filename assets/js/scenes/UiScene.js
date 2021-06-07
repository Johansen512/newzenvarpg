class UiScene extends Phaser.Scene {

    constructor (){
        super ('Ui')

    }

    init () {
        // Grab a reference to the Game scene

        this.gameScene = this.scene.get ('Game');


    }
  

    create(){

        this.setupUiElement ();
        this.setupEvents ();
        
    }

    setupUiElement () {
        //Create the Score text Game object

        this.scoreText = this.add.text (35, 8, 'Coins:0', { fontSize:'16px', fill:'#fff'});

        //Create coin icon 

        this.coinIcon = this.add.image (15,15, 'items', 3);

    }

    setupEvents(){
        //Listen for the updateScore Event from the Game scene

        this.gameScene.events.on ('updateScore', (score) => {

            this.scoreText.setText (`Coins: ${score}`);
        });




    }

}