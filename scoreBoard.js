OBJECTS.scoreBoard = function(OpenSpaceObject){

	var scoreBoard = this;

	scoreBoard.OpenSpace = null;

	this.init = function(OpenSpaceObject){
		scoreBoard.OpenSpace = OpenSpaceObject;
	};

	this.draw = function(){
		var context = scoreBoard.OpenSpace.drawer.context;
		context.fillStyle = '#555';
		var y = 70;
        context.fillText('Scores :',10,70);
        var sortedPlayer = [];
        for( uid in scoreBoard.OpenSpace.players.list ){
			var player = scoreBoard.OpenSpace.players.list[uid];
			var key = player.score;
			while(sortedPlayer[key] !== undefined){
				key -=1;
			}
			sortedPlayer[key] = player;
        }
        sortedPlayer.reverse();
        for( order in sortedPlayer){
        	y += 14;
        	var player = sortedPlayer[order];
			context.fillStyle = player.color;
			context.fillText(player.name+' '+player.score+' ('+player.killed+')',10,y);
        }
	};

	this.tick = function(){
		scoreBoard.draw();
	};

	this.init(OpenSpaceObject);
};