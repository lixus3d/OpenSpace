
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
    };

    this.init(OpenSpaceObject);
};