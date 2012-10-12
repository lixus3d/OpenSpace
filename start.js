
var OpenSpace = new OBJECTS.OpenSpace();

window.setTimeout(function(){
	OpenSpace.start();
	$('input[name="playerName"]').trigger('change');
	$('input[name="playerColor"]').trigger('change');
},100);

