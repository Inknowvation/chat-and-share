/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function start(route,logger) {
  var http = require("http");
  var url = require("url");
  var config = require('./config');
  //postdata = '';
  function onRequest(request, response) {

		var pathname = url.parse(request.url).pathname
    var postdata = '';
    request.setEncoding("utf8");

    logger(request,pathname)

		request.addListener('data', function (postDataChunk) {

      postdata += postDataChunk;
      console.log(postdata);
      //if (postdata.length > 1e6){
        //        req.connection.destroy();
          //    }

      });

		  request.addListener('end', function () {
			  route(request,pathname, response,postdata);

		});
	}

	http.createServer(onRequest).listen(config.port);
}

exports.start = start;
