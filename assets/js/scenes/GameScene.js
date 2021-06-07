class GameScene extends Phaser.Scene {

    constructor (){
        super ('Game')

    }

    init (){

       // run Ui Scene in parallel with Game Scene
      this.scene.launch ('Ui');

      this.score = 0;
    }

    create(){

      this.createMap();
        // create sound game object
      this.createAudio();
      this.createChests();
   
        // create bindings to the arrow keys
      this.createInput();
      this.createGameManager();

 }

 update () {

  if (this.player) this.player.update (this.cursors)
 
 }


 createAudio () {
  // create sound game object
  this.goldPickupAudio = this.sound.add ('goldSound', {loop:false, volume: 0.4});

 }

 createPlayer (location) {
 // create character game object

 this.player = new Player (this, location[0] * 2, location[1] * 2, 'characters', 0);

 }

 createChests (){

  //Create Chest Group
  this.chests = this.physics.add.group();

//creaat chest positions array
this.chestPositions = [[100,100],[200,200],[300,300],[400,400], [500,500]]



  //specify the max number of chests we can have
this.maxNumberOfChests = 3;

  //Spawn a chest
  for (let i = 0; i < this.maxNumberOfChests; i += 1) {
    this.spawnChest ();
  }
  

 }

 spawnChest(){
  const location = this.chestPositions [Math.floor(Math.random () * this.chestPositions.length)];

  let chest = this.chests.getFirstDead();
  
  if (!chest) {  const chest = new Chest(this, location [0], location [1], 'items', 0);

  
  //add chest to chest group
    this.chests.add (chest)

  } else {

    chest.setPosition (location [0], location [1]);
    chest.makeActive();
  }
 

  
 }



 createInput (){
 // create bindings to the arrow keys

 this.cursors = this.input.keyboard.createCursorKeys();

 }

 addCollisions (){
// add a collider between player and blocked Layer items
this.physics.add.collider (this.player, this.map.blockedLayer)

// check for overlap between player and other physics objects
// play audio and destroy chest
this.physics.add.overlap (this.player, this.chests, this.collectChest, null, this);

 }

 collectChest (player, chest){
//play gold pickup sound
  this.goldPickupAudio.play (); 

  //Update our score
  this.score += chest.coins;

 // update score in the Ui
  this.events.emit ('updateScore', this.score);

  //make the chest game object inactive
  chest.makeInactive();

  //Spawn a new chest
  this.time.delayedCall(1000, this.spawnChest, [], this);
 }

createMap (){

 //create map

 this.map = new Map (this, 'map', 'background', 'background', 'blocked');

}

createGameManager (){

  this.events.on ('spawnPlayer', (location) => {

        // create character game object
        this.createPlayer(location);
        // add a collider between player and objects
        // check for overlap between player and other physics objects
        // play audio and destroy chest
        this.addCollisions();
});

  this.gameManager = new GameManager (this, this.map.map.objects);
  this.gameManager.setup();
}

}