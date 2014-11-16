// Waarom moet dit niet in variabelen ?

fs = require('fs');
handler = require('./handler');

/* What follows here is the description of every route that is allowed
	A route depends on a request from a certain pathname
	A route describes the reponse and the data that is needed to form this reponse
	A route usually redirects to a handler*/

	function route(request,pathname, response,postdata) {

// splitting a string on the dot sign into an array and return the last element
	var extension = pathname.split('.').pop();

// from the request we can get a certain method, two options : GET and POST
// the first route routes everything to the homepage if no extension is specifieds
		if (request.method	=== 'GET' && '/' === pathname){
			handler.home(pathname,response);
			console.log('/');
		}

// the second route sends everything that ends with html, css or js through to the handlestatic
		else if (request.method === 'GET' && ('html' === extension ||'css' === extension || 'js' === extension)) {
				handler.handlestatic(pathname,response);
		}

// the third route is a POST where the user dumps data towards the server on the login page
		else if (request.method === 'POST' &&   '/login' === pathname){
				handler.login(postdata,response,request,pathname);
		}

// everthing else is blocked with a 404
		else {
			handler.respondWithHTTPCode(response, 404);
		}

}

exports.route = route;
