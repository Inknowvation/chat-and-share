
function loguserdata(request,pathname) {
  var url = require("url");
  var util = require('util');

    console.log("User request fired");
    console.log(pathname);
    console.log(util.inspect(request.headers))
    console.log(request.url);
    console.log(request.connection.remoteAddress)
    console.log(request.headers['x-forwarded-for'] ||
     request.connection.remoteAddress ||
     request.socket.remoteAddress ||
     request.connection.socket.remoteAddress);


var log = fs.createWriteStream('./serverlog/log.txt', {'flags': 'a'});
// use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
log.write("User request fired"+ '\r\n');
log.write(pathname);
log.write('timestamp: ' + new Date().toString()+ '\r\n');
log.write('userstamp: ' + util.inspect(request.headers)+ '\r\n');
log.write('ip :' + (request.headers['x-forwarded-for'] ||
 request.connection.remoteAddress ||
 request.socket.remoteAddress ||
 request.connection.socket.remoteAddress) + '\r\n');
log.write('--------------------------------' + '\r\n');

  }

  exports.loguserdata = loguserdata;
