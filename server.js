var http = require('http').Server();
var io = require('socket.io')(http);
const { Writable, Readable, Duplex, Transform } = require('stream');



io.on('connection', (socket) => {
	console.log('connected');
	socket.on('disconnect', () => {
		console.log('disconnected');
	});
	socket.on('data', (data) => {
		console.log(data.toString());
	});
	const inoutStream = new Writable({
		write(chunk, encoding, callback) {
			socket.emit('data', chunk);
			callback();
		}
	});
	process.stdin
		.pipe(inoutStream);
});

http.listen(3000, () => {
	console.log(3000);
});
