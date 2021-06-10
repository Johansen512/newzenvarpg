const Direction= {
    RIGHT: 'RIGHT',
    LEFT:'LEFT',
    UP:'UP',
    DOWN:'DOWN',
}

class PlayerContainer extends Phaser.GameObjects.Container{

    constructor (scene, x, y, key, frame){
    
    super (scene, x, y);
    
     //store a reference to the scene
    this.scene = scene; //The scene this container (?!) will be added to
    
    this.velocity=160; //the velocity when moving our player

    this.currentDirection = Direction.RIGHT;
    this.playerAttacking = false;
    this.flipX = true;
    this.swordHit = false;

    //set the size of the container
    this.setSize (64,64)
    
    //enable physics
    this.scene.physics.world.enable (this);
    
    
    
    
    
    // prevent the player from leaving the game area collide with world bounds
    
    this.body.setCollideWorldBounds(true);
    
    //Add the player container to the existing scene
    
    this.scene.add.existing (this);
    //have the camera follow the player
    this.scene.cameras.main.startFollow (this);

    //create the player
    this.player = new Player (this.scene, 0, 0, key, frame);
    this.add(this.player);

    //Create weapon game object
    this.weapon = this.scene.add.image(40,0, 'items', 4);
    this.scene.add.existing(this.weapon);
    this.weapon.setScale(1.5);
    this.scene.physics.world.enable(this.weapon);
    this.add(this.weapon);
    this.weapon.alpha= 1;

    
    }
    
    update (cursors) {
    
        // implement function for detecting key press and updating movement
    
        this.body.setVelocity (0);
    
        // update the velocity on the player's physics body
    
        if (cursors.left.isDown) {
    
            this.body.setVelocityX(-this.velocity);
            this.currentDirection =Direction.LEFT;
            this.weapon.setPosition (-40, 0)
    
        } else if (cursors.right.isDown){
    
            this.body.setVelocityX(this.velocity);
            this.currentDirection =Direction.RIGHT;
            this.weapon.setPosition (40, 0)
    
        } 
    
    
        if (cursors.up.isDown) {
    
            this.body.setVelocityY(-this.velocity);
            this.currentDirection =Direction.UP;
            this.weapon.setPosition (0, -40);
    
        } else if (cursors.down.isDown){
    
            this.body.setVelocityY(this.velocity)
            this.currentDirection =Direction.DOWN;
            this.weapon.setPosition (0, 40);
    
        } 

        if (this.playerAttacking) {


        } else {
            if(this.currentDirection === Direction.DOWN ){
                this.weapon.setAngle(-270);

            } else if(this.currentDirection === Direction.UP ){
                this.weapon.setAngle(-90);
            } else {
                this.weapon.setAngle(0);
            }



        }
    
    }
    
    }