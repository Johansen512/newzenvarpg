class GameManager {
    constructor(scene, mapData){
        this.scene = scene;
        this.mapData = mapData;

        this.spawners = {};
        this.chests = {};
        this.monsters = {};
        this.players = {};
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
              this.playerLocations.push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
            });
          } else if (layer.name === 'chest_locations') {
           layer.objects.forEach((obj) => {
               // var spawner = getTiledProperty(obj, 'spawner');
              if (this.chestLocations[obj.properties.spawner]) {
                this.chestLocations[obj.properties.spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
              } else {
               this.chestLocations[obj.properties.spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
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
                  this.monsterLocations[obj.properties.spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
                } else {
                  this.monsterLocations[obj.properties.spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
                }
            });
          }
        });

       

        console.log (this.playerLocations);
        console.log (this.monsterLocations);
        console.log (this.chestLocations);
        
      }

    setupEventListener(){
      this.scene.events.on ('pickUpChest', (chestId, playerId) => {

        // update the spawner
        if (this.chests[chestId]){

          const { gold } = this.chests[chestId];

          //Updating the players gold
          this.players[playerId].updateGold(gold);
          this.scene.events.emit ('updateScore', this.players [playerId].gold);

          //removing the chest

          this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);

          this.scene.events.emit ('chestRemoved', chestId);
        }
        
       
      });

      this.scene.events.on ('monsterAttacked', (monsterId, playerId) => {

        // update the spawner
        if (this.monsters[monsterId]){

          const { gold, attack } = this.monsters[monsterId];

          //subtract health from monster model
          this.monsters[monsterId].loseHealth();

          //check the monster health and if dead remove that object
          if(this.monsters[monsterId].health <=0){
            

               //Updating the players gold
          this.players[playerId].updateGold(gold);
          this.scene.events.emit ('updateScore', this.players [playerId].gold);

          //removing the monster

            this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
            this.scene.events.emit ('monsterRemoved', monsterId);
          } 
          else {
            //update players health
            this.players[playerId].updateHealth(-attack);
            this.scene.events.emit ('updatePlayerHealth', playerId, this.players[playerId].health);

            //update monster health

            this.scene.events.emit ('updateMonsterHealth', monsterId, this.monsters[monsterId].health);
          }

          
        }
        
       
      });

    }

    setupSpawners() {

      const config = {
        spawnInterval: 3000,
        limit: 3,
        spawnerType: SpawnerType.CHEST,
        id: '',

    };


        let spawner;


        //Create chest spawners
        Object.keys(this.chestLocations).forEach((key) => {
            config.id = `chest-${key}`;
              

            spawner = new Spawner(

                config, 
                this.chestLocations[key], 
                this.addChest.bind(this), 
                this.deleteChest.bind(this)
                
                ); 
                this.spawners [spawner.id] = spawner;
            });

            //Create Monster Spawners

            Object.keys(this.monsterLocations).forEach((key) => {
              config.id = `monster-${key}`;
              config.spawnerType = SpawnerType.MONSTER;

              
  
              spawner = new Spawner(
  
                  config, 
                  this.monsterLocations[key], 
                  this.addMonster.bind(this), 
                  this.deleteMonster.bind(this)
                  
                  ); 
                  this.spawners [spawner.id] = spawner;
              });



    }

    spawnPlayer(){
        const player = new PlayerModel(this.playerLocations);
        this.players[player.id] = player;
        this.scene.events.emit ('spawnPlayer', player);

    }

    addChest(chestId, chest){

        this.chests[chestId] = chest;
        this.scene.events.emit ('chestSpawned', chest);
    }

    deleteChest(chestId){

      delete this.chests[chestId];
    }

    addMonster (monsterId, monster){
      this.monsters[monsterId] = monster;
      this.scene.events.emit ('monsterSpawned', monster);


    }

    deleteMonster(monsterId){
      delete this.monsters[monsterId];
    }
}