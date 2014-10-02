fs = require('fs');
handler = require('./handler');
;

function respondWithHTTPCode(response, code) {
	response.writeHead(code, {'Content-Type': 'text/plain'});
	response.end();
}

	function route(request,pathname, response,postdata) {

	var extension = pathname.split('.').pop();

		if (request.method	== 'GET' && '/' === pathname){
			handler.home(pathname,response);
		}

	 	else if ('html' === extension ||'css' === extension || 'js' === extension) {

				handler.handlestatic(pathname,response);
		}

		else if (request.method	== 'POST' &&   '/login' === pathname){
			hanlder.login(postData);
		}

	else {
			respondWithHTTPCode(response, 404);
		}

}

exports.route = route;
