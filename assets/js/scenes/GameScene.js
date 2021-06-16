class GameScene extends Phaser.Scene {

    constructor (){
        super ('Game')

    }

    init (){

       // run Ui Scene in parallel with Game Scene
      this.scene.launch ('Ui');

      
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
  this.playerAttackAudio = this.sound.add ('playerAttack', {loop:false, volume: 0.4});
  this.playerDamageAudio = this.sound.add ('playerDamage', {loop:false, volume: 0.4});
  this.playerDeathAudio = this.sound.add ('playerDeath', {loop:false, volume: 0.8});
  this.monsterDeathAudio = this.sound.add ('enemyDeath', {loop:false, volume: 0.4});
  //Background
  this.backgroundAudio = this.sound.add ('backgroundMusic', {loop:true, volume: 0.2});

 }

 createPlayer (playerObject) {
 // create character game object

 this.player = new PlayerContainer (
   this, 
   playerObject.x * 2, 
   playerObject.y * 2, 
   'characters', 
   5,
   playerObject.health,
   playerObject.maxHealth,
   playerObject.id,
   this.playerAttackAudio,
   
   
   );

 }

 createGroups(){

  //Create Chest Group
  this.chests = this.physics.add.group();

  //Create Monster Group
  this.monsters = this.physics.add.group();
  this.monsters.runChildUpdate = true;


  

 }

 spawnChest(chestObject){
  let chest = this.chests.getFirstDead();
  
  if (!chest) {  chest = new Chest(
    this, 
    chestObject.x * 2, 
    chestObject.y *2, 
    'items', 0, 
    chestObject.gold, 
    chestObject.id
    
    );

  
  //add chest to chest group
    this.chests.add (chest)
    chest.setCollideWorldBounds(true);

  } else {
    chest.coins = chestObject.gold;
    chest.id = chestObject.id;
    chest.setPosition (chestObject.x * 2, chestObject.y *2);
    chest.makeActive();
  }
 

  
 }

 spawnMonster (monsterObject){

  let monster = this.monsters.getFirstDead();
  
  if (!monster) {  monster = new Monster(
    this, 
    monsterObject.x, 
    monsterObject.y, 
    'monsters', 
    monsterObject.frame,
    monsterObject.id,
    monsterObject.health, 
    monsterObject.maxHealth,

    
    );

  
  //add monster to monsters group
    this.monsters.add (monster);
    monster.setCollideWorldBounds(true);

  } else {
    
    monster.id = monsterObject.id;
    monster.health = monsterObject.health;
    monster.maxHealth = monsterObject.maxHealth;
    monster.setTexture('monsters', monsterObject.frame);
    monster.setPosition (monsterObject.x, monsterObject.y);
    monster.makeActive();
  }

  console.log (monsterObject);
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


// add a collider between monster group and blocked Layer items
this.physics.add.collider (this.monsters, this.map.blockedLayer)

//check for overlap between player's weapon and monster gameobjects
this.physics.add.overlap (this.player.weapon, this.monsters, this.enemyOverlap, null, this);

 }

 enemyOverlap (weapon, enemy){

  if(this.player.playerAttacking && !this.player.swordHit){

    this.player.swordHit= true;
    
   this.events.emit ('monsterAttacked', enemy.id, this.player.id);

  }
   

 }

 collectChest (player, chest){
//play gold pickup sound
  this.goldPickupAudio.play (); 


 


  this.events.emit ('pickUpChest', chest.id, player.id)
 }

createMap (){

 //create map

 this.map = new Map (this, 'map', 'background', 'background', 'blocked');

}

createGameManager (){

  this.events.on ('spawnPlayer', (playerObject) => {

        // create character game object
        this.createPlayer(playerObject);
        // add a collider between player and objects
        // check for overlap between player and other physics objects
        // play audio and destroy chest
        this.addCollisions();
         //test af baggrundsmusik
  this.backgroundAudio.play();
});

this.events.on ('chestSpawned', (chest) => {

  // create chest game object
  this.spawnChest(chest)
 
});

this.events.on ('monsterSpawned', (monster) => {

  // create monster game object
  this.spawnMonster(monster)
 
});

this.events.on ('chestRemoved', (chestId) => {

  this.chests.getChildren().forEach((chest)=> {

    if(chest.id === chestId) {
      chest.makeInactive();
    }
  })
 
});





this.events.on ('monsterRemoved', (monsterId) => {

  this.monsters.getChildren().forEach((monster)=> {

    if(monster.id === monsterId) {
      monster.makeInactive();
      this.monsterDeathAudio.play();
    }
  })
 
});


this.events.on ('updateMonsterHealth', (monsterId, health) => {

  this.monsters.getChildren().forEach((monster)=> {

    if(monster.id === monsterId) {
      monster.updateHealth(health);
    }
  })
 
});

this.events.on ('monsterMovement', (monsters) => {

  this.monsters.getChildren().forEach((monster)=> {

   Object.keys(monsters).forEach((monsterId) => {

    if(monster.id === monsterId ){
      this.physics.moveToObject(monster, monsters[monsterId], 40)
    }
   })
  })
 
});



this.events.on ('updatePlayerHealth', (playerId, health) => {
  if(health < this.player.health){
    this.playerDamageAudio.play();

  }
  

  this.player.updateHealth(health)
  
 });

 this.events.on ('respawnPlayer', (playerObject) => {

  this.playerDeathAudio.play();
  this.player.respawn(playerObject);
  

 
  
 });


  this.gameManager = new GameManager (this, this.map.map.objects);
  this.gameManager.setup();
}

}