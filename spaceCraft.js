
OBJECTS.spaceCraft = function(playerObject){

	var spaceCraft = this;

	spaceCraft.id = 0; // unit "number" in the RTS
	spaceCraft.x = 0;
	spaceCraft.y = 0;
	spaceCraft.player = null;

	this.setId = function(id){spaceCraft.id = id;};
    this.getId = function(){return spaceCraft.id;};

    this.init = function(playerObject){
    	spaceCraft.player = playerObject;
    	spaceCraft.x = Math.random(0,1000);
    	spaceCraft.y = Math.random(0,1000);
    };

    this.init(playerObject);

};