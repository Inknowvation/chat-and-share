/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {

		var pathname = url.parse(request.url).pathname,
			postData = '';

		request.setEncoding('utf8');

		request.addListener('data', function (postDataChunk) {
			postData += postDataChunk;
                        
		});

		request.addListener('end', function () {
			route(request,pathname, response,postDataxs);
		});
	}

	http.createServer(onRequest).listen(8888);
}

exports.start = start;