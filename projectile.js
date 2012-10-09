OBJECTS.projectile = function(OpenSpaceObject, spaceCraftObject){

	var projectile = this;

    projectile.OpenSpace = null;
    projectile.spaceCraft = null;

	projectile.id = 0; // projectile "number" in the RTS
	projectile.x = 10;
	projectile.y = 50;
	projectile.life = null;


    projectile.speed = 1;
    projectile.vector = new OBJECTS.vector();
    projectile.steering = 0;

    projectile.rectangle = {
      width: 2,
      height: 2
    };

	this.setId = function(id){projectile.id = id;};
    this.getId = function(){return projectile.id;};

    this.init = function(OpenSpaceObject, spaceCraftObject){
        projectile.OpenSpace = OpenSpaceObject;
        projectile.spaceCraft = spaceCraftObject;

        projectile.x = projectile.spaceCraft.x + projectile.spaceCraft.vector.x ;
        projectile.y = projectile.spaceCraft.y + projectile.spaceCraft.vector.y ;

        projectile.life = RULES.config.weapon.life;

        projectile.OpenSpace.projectiles.addProjectile(projectile);

        projectile.vector = projectile.spaceCraft.vector.clone();

        projectile.speed = RULES.config.weapon.speed;

        projectile.vector.normalize();
        projectile.vector.mult(projectile.speed);

        //spaceCraft.steering
    };

    this.activate = function(){

    };

    this.draw = function(context){
        var shape = projectile.rectangle;
        context.beginPath();
        context.rect(projectile.x, projectile.y, shape.width, shape.height);
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

    /**
     * Do it every motor tick
     * @return {[type]} [description]
     */
    this.tick = function(){
        projectile.move();
        projectile.life -= 1;
        if(projectile.life<=0){
        	log('a pu !');
			projectile.OpenSpace.projectiles.killProjectile(projectile.getId());
		}
    };

    this.init(OpenSpaceObject, spaceCraftObject);
}