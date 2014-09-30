fs = require('fs');

function respondWithHTTPCode(response, code) {
	response.writeHead(code, {'Content-Type': 'text/plain'});
	response.end();
}

function route(request,pathname, response,postData) {

	var extension = pathname.split('.').pop();

	 if ('html' === extension ||'css' === extension || 'js' === extension) {
		   var extension = pathname.split('.').pop(),
        extensionTypes = {
            'css' : 'text/css',
            'gif' : 'image/gif',
            'jpg' : 'image/jpeg',
            'jpeg': 'image/jpeg',
            'js'  : 'application/javascript',
            'png' : 'image/png',
						'html': 'text/html'
        };

				var staticpathname = './static' + pathname;

				fs.exists(staticpathname, function(exists) {
    		if (exists) {

					response.writeHead(200, {'Content-Type': extensionTypes[extension]});
					response.end(fs.readFileSync(staticpathname));
    		}
				else {
					console.log('test');
					respondWithHTTPCode(response, 404);
				}
				});

}
else {
respondWithHTTPCode(response, 404);
}

}

exports.route = route;
