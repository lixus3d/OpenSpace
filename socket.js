OBJECTS.socket = function(OpenSpaceObject){

	var socket = this;

	socket.OpenSapce	= null;
	socket.connector	= null;
	socket.stack		= [];


	this.init = function(OpenSpaceObject){
		socket.OpenSpace = OpenSpaceObject;
		log('connecting to localhost');
		socket.connector = io.connect('http://192.168.21.186:800');
		socket.handle();
		socket.sendStack();
	};

	this.handle = function(){
		socket.connector.on('message',socket.message);
		socket.connector.on('update',socket.receive);
	};


	this.addStack = function(action){
		socket.stack.push(action);
	};

	this.receive = function(data){
		$.each(data,function(k,action){
			switch(action.name){
				case 'projectile':
					var id = action.id;
					var spaceCraftId = action.spaceCraftId;
					var spaceCraftObject = socket.OpenSpace.units.getItemById(spaceCraftId);
					if(!(object = socket.OpenSpace.units.getItemById(id))){ // If we can't get the item , we must create it
						object = new OBJECTS.projectile(socket.OpenSpace, spaceCraftObject, id);
					}
					object.x = action.x;
					object.y = action.y;
					object.vector.x = action.vector.x;
					object.vector.y = action.vector.y;
					object.speed = action.speed;
				break;
				case 'spaceCraft':
					var id = action.id;
					if(!(object = socket.OpenSpace.units.getItemById(id))){ // If we can't get the item , we must create it
						object = new OBJECTS.spaceCraft(socket.OpenSpace, null, id);
					}
					object.x = action.x;
					object.y = action.y;
					object.vector.x = action.vector.x;
					object.vector.y = action.vector.y;
					object.speed = action.speed;
				break;
			}
		});
	};

	this.sendStack = function(){
		if(socket.stack.length>=1){
			var data = socket.stack;
			socket.stack = [];
			socket.connector.emit('actions',data);
		}
		window.setTimeout(socket.sendStack,10);
	};

	this.message = function(data){
		log(data.message);
	};


	this.init(OpenSpaceObject);

};