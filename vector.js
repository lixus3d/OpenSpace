
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

	this.init(x,y);
};