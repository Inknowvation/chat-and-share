/* Starting point of the website:
the var server refers to a separate file with holds the server information
the server.start actually initialises the server
*/

var server = require("./serversetup/server");
var router = require("./serversetup/router");
var logger = require("./serversetup/logger");

console.log("Server index page has fired.");

server.start(router.route,logger.loguserdata);
