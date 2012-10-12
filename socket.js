OBJECTS.socket = function(OpenSpaceObject){

	var socket = this;

	socket.OpenSapce	= null;
	socket.connector	= null;
	socket.stack		= [];


	this.init = function(OpenSpaceObject){
		socket.OpenSpace = OpenSpaceObject;
		log('connecting to server');
		socket.connector = io.connect('http://192.168.21.186:800');
		socket.handle();
		socket.addPlayer();
		socket.sendStack();
	};

	this.handle = function(){
		socket.connector.on('message',socket.message);
		socket.connector.on('update',socket.receive);
	};

	this.addPlayer = function(){
		socket.addStack({
			name:'newconnection'
		});
	};


	this.addStack = function(action){
		socket.stack.push(action);
	};

	this.receive = function(data){
		$.each(data,function(k,action){
			switch(action.name){
				case 'newconnection':
					// In case a person is connecting, send your player
					socket.OpenSpace.player.addStack();
				break;
				case 'projectile':
					var id = action.id;
					var spaceCraftId = action.scId;
					var spaceCraftObject = socket.OpenSpace.units.getItemById(spaceCraftId);
					if(!(object = socket.OpenSpace.units.getItemById(id))){ // If we can't get the item , we must create it
						object = new OBJECTS.projectile(socket.OpenSpace, spaceCraftObject, id);
					}
					object.x = action.x;
					object.y = action.y;
					object.vector.x = action.v.x;
					object.vector.y = action.v.y;
					object.speed = action.s;
				break;
				case 'spaceCraft':
					var id = action.id;
					var playerId = action.pId;
					var playerObject = socket.OpenSpace.players.getItemById(playerId);
					if(!(object = socket.OpenSpace.units.getItemById(id))){ // If we can't get the item , we must create it
						object = new OBJECTS.spaceCraft(socket.OpenSpace, playerObject, id);
					}
					object.name = action.scN;
					object.color = action.clr;
					object.x = action.x;
					object.y = action.y;
					object.vector.x = action.v.x;
					object.vector.y = action.v.y;
					object.life = action.l;
					object.speed = action.s;
				break;
				case 'player':
					var id = action.id;
					if(!(object = socket.OpenSpace.players.getItemById(id))){ // If we can't get the item , we must create it
						object = new OBJECTS.player(socket.OpenSpace, id);
						socket.OpenSpace.players.addPlayer(object);
					}
					object.name = action.pN;
					object.color = action.clr;
					object.score = action.scr;
					object.killed = action.kld;
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