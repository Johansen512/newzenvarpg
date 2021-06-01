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
      this.createAudio ()

      this.createChests ()

 // make the wall and immovable
  this.createWalls ()

  // create character game object

 this.createPlayer ()


 // add a collider between player and objects
 // check for overlap between player and other physics objects
 // play audio and destroy chest
 this.addCollisions ()

 
 

 // create bindings to the arrow keys

 this.createInput ();

 }

 update () {

   this.player.update (this.cursors)
 
 }


 createAudio () {
  // create sound game object
  this.goldPickupAudio = this.sound.add ('goldSound', {loop:false, volume: 0.4});

 }

 createPlayer () {
 // create character game object

 this.player = new Player (this, 32, 32, 'characters', 0);

 }

 createChests (){
  this.chest = new Chest(this, 300, 300, 'items', 0);

 }

 createWalls (){
   //make the wall
 // make the wall immovable

 this.wall = this.physics.add.image (500, 100, 'button1');
 this.wall.setImmovable ();

 }

 createInput (){
 // create bindings to the arrow keys

 this.cursors = this.input.keyboard.createCursorKeys();

 }

 addCollisions (){
// add a collider between player and buttons
this.physics.add.collider (this.player, this.wall)

// check for overlap between player and other physics objects
// play audio and destroy chest
this.physics.add.overlap (this.player, this.chest, this.collectChest, null, this);

 }

 collectChest (player, chest){
//play gold pickup sound
  this.goldPickupAudio.play (); 

 // update score in the Ui
  this.events.emit ('updateScore', chest.coins);

  //destroy the chest game object
  chest.destroy();
 }
}