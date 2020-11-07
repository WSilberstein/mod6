// Require the packages we will use:
var http = require("http"),
	socketio = require("socket.io")(app),
	url = require('url'),
	path = require('path'),
	mime = require('mime'),
	path = require('path'),
	fs = require('fs');

	let currentFile;
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

	// This callback runs when a new Socket.IO connection is established.
	
	socket.on('message_to_server', function(data) {
		// This callback runs when the server receives a new message from the client.
		if(data == '') {
			console.log()
		}
		console.log("USER: "+data['user'])
		console.log("message: "+data["message"]); // log it to the Node.JS output
		io.sockets.emit("message_to_client",{message:data["message"], user:data['user'] }) // broadcast the message to other users
	});
});