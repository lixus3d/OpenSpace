/**
 * Namespace for abstract classes
 */
var ABSTRACTS = {};

/**
 * Namespace for basic objects
 */
var OBJECTS = {};

/**
 * Rules object
 */
var RULES = {
	config: {
		tickInterval: 20
	}
};

function log(data){
	if(window.console){
		console.log(data);
	}
}

/*

var socket = io.connect('http://localhost:800');

socket.on('updatePosition', function (data) {
	//console.log(data);
	updatePosition(data);
});

socket.on('message', function (data) {
	console.log(data.message);
});

$(document).ready(function(){
	$(document).mousemove(function(e){
		//console.log('mousemove');
		tick++;
		var posX = e.pageX;
		var posY = e.pageY;
		if(tick >= updateEveryTick){
			//console.log('mousePosition send');
			socket.emit('mousePosition', { x: posX, y: posY });
			tick=0;
		}
	});
});
*/