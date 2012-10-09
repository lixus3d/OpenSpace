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
		tickInterval: 15,
		space: {
			width: 1600,
			height: 900
		},
		spaceCraft: {
			maxSpeed: 5,
			minSpeed: 0.5,
			maxSteering: 0.05,
			accelerate: 0.2,
			decelerate: 0.03,
			breaking: 0.15,
			steering: 0.015
		},
		weapon: {
			life: 70,
			speed: 12
		}
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