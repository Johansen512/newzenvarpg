class UiButton extends Phaser.GameObjects.Container {

constructor (scene, x, y, key, hoverKey, text, targetCallback) {

    super(scene, x, y);
    this.scene = scene; //the scene this container will be added to
    this.x = x; //the x position of our container
    this.y = y; //the x position of our container
    this.key = key; //the background image of our button
    this.hoverKey = hoverKey; //the image that will be diplay when the player hover over the button
    this.text = text; //The texxt that will be display on the button
    this.targetCallback = targetCallback; //The callback function that will be called when the player clickss the button

    //Create our UIbutton
    this.createButton ();
    //add this container to our Phaser scene
    this.scene.add.existing (this);
}

createButton () {

     // create play game button
    this.button =  this.scene.add.image(0, 0, 'button1');

    //Make button interactive
    this.button.setInteractive ();

    //scale the button
    this.button.setScale (1.4)

    //create the button text
    this.buttonText = this.scene.add.text (0, 0, this.text, {fontSize: '26px', fill: '#fff'});
    // position the text inside the Ui Button
    Phaser.Display.Align.In.Center (this.buttonText, this.button);

    //Add the two game objects to our container

    this.add(this.button);
    this.add (this.buttonText);


 
    // listen for events
    this.button.on ('pointerdown', () => { 

        this.targetCallback ();
     

    
    })
    // listen for events
    this.button.on ('pointerover', () => { 

     
     this.button.setTexture (this.hoverKey)
    })
    // listen for events
    this.button.on ('pointerout', () => { 

     this.button.setTexture (this.key)

    
 })

}
}

 