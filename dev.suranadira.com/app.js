var http = require('http'); // DO NOT change to https
var fs = require('fs');
var server = http.createServer(function(request, response) {
  var url = request.url;

  switch (url) {
    // case '/':
    //   getStaticFileContent(response, 'index.html', 'text/html');
    //   break;
    // case '/suranadira_dev':
    // case '/suranadira_dev/':
    //   getStaticFileContent(response, 'index.html', 'text/html');
    //   break;
    // case '/noumena':
    // case '/phenomena':
    case '/test':
      getStaticFileContent(response, 'index.html', 'text/html');
      break;
    default:
      response.writeHead(404, {'Content-Type':'text/plain'});
      response.end('404 - Page not found: ' + url);
  }
});

// var io = require('socket.io')(server);
/// var io = require('socket.io').listen(server);

// var socket = require('socket.io-client')(server);
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});

server.listen(8080);

// const wss = new WebSocket.Server({
//   port: 3000, // 8080
//   perMessageDeflate: {
//     zlibDeflateOptions: { // See zlib defaults.
//       chunkSize: 1024,
//       memLevel: 7,
//       level: 3,
//     },
//     zlibInflateOptions: {
//       chunkSize: 10 * 1024
//     },
//     // Other options settable:
//     clientNoContextTakeover: true, // Defaults to negotiated value.
//     serverNoContextTakeover: true, // Defaults to negotiated value.
//     clientMaxWindowBits: 10,       // Defaults to negotiated value.
//     serverMaxWindowBits: 10,       // Defaults to negotiated value.
//     // Below options specified as default values.
//     concurrencyLimit: 10,          // Limits zlib concurrency for perf.
//     threshold: 1024,               // Size (in bytes) below which messages
//                                    // should not be compressed.
//   }
// });

// wsServer = new WebSocketServer({
//     httpServer: server,
//     // You should not use autoAcceptConnections for production
//     // applications, as it defeats all standard cross-origin protection
//     // facilities built into the protocol and the browser.  You should
//     // *always* verify the connection's origin and decide whether or not
//     // to accept it.
//     autoAcceptConnections: true,
//     fragmentOutgoingMessages: false
// });
//
// function originIsAllowed(origin) {
//   // put logic here to detect whether the specified origin is allowed.
//   return true;
// }
//
// wsServer.on('request', function(request) {
//   if (!originIsAllowed(request.origin)) {
//     // Make sure we only accept requests from an allowed origin
//     request.reject();
//     console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//     return;
//   }
//
//   var connection = request.accept('echo-protocol', request.origin);
//   console.log((new Date()) + ' Connection accepted.');
//   connection.on('message', function(message) {
//       if (message.type === 'utf8') {
//           console.log('Received Message: ' + message.utf8Data);
//           connection.sendUTF(message.utf8Data);
//       }
//       else if (message.type === 'binary') {
//           console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//           connection.sendBytes(message.binaryData);
//       }
//   });
//   connection.on('close', function(reasonCode, description) {
//       console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//   });
// });

// var io = require('socket.io')(server);
// io.on('connection', function(client){
//   client.on('event', function(data){});
//   client.on('disconnect', function(){});
// });

// io.on('connection', function(client){
//   client.on('event', function(data){});
//   client.on('disconnect', function(){});
// });
// server.listen(3000);

// io.on('connection', function(socket){
//   socket.emit('request', /* */); // emit an event to the socket
//   io.emit('broadcast', /* */); // emit an event to all connected sockets
//   socket.on('reply', function(){ /* */ }); // listen to the event
// });

// io.sockets.on('connection', function (socket) {
//   // Let everyone know it's working
//   socket.emit('startup', { message: 'I Am Working!!' });
// });


// var socket = io.connect('https://dev.suranadira.com:8080');

// // create the server
// wsServer = new WebSocketServer({
//   httpServer: server
// });
//
// // WebSocket server
// wsServer.on('request', function(request) {
//   var connection = request.accept(null, request.origin);
//
//   // This is the most important callback for us, we'll handle
//   // all messages from users here.
//   connection.on('message', function(message) {
//       // Process WebSocket message
//   });
//
//   connection.on('close', function(connection) {
//     // Connection closes
//   });
// });

// var server = ws.createServer(function (conn) {
// 	console.log("New connection")
// 	conn.on("text", function (str) {
// 		console.log("Received "+str)
// 		conn.sendText(str.toUpperCase()+"!!!")
// 	})
// 	conn.on("close", function (code, reason) {
// 		console.log("Connection closed")
// 	})
// }).listen(8001)

// var server = ws.createServer(function (conn) {
// 	console.log("New connection")
// 	conn.on("binary", function (inStream) {
// 		// Empty buffer for collecting binary data
// 		var data = new Buffer(0)
// 		// Read chunks of binary data and add to the buffer
// 		inStream.on("readable", function () {
// 		    var newData = inStream.read()
// 		    if (newData)
// 		        data = Buffer.concat([data, newData], data.length+newData.length)
// 		})
// 		inStream.on("end", function () {
// 			console.log("Received " + data.length + " bytes of binary data")
// 		    process_my_data(data)
// 		})
// 	})
// 	conn.on("close", function (code, reason) {
// 		console.log("Connection closed")
// 	})
// }).listen(8001)

// var server = ws.createServer(function (connection) {
// 	connection.nickname = null
// 	connection.on("text", function (str) {
// 		if (connection.nickname === null) {
// 			connection.nickname = str
// 			broadcast(str+" entered")
// 		} else
// 			broadcast("["+connection.nickname+"] "+str)
// 	})
// 	connection.on("close", function () {
// 		broadcast(connection.nickname+" left")
// 	})
// })
// server.listen(8081)
//
// function broadcast(str) {
// 	server.connections.forEach(function (connection) {
// 		connection.sendText(str)
// 	})
// }



// server.listen(8080, function(){
//   console.log('listening on *:8080');
// });


function getStaticFileContent(response, filepath, contentType) {
  fs.readFile(filepath, function (error, data) {
    if (error) {
      response.writeHead(500, {'Content-Type':'text/plain'});
      response.end('500 - Internal Server Error.');
    }
    if (data) {
      response.writeHead(200, {'Content-Type':'text/html'});
      response.end(data);
    }
  });
}

// io.on('connection', function(socket){
//   console.log('a user connected');
// });
//
// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
