
OBJECTS.vector = function(x,y){

	var vector = this;

	vector.x = 0;
	vector.y = 0;

	this.init = function(x,y){
		if(x===undefined) x=0;
		if(y===undefined) y=0;
		vector.set(x,y);
	};

	this.randomize = function(maxX,maxY){
		var signX = Math.random()>0.5 ? 1 : -1;
		var signY = Math.random()>0.5 ? 1 : -1;
		vector.x = Math.random()*maxX*signX;
		vector.y = Math.random()*maxY*signY;
	};

	this.set = function(x,y){
		vector.x = x;
		vector.y = y;
	};

	this.add = function(V){
		vector.x += V.x;
		vector.y += V.y;
	};

	this.sub = function(V){
		vector.x -= V.x;
		vector.y -= V.y;
	};

	this.mult = function(V){
		vector.x *= V.x;
		vector.y *= V.y;
	};

	this.dot = function(V){
		var product = 0;
		product += vector.x * V.x;
		product += vector.y * V.y;
		return product;
	};

	this.mag = function(){
		return Math.sqrt( vector.dot(vector) );
	};

	this.normalize = function(){
		var mag = vector.mag();
		if(mag!==0){
			vector.x = vector.x / mag;
			vector.y = vector.y / mag;
		}
	};


	this.init(x,y);
};