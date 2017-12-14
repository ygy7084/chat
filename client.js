const io = require('socket.io-client');
const socket = io('http://localhost:3000');
const { Writable, Readable, Duplex, Transform } = require('stream');

const inoutStream = new Writable({
	write(chunk, encoding, callback) {
		socket.emit('data', chunk);
		callback();
	},
});
socket.on('connect', () => {
	console.log('connected');
	socket.on('data', (data) => {
		console.log(data.toString());
	});
	process.stdin
		.pipe(inoutStream);
});