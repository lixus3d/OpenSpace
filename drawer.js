
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

		$.each(OpenSpace.units.list,function(k,unit){
			unit.draw(drawer.context);
			//log(unit.getId());
		});

    };

    this.init(OpenSpaceObject);
};