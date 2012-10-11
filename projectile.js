OBJECTS.projectile = function(OpenSpaceObject, spaceCraftObject, id){

	var projectile = this;

    projectile.OpenSpace = null;
    projectile.spaceCraft = null;

	projectile.id = 0; // projectile "number" in the RTS
	projectile.x = 10;
	projectile.y = 50;
	projectile.lifeTime = null;


    projectile.speed = 1;
    projectile.vector = new OBJECTS.vector();
    projectile.steering = 0;

    projectile.rectangle = {
      size: 2
    };

	this.setId = function(id){projectile.id = id;};
    this.getId = function(){return projectile.id;};

    this.init = function(OpenSpaceObject, spaceCraftObject, id){
        if(id===undefined) id = 0;
        projectile.setId(id);
        projectile.OpenSpace = OpenSpaceObject;
        projectile.spaceCraft = spaceCraftObject;

        projectile.x = projectile.spaceCraft.x + projectile.spaceCraft.vector.x ;
        projectile.y = projectile.spaceCraft.y + projectile.spaceCraft.vector.y ;

        projectile.lifeTime = RULES.config.weapon.lifeTime;

        projectile.OpenSpace.projectiles.addProjectile(projectile);

        projectile.vector = projectile.spaceCraft.vector.clone();

        projectile.speed = RULES.config.weapon.speed;

        projectile.vector.normalize();
        projectile.vector.mult(projectile.speed);

        projectile.addStack();
        //spaceCraft.steering
    };

    this.activate = function(){

    };

    this.draw = function(context){
        var shape = projectile.rectangle;
        context.beginPath();
        context.rect(projectile.x, projectile.y, shape.size, shape.size);
        context.fillStyle = '#FF0000';
        context.fill();

    };

    this.move = function(){
    	projectile.vector.mult(0.98);
        projectile.x += projectile.vector.x;
        projectile.y += projectile.vector.y;


        /*
        var perpendicular = projectile.vector.perpendicular(-1);
        //perpendicular.normalize();
        perpendicular.mult(new OBJECTS.vector(spaceCraft.steering,spaceCraft.steering));
        spaceCraft.vector.add(perpendicular);

        spaceCraft.vector.normalize();
        spaceCraft.vector.mult(spaceCraft.speed);
		*/

        if(projectile.x > RULES.config.space.width ) projectile.x = 0;
        if(projectile.x < 0 ) projectile.x = RULES.config.space.width;
        if(projectile.y > RULES.config.space.height ) projectile.y = 0;
        if(projectile.y < 0 ) projectile.y = RULES.config.space.height;
    };

    this.touching = function(){
        for(uid in projectile.OpenSpace.units.list){
            var spaceCraft = projectile.OpenSpace.units.list[uid];
            if(spaceCraft.getId() == projectile.spaceCraft.getId()) continue;
            var spaceCraftSize = spaceCraft.rectangle.size;
            var spaceCraftHalfSize = spaceCraftSize/2;

            if(
                spaceCraft.x - spaceCraftHalfSize <= projectile.x && spaceCraft.x + spaceCraftHalfSize >= projectile.x &&
                spaceCraft.y - spaceCraftHalfSize <= projectile.y && spaceCraft.y + spaceCraftHalfSize >= projectile.y
                ){
                spaceCraft.touch(projectile);
                projectile.kill();
            }
        }
    };

    this.kill = function(){
        projectile.OpenSpace.projectiles.killProjectile(projectile.getId());
    };

    this.addStack = function(){
        if(projectile.spaceCraft.player !== null){
            projectile.OpenSpace.socket.addStack({
                name:'projectile',
                id: projectile.getId(),
                scId: projectile.spaceCraft.getId(),
                x: projectile.x,
                y: projectile.y,
                v: {
                    x: projectile.vector.x,
                    y: projectile.vector.y
                },
                s: projectile.speed
            });
        }
    };

    /**
     * Do it every motor tick
     * @return {[type]} [description]
     */
    this.tick = function(){
        projectile.move();
        projectile.touching();
        projectile.lifeTime -= 1;
        if(projectile.lifeTime<=0){
            projectile.kill();
		}

    };

    this.init(OpenSpaceObject, spaceCraftObject, id);
}