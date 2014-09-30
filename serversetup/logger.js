
function loguserdata(request,pathname) {
// retrieve util package thisis needed to be able to contact header
  var util = require('util');

// create write file stream
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
log.end();

  }

  exports.loguserdata = loguserdata;
