class Monster extends Phaser.Physics.Arcade.Image {

    constructor (scene, x, y, key, frame, id, health, maxHealth) {

        super (scene, x, y, key, frame);

        this.scene = scene;
        this.id = id;
        this.health = health;
        this.maxHealth = maxHealth;


        //enable physics
        this.scene.physics.world.enable (this);

        //set immovable if another object collides with our monster

        this.setImmovable (false)

        //Scale our monster
        
        this.setScale(2);

        // prevent the monster from leaving the game area collide with world bounds

        this.setCollideWorldBounds(true);

        //Add the monster to the existing scene

        this.scene.add.existing (this);

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