
OBJECTS.player = function(OpenSpaceObject){

	var player = this;

	player.OpenSapce = null;

	player.id = 0; // unit "number" in the RTS
	player.name = 'Player';
	player.spaceCraft = new OBJECTS.spaceCraft(OpenSpaceObject,player);

	this.setId = function(id){player.id = id;};
    this.getId = function(){return player.id;};

    this.init = function(OpenSpaceObject){
		player.OpenSpace = OpenSpaceObject;
		player.handle();
    };

    this.handle = function(){
		window.onkeydown = function(e){
			//log(e.keyCode);
			switch(e.keyCode){
				case 104 : // PAV NUM UP
					player.spaceCraft.actionSpeed('accelerate');
				break;
				case 98 : // PAV NUM DOWN
					player.spaceCraft.actionSpeed('decelerate');
				break;
				case 102 : // PAV NUM RIGHT
					player.spaceCraft.actionSteering('turnRight');
				break;
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
				case 104 : // PAV NUM UP
				case 98 : // PAV NUM DOWN
					player.spaceCraft.actionSpeed(null);
				break;
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


    this.init(OpenSpaceObject);
};