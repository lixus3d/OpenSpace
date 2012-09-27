var app = require('http').createServer(),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(800);

io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'Welcome !!!' });
	socket.on('mousePosition',function(data) {
		//console.log('mousePosition receive');
		socket.broadcast.emit('updatePosition', data);
	});
});
