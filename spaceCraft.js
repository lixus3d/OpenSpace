
OBJECTS.spaceCraft = function(OpenSpaceObject, playerObject){

	var spaceCraft = this;

    spaceCraft.OpenSapce = null;

	spaceCraft.id = 0; // unit "number" in the RTS
	spaceCraft.x = 0;
	spaceCraft.y = 0;

    spaceCraft.vector = new OBJECTS.vector();
    spaceCraft.steering = new OBJECTS.vector();

	spaceCraft.player = null;

	this.setId = function(id){spaceCraft.id = id;};
    this.getId = function(){return spaceCraft.id;};

    this.init = function(OpenSpaceObject, playerObject){
        spaceCraft.OpenSpace = OpenSpaceObject;
        spaceCraft.player = playerObject;
        spaceCraft.x = Math.random(0,1000);
        spaceCraft.y = Math.random(0,1000);

        spaceCraft.OpenSpace.units.addUnit(spaceCraft);
    };

    this.activate = function(){

    };

    this.draw = function(){

    };

    this.move = function(){

    };

    this.tick = function(){
        spaceCraft.move();
        spaceCraft.draw();
    };

    this.init(OpenSpaceObject,playerObject);

};