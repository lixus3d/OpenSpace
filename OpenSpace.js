OBJECTS.OpenSpace = function(){

    var OpenSpace = this;

    this.player         = null;
    this.players        = new OBJECTS.players(OpenSpace);
	this.units			= new OBJECTS.units(OpenSpace);
	this.items			= new OBJECTS.items(OpenSpace);
	this.projectiles	= new OBJECTS.projectiles(OpenSpace);
    this.drawer         = new OBJECTS.drawer(OpenSpace);

	this.ticker			= null;

    this.init = function(){
        OpenSpace.player = new OBJECTS.player(OpenSpace);
        OpenSpace.players.addPlayer(this.player);
    };

    this.tick = function(){
        //console.log(OpenSpace.player.name);
        OpenSpace.units.tick();
        OpenSpace.projectiles.tick();
        OpenSpace.drawer.tick();
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