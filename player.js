
OBJECTS.player = function(){

	var player = this;

	player.id = 0; // unit "number" in the RTS
	player.name = 'Player';
	player.spaceCraft = new OBJECTS.spaceCraft(player);

	this.setId = function(id){player.id = id;};
    this.getId = function(){return player.id;};

    this.init = function(){

    };

    this.init();
};