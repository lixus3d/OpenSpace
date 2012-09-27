
OBJECTS.players = function(){

	var players = this;

    players.list = [];  // list of players

    players.idList = [];


    /**
     * Add a item to the items list and activate the item
     * @param {RTSitem} item
     */
    this.addPlayer = function(player){

		// add player to the list
		players.list.push(player);
		// compute itemId
		playerId = players.list.length-1;
		// set the itemId
        player.setId(playerId);
        // push the id to the idList
        players.idList.push(playerId);
    };

    /**
     * Delete a player, update lists
     * @param {number} itemId
     */
    this.delPlayer = function(playerId){

        // get normal list position
        var index = this.idList.indexOf(playerId);
        if(index!=-1){
            this.list.splice(index,1);
            this.idList.splice(index,1);
        }
    };

};