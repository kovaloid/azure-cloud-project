var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

var server = http.createServer(function(request, response) {

    var page = url.parse(request.url).pathname;
    console.log(page);
    
    if (page == '/') {
	    response.writeHead(200, {"Content-Type": "text/plain"});
        response.end('You\'re at the reception desk. How can I help you?');
    } else if (page == '/basement') {
	    response.writeHead(200, {"Content-Type": "text/plain"});
        response.end('You\'re in the wine cellar. These bottles are mine!');
    } else if (page == '/floor/1/bedroom') {
	    response.writeHead(200, {"Content-Type": "text/plain"});
        response.write('Hey, this is a private area!');
		response.end();
    } else {

	    pathName =url.parse(request.url).pathname;
        fs.readFile(__dirname + pathName, function(err, data) {
          if (err) {
              response.writeHead(404, {'Content-type':'text/plain'});
              response.write('Page Was Not Found');
              response.end();
			  console.log(err);
          } else {
		     console.log(data);
              response.writeHead(200, {'Content-type':'text/html'});
              response.write(data);
              response.end();
	      }
    	});
	
	
	}

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
