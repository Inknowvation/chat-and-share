fs = require('fs');

function respondWithHTTPCode(response, code) {
	response.writeHead(code, {'Content-Type': 'text/plain'});
	response.end();
}

function route(request,pathname, response,postData) {

	var extension = pathname.split('.').pop();

	if ('/' === pathname) {
             response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(fs.readFileSync('./static' + '/index.html'));
                
               
	} else if ('css' === extension || 'js' === extension) {
		   var extension = pathname.split('.').pop(),
        extensionTypes = {
            'css' : 'text/css',
            'gif' : 'image/gif',
            'jpg' : 'image/jpeg',
            'jpeg': 'image/jpeg',
            'js'  : 'application/javascript',
            'png' : 'image/png'
        };
    
    response.writeHead(200, {'Content-Type': extensionTypes[extension]});
    response.end(fs.readFileSync('./static' + pathname));
	} else {
		respondWithHTTPCode(response, 404);
	}
}

exports.route = route;