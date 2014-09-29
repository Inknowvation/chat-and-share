/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function start(route,logger) {
  var http = require("http");
  var url = require("url");
  function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname
    logger(request,pathname)
		  request.addListener('data', function () {
        route(request,pathname, response);
		    });
		  request.addListener('end', function () {
        logger(request,pathname)
			  route(request,pathname, response);
		});
	}

	http.createServer(onRequest).listen(8789);
}

exports.start = start;
