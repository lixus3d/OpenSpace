
OBJECTS.players = function(){

	var players = this;

    /**
     * Add a player to the players list and activate the unit
     */
    players.addPlayer = this.addItem;

    /**
     * Destroy a player, update the list, update the current selection
     */
    players.killProjectile = this.killItem;

};

OBJECTS.players.prototype = new ABSTRACTS.itemListAbstract();