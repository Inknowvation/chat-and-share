fs = require('fs');
handler = require('./handler');

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

				handler.handlestatic(pathname,response);


}
else {
respondWithHTTPCode(response, 404);
}

}

exports.route = route;
