/* The actual server
When the server is started, the config is read and the port is assigned.
With every request the server passes as message to the logger.
The server passes every request to the router.
The server also checks whether the connection to the mongodb is successful.
To be checked: it seems that the server is initiated at every request.*/


function start(route,logger) {
  var http = require("http");
  var url = require("url");
  var config = require('./config');
  //postdata = '';
  var mongoose = require('mongoose');

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

//Commented because need to figure out how to send info to client when login attempt was succesfull

  var connStr = 'mongodb://localhost:27017/test';
  mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
    });

}

exports.start = start;
