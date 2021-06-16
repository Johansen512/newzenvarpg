class Map{

    constructor(scene, key, tileSetName, bgLayerName, blockedLayerName) {
        this.scene = scene; //the scene this map belongs to
        this.key = key; //Tiled JSON file key name
        this.tileSetName = tileSetName; //Tiled tileset image key name
        this.bgLayerName = bgLayerName; //the name of the layer created in Tiled for the map background
        this.blockedLayerName = blockedLayerName; //The name of the layer created in Tiled for the blocked areas
        this.createMap();

    }

    createMap (){

        //create the tilemap
      
        this.map = this.scene.make.tilemap ({key: this.key});
        //add the tileset image to the map
      
        this.tiles = this.map.addTilesetImage (this.tileSetName, this.tileSetName, 32, 32, 1, 2);
        //create background layer
      
        this.backgroundLayer = this.map.createStaticLayer (this.bgLayerName, this.tiles, 0, 0);
        this.backgroundLayer.setScale (2)
      
        // create blocked layer
        this.blockedLayer = this.map.createStaticLayer (this.blockedLayerName, this.tiles, 0, 0);
        this.blockedLayer.setScale (2)
        // CHANGED THIS NEXT -> this.blockedLayer.setCollisionByExclusion ([-1],this)
        this.blockedLayer.setCollisionByExclusion ([-1])
        //Update the world bounds
        this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
        this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;
      
        //Limit the camera to the size of our map
        this.scene.cameras.main.setBounds (0,0, this.map.widthInPixels * 2,  this.map.heightInPixels * 2)
      
      }


}