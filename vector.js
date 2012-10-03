
OBJECTS.vector = function(x,y){

	var vector = this;

	vector.x = 0;
	vector.y = 0;

	this.init = function(x,y){
		if(x===undefined) x=0;
		if(y===undefined) y=0;
		vector.x = x;
		vector.y = y;
	};

	this.randomize = function(maxX,maxY){
		var signX = Math.random()>0.5 ? 1 : -1;
		var signY = Math.random()>0.5 ? 1 : -1;
		vector.x = Math.random()*maxX*signX;
		vector.y = Math.random()*maxY*signY;
	};

	this.init(x,y);
};