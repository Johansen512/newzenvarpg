class GameManager {
    constructor(scene, mapData){
        this.scene = scene;
        this.mapData = mapData;

        this.spawners = {};
        this.chests = {};
        this.playerLocations = [];
        this.chestLocations = {};
        this.monsterLocations = {};


        
    }

    setup (){
        this.parseMapData();
        this.setupEventListener();
        this.setupSpawners();
        this.spawnPlayer();

    }


    parseMapData() {
        this.mapData.forEach((layer) => {
          if (layer.name === 'player_locations') {
            layer.objects.forEach((obj) => {
              this.playerLocations.push([obj.x, obj.y]);
            });
          } else if (layer.name === 'chest_locations') {
           layer.objects.forEach((obj) => {
                var spawner = getTiledProperty(obj, 'spawner');
              if (this.chestLocations[obj.properties.spawner]) {
                this.chestLocations[obj.properties.spawner].push([obj.x, obj.y]);
              } else {
               this.chestLocations[obj.properties.spawner] = [[obj.x, obj.y]];
              }
            });
          /* layer.objects.forEach((obj) => {
              var spawner = getTiledProperty(obj, 'spawner');
              //console.log (property.value)
            if (this.chestLocations[spawner]) {
              this.chestLocations[spawner].push([obj.x, obj.y]);
            } else {
              this.chestLocations[spawner] = [[obj.x, obj.y]];
            }
          });*/





          } else if (layer.name === 'monster_locations') {
            layer.objects.forEach((obj) => {
                //var spawner = getTiledProperty(obj, 'spawner');
                if (this.monsterLocations[obj.properties.spawner]) {
                  this.monsterLocations[obj.properties.spawner].push([obj.x, obj.y]);
                } else {
                  this.monsterLocations[obj.properties.spawner] = [[obj.x, obj.y]];
                }
            });
          }
        });

       

        console.log (this.playerLocations);
        console.log (this.monsterLocations);
        console.log (this.chestLocations);
        
      }

    setupEventListener(){


    }

    setupSpawners() {
        //Create chest spawners
        Object.keys(this.chestLocations).forEach((key) => {
            const config = {
                spawnInterval: 3000,
                limit: 3,
                spawnerType: SpawnerType.CHEST,
                id: `chest-${key}`,

            };

            const spawner = new Spawner(

                config, 
                this.chestLocations[key], 
                this.addChest.bind(this), 
                this.deleteChest.bind(this)
                
                ); 
                this.spawners [spawner.id] = spawner;

        });

    }

    spawnPlayer(){
        const location = this.playerLocations [Math.floor(Math.random() * this.playerLocations.length)];
        this.scene.events.emit ('spawnPlayer', location);

    }

    addChest(chestId, chest){

        this.chests[chestId] = chest;
        console.log(chest);
    }

    deleteChest(chestId){

      delete this.chests[chestId];
    }
}