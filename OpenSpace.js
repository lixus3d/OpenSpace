OBJECTS.OpenSpace = function(){

    var OpenSpace = this;

    this.player         = null;
    this.players        = new OBJECTS.players(OpenSpace);
	this.units			= new OBJECTS.units(OpenSpace);
	this.items			= new OBJECTS.items(OpenSpace);
	this.projectiles	= new OBJECTS.projectiles(OpenSpace);
    this.drawer         = new OBJECTS.drawer(OpenSpace);
    this.socket         = new OBJECTS.socket(OpenSpace);
    this.scoreBoard     = new OBJECTS.scoreBoard(OpenSpace);

	this.ticker			= null;

    this.init = function(){
        OpenSpace.player = new OBJECTS.player(OpenSpace);
        OpenSpace.players.addPlayer(this.player);
        OpenSpace.player.spawn();
        OpenSpace.player.addStack();
    };

    this.tick = function(){
        //console.log(OpenSpace.player.name);
        OpenSpace.units.tick();
        OpenSpace.projectiles.tick();
        OpenSpace.drawer.tick();
        OpenSpace.scoreBoard.tick();
    };

    this.hex2rgb = function(hex){
        if ( hex[0] == '#' ) {
                hex = hex.substr(1);
        }
        if ( hex.length == 6 ) {
                r = parseInt(hex[0]+hex[1],16);
                g = parseInt(hex[2]+hex[3],16);
                b = parseInt(hex[4]+hex[5],16);
        } else if ( strlen( hex ) == 3 ) {
                r = parseInt(hex[0]+hex[1],16);
                g = parseInt(hex[2]+hex[3],16);
                b = parseInt(hex[4]+hex[5],16);
        }
        return {
            r: r,
            g: g,
            b: b
        };
    };

    this.rgb2hex = function(r,g,b){
        var rgb = [ r.toString(16) , g.toString(16) , b.toString(16) ];
        for (var i=0;i<3;i++) {
            if (rgb[i].length==1) rgb[i]='0'+rgb[i];
        }
        return '#'+rgb[0]+rgb[1]+rgb[2];
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