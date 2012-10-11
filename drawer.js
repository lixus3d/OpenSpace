
OBJECTS.drawer = function(OpenSpaceObject){

	var drawer = this;

	drawer.OpenSapce = null;
	drawer.canvas = null;
	drawer.context = null;

    this.init = function(OpenSpaceObject){
		drawer.OpenSpace = OpenSpaceObject;
		drawer.canvas = document.getElementById('gameCanvas');
        drawer.context = drawer.canvas.getContext('2d');
    };

    this.tick = function(){

		drawer.context.clearRect(0,0,drawer.canvas.width,drawer.canvas.height);

		for(id in OpenSpace.units.list ){
			OpenSpace.units.list[id].draw(drawer.context);
		}

		for(id in OpenSpace.projectiles.list ){
			OpenSpace.projectiles.list[id].draw(drawer.context);
		}

    };

    this.init(OpenSpaceObject);
};