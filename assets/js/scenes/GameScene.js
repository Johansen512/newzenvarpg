class GameScene extends Phaser.Scene {

    constructor (){
        super ('Game')

    }

    init (){

       // run Ui Scene in parallel with Game Scene
      this.scene.launch ('Ui')
    }

    create(){

        // create sound game object
 var goldPickupAudio = this.sound.add ('goldSound', {loop:false, volume: 0.4});




this.chest = new Chest(this, 300, 300, 'items', 0);

 // make the button immovable

 this.wall = this.physics.add.image (500, 100, 'button1');
 this.wall.setImmovable ();

  // create character game object

 this.player = new Player (this, 32, 32, 'characters', 0);


 // add a collider between player and buttons
 this.physics.add.collider (this.player, this.wall)

 // check for overlap between player and other physics objects
 // play audio and destroy chest
 this.physics.add.overlap (this.player, this.chest, function(player, chest){ goldPickupAudio.play (); chest.destroy();})

 // create bindings to the arrow keys

 this.cursors = this.input.keyboard.createCursorKeys();

 }

 update () {

   this.player.update (this.cursors)
 
 }
}