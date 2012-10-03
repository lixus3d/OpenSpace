
OBJECTS.spaceCraft = function(OpenSpaceObject, playerObject){

	var spaceCraft = this;

    spaceCraft.OpenSapce = null;

	spaceCraft.id = 0; // unit "number" in the RTS
	spaceCraft.x = 10;
	spaceCraft.y = 50;

    spaceCraft.vector = new OBJECTS.vector();
    spaceCraft.steering = new OBJECTS.vector();

	spaceCraft.player = null;

    spaceCraft.rectangle = {
          width: 10,
          height: 10,
          borderWidth: 1
        };

	this.setId = function(id){spaceCraft.id = id;};
    this.getId = function(){return spaceCraft.id;};

    this.init = function(OpenSpaceObject, playerObject){
        spaceCraft.OpenSpace = OpenSpaceObject;
        spaceCraft.player = playerObject;
        spaceCraft.x = Math.random()*RULES.config.space.width ;
        spaceCraft.y = Math.random()*RULES.config.space.height ;

        spaceCraft.OpenSpace.units.addUnit(spaceCraft);

        spaceCraft.vector.randomize(RULES.config.spaceCraft.maxSpeed,RULES.config.spaceCraft.maxSpeed);
    };

    this.activate = function(){

    };

    this.draw = function(context){
        var shape = spaceCraft.rectangle;
        context.beginPath();
        context.rect(spaceCraft.x, spaceCraft.y, shape.width, shape.height);
        context.fillStyle = '#8ED6FF';
        context.fill();
        context.lineWidth = shape.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
    };

    this.move = function(){
        spaceCraft.x += spaceCraft.vector.x;
        spaceCraft.y += spaceCraft.vector.y;
        if(spaceCraft.x > RULES.config.space.width ) spaceCraft.x = 0;
        if(spaceCraft.x < 0 ) spaceCraft.x = RULES.config.space.width;
        if(spaceCraft.y > RULES.config.space.height ) spaceCraft.y = 0;
        if(spaceCraft.y < 0 ) spaceCraft.y = RULES.config.space.height;
    };


    this.tick = function(){
        spaceCraft.move();
    };

    this.init(OpenSpaceObject,playerObject);

};