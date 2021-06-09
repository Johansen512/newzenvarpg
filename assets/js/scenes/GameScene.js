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
      this.createGroups();
   
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

 createGroups(){

  //Create Chest Group
  this.chests = this.physics.add.group();


  

 }

 spawnChest(chestObject){
  let chest = this.chests.getFirstDead();
  
  if (!chest) {  const chest = new Chest(this, chestObject.x * 2, chestObject.y *2, 'items', 0, chestObject.gold, chestObject.id);

  
  //add chest to chest group
    this.chests.add (chest)

  } else {
    chest.coins = chestObject.gold;
    chest.id = chestObject.id;
    chest.setPosition (chestObject.x * 2, chestObject.y *2);
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


  this.events.emit ('pickUpChest', chest.id)
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

this.events.on ('chestSpawned', (chest) => {

  // create chest game object
  this.spawnChest(chest)
 
});

  this.gameManager = new GameManager (this, this.map.map.objects);
  this.gameManager.setup();
}

}