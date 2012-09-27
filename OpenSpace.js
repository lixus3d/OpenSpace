OBJECTS.OpenSpace = function(){

    var OpenSpace = this;

    this.players        = new OBJECTS.players();
	this.units			= new OBJECTS.units();
	this.items			= new OBJECTS.items();
	this.projectiles	= new OBJECTS.projectiles();

	this.ticker			= null;

    this.init = function(){
        OpenSpace.player = new OBJECTS.player();
        OpenSpace.players.addPlayer(this.player);
    };

    this.tick = function(){
        //console.log(OpenSpace.player.name);
    };

    /**
     * Start the game
     */
    this.start = function(){
		if(OpenSpace.ticker) OpenSpace.stop();
		log('Starting Motor');
		OpenSpace.ticker = window.setInterval(OpenSpace.tick,RULES.config.tickInterval);
    };

     /**
     * Stop the game
     */
    this.stop = function(){
		log('Stopping Motor');
		window.clearInterval(motor.ticker);
    };

    this.init();

};