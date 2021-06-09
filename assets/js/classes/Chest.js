class Chest extends Phaser.Physics.Arcade.Image {

    constructor (scene, x, y, key, frame, coins, id){
    
    super (scene, x, y, key, frame);

    //store a reference to the scene

    this.scene = scene; //The scene this game object will be added to
    
    this.coins= coins; //The amount of coins this chest contains

    this.id = id;
    
    //enable physics
    
    this.scene.physics.world.enable (this);
    
    
    //Add the chest to the existing scene
    
    this.scene.add.existing (this);

    //Scale the chest game object
    this.setScale(2);
    
    }
    makeActive(){
        this.setActive (true);
        this.setVisible (true);
        this.body.checkCollision.none = false;

    }

    makeInactive (){

        this.setActive (false);
        this.setVisible (false);
        this.body.checkCollision.none = true;

    }
}