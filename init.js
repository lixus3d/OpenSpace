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
		tickInterval: 20,
		respawnTime: 3000,
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
			steering: 0.015,
			life: 400
		},
		weapon: {
			lifeTime: 70,
			speed: 12,
			impact: 8
		},
		score: {
			touch: 3,
			kill: 100
		}
	}
};

function log(data){
	if(window.console){
		console.log(data);
	}
}

$(document).ready(function(){
	$('input[name="playerName"]').change(function(){
		OpenSpace.player.name = $(this).val();
	});
	$('input[name="playerColor"]').change(function(){
		OpenSpace.player.color = $(this).val();
	});
});