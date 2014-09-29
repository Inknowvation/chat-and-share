/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var server = require("./serversetup/server");
var router = require("./serversetup/router");
var logger = require("./serversetup/logger");

console.log("Server index page has fired.");

server.start(router.route,logger.loguserdata);
