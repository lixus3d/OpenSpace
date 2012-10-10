var app = require('http').createServer(),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(800);

io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'Welcome new client !!!' });

	socket.on('actions',function(data) {
		//console.log('mousePosition receive');
		socket.broadcast.emit('update', data);
	});


});
