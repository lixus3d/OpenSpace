
OBJECTS.spaceCraft = function(OpenSpaceObject, playerObject, id){

	var spaceCraft = this;

    spaceCraft.OpenSpace = null;

	spaceCraft.id = 0; // unit "number" in the RTS
	spaceCraft.x = 10;
	spaceCraft.y = 50;
    spaceCraft.life = 0;

    spaceCraft.autoStack = 0;

    spaceCraft.speed = 1;
    spaceCraft.vector = new OBJECTS.vector();
    spaceCraft.steering = 0;

    spaceCraft.projectile = null;
    spaceCraft.weaponDecay = 0;
    spaceCraft.weaponDecayDirection = 1;

    spaceCraft.speedDo = null;
    spaceCraft.steeringDo = null;
    spaceCraft.shootDo = null;
    spaceCraft.lifeDo = null;

	spaceCraft.player = null;

    spaceCraft.rectangle = {
          size: 10,
          borderWidth: 1
        };

	this.setId = function(id){spaceCraft.id = id;};
    this.getId = function(){return spaceCraft.id;};

    this.init = function(OpenSpaceObject, playerObject, id){
        if(id===undefined) id = 0;
        spaceCraft.setId(id);
        spaceCraft.OpenSpace = OpenSpaceObject;
        spaceCraft.player = playerObject;

        spaceCraft.x = Math.random()*RULES.config.space.width ;
        spaceCraft.y = Math.random()*RULES.config.space.height ;
        spaceCraft.life = RULES.config.spaceCraft.life ;

        spaceCraft.OpenSpace.units.addUnit(spaceCraft);

        spaceCraft.vector.randomize(RULES.config.spaceCraft.maxSpeed,RULES.config.spaceCraft.maxSpeed);
        //spaceCraft.steering
    };

    this.activate = function(){

    };

    this.draw = function(context){
        var shape = spaceCraft.rectangle;
        context.beginPath();
        halfSize = shape.size / 2;
        context.rect(spaceCraft.x-halfSize  , spaceCraft.y-halfSize, shape.size, shape.size);
        context.fillStyle = spaceCraft.player.color ;
        context.fill();
        context.lineWidth = shape.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
        context.fillStyle = '#555';
        context.fillText(spaceCraft.life+' '+spaceCraft.player.name,spaceCraft.x-halfSize,spaceCraft.y+15);
    };

    this.move = function(){
        spaceCraft.x += spaceCraft.vector.x;
        spaceCraft.y += spaceCraft.vector.y;

        if(spaceCraft.steering!==0){
            var perpendicular = spaceCraft.vector.perpendicular(-1);
            //perpendicular.normalize();
            perpendicular.mult(new OBJECTS.vector(spaceCraft.steering,spaceCraft.steering));
            spaceCraft.vector.add(perpendicular);
        }
        spaceCraft.vector.normalize();
        spaceCraft.vector.mult(spaceCraft.speed);

        if(spaceCraft.x > RULES.config.space.width ) spaceCraft.x = 0;
        if(spaceCraft.x < 0 ) spaceCraft.x = RULES.config.space.width;
        if(spaceCraft.y > RULES.config.space.height ) spaceCraft.y = 0;
        if(spaceCraft.y < 0 ) spaceCraft.y = RULES.config.space.height;
    };

    this.touch = function(projectileObject){
        if(projectileObject.spaceCraft.player.isCurrentPlayer()){ // if it's the player projectile
            OpenSpace.player.addScore(RULES.config.score.touch); // score the actual player
        }
        spaceCraft.life -= RULES.config.weapon.impact;
        spaceCraft.lifeDo = 'touch';
        if(spaceCraft.life <= 0){
            spaceCraft.kill();
        }
    };

    /**
     * The action to do for speed at the next tick
     * @param  string action action string
     */
    this.actionSpeed = function(action){
        spaceCraft.speedDo = action;
    };

    /**
     * The action to do for steering at the next tick
     * @param  string action action string
     */
    this.actionSteering = function(action){
        spaceCraft.steeringDo = action;
    };

    this.actionShoot = function(action){
        spaceCraft.shootDo = action;
    };

    /**
     * Accelerate the spaceCraft
     */
    this.accelerate = function(){
        spaceCraft.speed += RULES.config.spaceCraft.accelerate;
        if(spaceCraft.speed > RULES.config.spaceCraft.maxSpeed ) spaceCraft.speed = RULES.config.spaceCraft.maxSpeed;
    };

    /**
     * Decelerate the spaceCraft
     * @param  boolean breaking Breaking or just decelerating
     */
    this.decelerate = function(breaking){
        if(breaking===undefined) breaking = true;

        if( breaking ){
            spaceCraft.speed -= RULES.config.spaceCraft.breaking;
        }else{
            spaceCraft.speed -= RULES.config.spaceCraft.decelerate;
        }

        if(spaceCraft.speed < RULES.config.spaceCraft.minSpeed ) spaceCraft.speed = RULES.config.spaceCraft.minSpeed;
    };


    /**
     * Turn to the right
     */
    this.turnRight = function(){
        spaceCraft.steering += RULES.config.spaceCraft.steering;
        if(spaceCraft.steering > RULES.config.spaceCraft.maxSteering ) spaceCraft.steering = RULES.config.spaceCraft.maxSteering;
    };

    /**
     * Turn to the left
     */
    this.turnLeft = function(){
        spaceCraft.steering -= RULES.config.spaceCraft.steering;
        if( (spaceCraft.steering * -1) > RULES.config.spaceCraft.maxSteering ) spaceCraft.steering = RULES.config.spaceCraft.maxSteering*-1;
    };

    this.shoot = function(){
        spaceCraft.weaponDecay += spaceCraft.weaponDecayDirection;
        if( Math.abs(spaceCraft.weaponDecay) > RULES.config.spaceCraft.weaponDecay ) spaceCraft.weaponDecayDirection *= -1;
        spaceCraft.projectile = new OBJECTS.projectile(spaceCraft.OpenSpace,spaceCraft,undefined,spaceCraft.weaponDecay);
        //log('shoot');
    };

    /**
     * Do it every motor tick
     * @return {[type]} [description]
     */
    this.tick = function(){
        // TODO : Try spaceCraft[speedDo]()
        if(spaceCraft.speedDo){
            spaceCraft[spaceCraft.speedDo]();
        }else{
            spaceCraft.decelerate(false);
        }

        if(spaceCraft.steeringDo){
            spaceCraft[spaceCraft.steeringDo]();
        }else{
            spaceCraft.steering = 0;
        }

        if(spaceCraft.shootDo){
            spaceCraft[spaceCraft.shootDo]();
        }

        spaceCraft.move();
        if(spaceCraft.speedDo||spaceCraft.steeringDo||spaceCraft.lifeDo||(spaceCraft.autoStack>RULES.config.autoStack)){
            spaceCraft.addStack();
        }
        spaceCraft.autoStack++;
    };

    this.kill = function(){
        spaceCraft.OpenSpace.units.killUnit(spaceCraft.getId());
        spaceCraft.player.kill();
    };

    this.addStack = function(){
        if(spaceCraft.player.isCurrentPlayer()){
            spaceCraft.OpenSpace.socket.addStack({
                name:'spaceCraft',
                id: spaceCraft.getId(),
                clr: spaceCraft.player.color,
                scN: spaceCraft.player.name,
                pId: spaceCraft.player.getId(),
                x: spaceCraft.x,
                y: spaceCraft.y,
                v: {
                    x: spaceCraft.vector.x,
                    y: spaceCraft.vector.y
                },
                l: spaceCraft.life,
                s: spaceCraft.speed
            });
        }
        spaceCraft.autoStack=0;
    };

    this.init(OpenSpaceObject, playerObject, id);

};