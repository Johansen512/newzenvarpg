class Player extends Phaser.Physics.Arcade.Image {

constructor (scene, x, y, key, frame){

super (scene, x, y, key, frame);

 //store a reference to the scene
this.scene = scene; //The scene this container (?!) will be added to

//enable physics
this.scene.physics.world.enable (this);

//set immovable if another object collides with our player

this.setImmovable (true)

//Scale our player
//CHANGED TO 1.6!!!!
this.setScale(2);

//Add the player to the existing scene

this.scene.add.existing (this);

}

}