// Require the packages we will use:
var http = require("http"),
	socketio = require("socket.io")(app),
	url = require('url'),
	path = require('path'),
	mime = require('mime'),
	path = require('path'),
	fs = require('fs');

	let currentFile;
	let allUsers = {};
// Listen for HTTP connections.  This is essentially a miniature static file server that only serves our one file, client.html:
var app = http.createServer(function(req, resp){
	// This callback runs when a new connection is made to our HTTP server.
	fileName = url.parse(req.url).pathname
	
	if(fileName == '/') {
		fileName = '/index.html';
	}
	filePath = path.join(__dirname, fileName);

	fs.readFile(filePath, function(err, data){
		
		if(err) return resp.writeHead(500);
		resp.writeHead(200);
		
		//console.log('Reading file: ' + fileName);
		resp.end(data);
	});

});


app.listen(3456);

// Do the Socket.IO magic:
var io = socketio.listen(app);
io.sockets.on("connection", function(socket){

	console.log("Client connected");

	socket.on('join', function(data) {
		console.log("joined");
		socket.nickname = data.username;
		allUsers[socket.id] = socket.nickname;
		console.log(allUsers);
	})
	
	socket.on('join room', function (room) {
		socket.join(room);
		console.log("user has joined room: " + room);
	});

	socket.on('create', function (data) {
		console.log(data)
		socket.join(data.room);
		createPublicRoom(data.host, data.room, socket);
		console.log("Room " + data.room + " has been created");
	});

	// This callback runs when a new Socket.IO connection is established.
	
	socket.on('message_to_server', function(data) {
		// This callback runs when the server receives a new message from the client.
		if(data['user'] == null) {
			console.log("User is null");
		} else if(data['message'] == '') {
			console.log("Client sent no data")
		} else {
			console.log("USER: "+data['user'])
			console.log("message: "+data["message"]); // log it to the Node.JS output
			io.sockets.in('global').emit("message_to_client",{message:data["message"], user:data['user'] }) // broadcast the message to other users
		}
		
	});
});

function createPublicRoom(host, name, socket) {
	console.log("Createing room document")
	fs.readFile('rooms/default.html', function(err, data) {
		console.log(data);
		socket.emit('send-user-room', data);
	});
}
