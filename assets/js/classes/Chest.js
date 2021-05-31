class Chest extends Phaser.Physics.Arcade.Image {

    constructor (scene, x, y, key, frame){
    
    super (scene, x, y, key, frame);

    //store a reference to the scene
    this.scene = scene;
    
    this.coins=10;
    
    //enable physics
    
    this.scene.physics.world.enable (this);
    
    
    //Add the chest to the existing scene
    
    this.scene.add.existing (this);
    
    }

}