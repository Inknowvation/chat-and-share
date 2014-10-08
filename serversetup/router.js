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
			console.log('succes');
		}

	 	else if (request.method	== 'GET' && ('html' === extension ||'css' === extension || 'js' === extension)) {
				handler.handlestatic(pathname,response);
		}

		else if (request.method	== 'POST' &&   '/login' === pathname){
				handler.login(postdata,response);
		}

	else {
			respondWithHTTPCode(response, 404);
		}

}

exports.route = route;
