
OBJECTS.player = function(OpenSpaceObject, id){

	var player = this;

	player.OpenSpace = null;

	player.id = 0; // unit "number" in the RTS
	player.name = 'OpenSpace';
	player.color = '#FFFFFF';

	player.score = 0;
	player.killed = 0;

	player.spaceCraft = null;

	this.setId = function(id){player.id = id;};
    this.getId = function(){return player.id;};

    this.init = function(OpenSpaceObject, id){
        if(id===undefined) id = 0;
        player.setId(id);
		player.OpenSpace = OpenSpaceObject;
    };

    this.isCurrentPlayer = function(){
    	return player.getId() == player.OpenSpace.player.getId();
    };

    this.spawn = function(){
		player.newSpaceCraft();
		player.handle();
    };

    this.newSpaceCraft = function(){
		this.spaceCraft = new OBJECTS.spaceCraft(OpenSpaceObject,player);
    };

	this.addScore = function(amount){
		player.score += amount;
		player.addStack();
		//log(player.score);
	};

    this.handle = function(){
		window.onkeydown = function(e){
			//log(e.keyCode);
			switch(e.keyCode){
				case 38 :
				case 104 : // PAV NUM UP
					player.spaceCraft.actionSpeed('accelerate');
				break;
				case 40 :
				case 98 : // PAV NUM DOWN
					player.spaceCraft.actionSpeed('decelerate');
				break;
				case 39 :
				case 102 : // PAV NUM RIGHT
					player.spaceCraft.actionSteering('turnRight');
				break;
				case 37 :
				case 100 : // PAV NUM LEFT
					player.spaceCraft.actionSteering('turnLeft');
				break;
				case 32 :  // SPACE BAR
					player.spaceCraft.actionShoot('shoot');
				break;
			}
		};
		window.onkeyup = function(e){
			switch(e.keyCode){
				case 38 :
				case 40 :
				case 104 : // PAV NUM UP
				case 98 : // PAV NUM DOWN
					player.spaceCraft.actionSpeed(null);
				break;
				case 39 :
				case 37 :
				case 102 : // PAV NUM RIGHT
				case 100 : // PAV NUM LEFT
					player.spaceCraft.actionSteering(null);
				break;
				case 32 :  // SPACE BAR
					player.spaceCraft.actionShoot(null);
				break;
			}
		};
	};

    this.kill = function(){
        delete player.spaceCraft ;
        player.killed++;
        if(player.isCurrentPlayer()){
			if(player.spawnTimeout) window.clearTimeout(player.spawnTimeout);
			player.spawnTimeout = window.setTimeout(player.spawn,RULES.config.respawnTime);
        }
    };

    this.addStack = function(){
        if( player.isCurrentPlayer() ){
            player.OpenSpace.socket.addStack({
                name:'player',
                id: player.getId(),
                pN: player.name,
                clr: player.color,
                scr: player.score,
                kld: player.killed
            });
        }
    };

    this.init(OpenSpaceObject, id);
};