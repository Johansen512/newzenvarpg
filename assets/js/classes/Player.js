class Player extends Phaser.Physics.Arcade.Image {

constructor (scene, x, y, key, frame){

super (scene, x, y, key, frame);

 //store a reference to the scene
this.scene = scene;

this.velocity=160;

//enable physics

this.scene.physics.world.enable (this);

//set immovable if another object collides with our player

this.setImmovable (false)

//Scale our player

this.setScale(2);

// prevent the player from leaving the game area collide with world bounds

this.setCollideWorldBounds(true);

//Add the player to the existing scene

this.scene.add.existing (this);

}

update (cursors) {

    // implement function for detecting key press and updating movement

    this.body.setVelocity (0);

    // update the velocity on the player's physics body

    if (cursors.left.isDown) {

        this.body.setVelocityX(-this.velocity)

    } else if (cursors.right.isDown){

        this.body.setVelocityX(this.velocity)

    } 


    if (cursors.up.isDown) {

        this.body.setVelocityY(-this.velocity)

    } else if (cursors.down.isDown){

        this.body.setVelocityY(this.velocity)

    } 

}

}