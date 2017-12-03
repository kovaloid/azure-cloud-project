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
	
	} else if (page == '/handle') {
	
	
	
	if(request.method === "POST") {
	var requestBody = '';
	request.on('data', function(data) {
	
//	console.log(data);

        requestBody += data;
        if(requestBody.length > 1e7) {
          response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
          response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
        }
      });
      request.on('end', function() {
        var formData = querystring.parse(requestBody);
		console.log(formData);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<!doctype html><html><head><title>response</title></head><body>');
        response.write('Thanks for the data!<br />User Name: '+formData.UserName);
        response.write('<br />Repository Name: '+formData.Repository);
        response.write('<br />Branch: '+formData.Branch);
        response.end('</body></html>');
      });
	  
	  
	  
	  
	} else {
	
	
	
	
	    response.writeHead(200, {"Content-Type": "text/plain"});
        response.end('You\'re at the reception desk. How can I help you?');
		
		}
		
		
    } else if (page == '/basement') {
	    response.writeHead(200, {"Content-Type": "text/plain"});
        response.end('You\'re in the wine cellar. These bottles are mine!');
    } else if (page == '/floor/1/bedroom') {
	    response.writeHead(200, {"Content-Type": "text/plain"});
        response.write('Hey, this is a private area!');
		response.end();
    } else {

	    var pathName =url.parse(request.url).pathname;
        fs.readFile(__dirname + pathName, function(err, data) {
          if (err) {
              response.writeHead(404, {'Content-type':'text/plain'});
              response.write('Page Was Not Found');
              response.end();
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
