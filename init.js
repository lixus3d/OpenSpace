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
		autoStack: 40,
		space: {
			width: 1600,
			height: 900
		},
		spaceCraft: {
			maxSpeed: 6,
			minSpeed: 0.5,
			maxSteering: 0.07,
			accelerate: 0.2,
			decelerate: 0.03,
			breaking: 0.15,
			steering: 0.005,
			life: 400,
			weaponDecay: 4
		},
		weapon: {
			lifeTime: 85,
			speed: 14,
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
	if(localStorage.OpenSpacePlayerName!==undefined){
		$('input[name="playerName"]').val(localStorage.OpenSpacePlayerName);
	}
	if(localStorage.OpenSpacePlayerColor!==undefined){
		$('input[name="playerColor"]').val(localStorage.OpenSpacePlayerColor);
	}
	$('input[name="playerName"]').change(function(){
		var pName = $(this).val();
		OpenSpace.player.name = pName;
		localStorage.OpenSpacePlayerName = pName;
		OpenSpace.player.addStack();
	});
	$('input[name="playerColor"]').change(function(){
		var pColor = $(this).val();
		OpenSpace.player.color = pColor;
		localStorage.OpenSpacePlayerColor = pColor;
		OpenSpace.player.addStack();
	});
});