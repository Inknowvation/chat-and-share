/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var qs = require('querystring')
 var mongoose = require('mongoose')
  var  User = require('/Users/mathieuvandenmooter/atom/chat-and-share/data/models/user_model.js')
  var  Session = require('/Users/mathieuvandenmooter/atom/chat-and-share/data/models/session_model.js');




function respondWithHTTPCode(response, code) {
	response.writeHead(code, {'Content-Type': 'text/plain'});
	response.end();
}

function home(pathname,response){
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(fs.readFileSync('./static/index.html'));

}

function handlestatic(pathname,response) {


          var staticpathname = './static' + pathname;
          //replace with extention handling function, so that code is not replicated.
          var extension = pathname.split('.').pop(),
           extensionTypes = {
               'css' : 'text/css',
               'gif' : 'image/gif',
               'jpg' : 'image/jpeg',
               'jpeg': 'image/jpeg',
               'js'  : 'application/javascript',
               'png' : 'image/png',
               'html': 'text/html'
           };
          fs.exists(staticpathname, function(exists) {
          if (exists) {
            response.writeHead(200, {'Content-Type': extensionTypes[extension]});
            response.end(fs.readFileSync(staticpathname));
          }
          else {

            respondWithHTTPCode(response, 404);
          }

});
}

function login(postdata,response,request,pathname){
var post = qs.parse(postdata);
var reason = 'fail';

console.log('login reached');
console.log(post);
console.log(post['username']);

User.getAuthenticated(post['username'], post['password'], function(err, user, reason) {
        if (err) throw err;
        // login was successful if we have a user
        if (user) {
          //create session
          console.log('userfound');
          var newsession = new Session({
            sessionid: '12345678',
            sessionname: 'Sessionuser',
            servername: pathname,
            username: post['username'],
            userip:  request.connection.remoteAddress ,
            usersecret: '',
            exprires: ''
          })

      //  newsession.save(function (err) {
      //    console.log(err.message) // something went wrong
      //  });

            // handle login success
            console.log('login success');
            console.log(newsession.sessionid);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(newsession.sessionid);
            return;
        }

        // otherwise we can determine why we failed
        var reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:

            case reasons.PASSWORD_INCORRECT:
                // note: these cases are usually treated the same - don't tell
                // the user *why* the login failed, only that it did
                break;
            case reasons.MAX_ATTEMPTS:
                // send email or otherwise notify user that account is
                // temporarily locked
                break;
        }
    });

}


function checksession(postdata,response){
var post = qs.parse(postdata);
var reason = 'fail';

console.log('check session reached');
console.log(post);
console.log(post['sessionid']);

Session.getSession(post['sessionid'], function(err, session, reason) {
        if (err) throw err;
        // login was successful if we have a user
        if (session) {
          //create session
          console.log('sessionfound');

            // handle session success
            console.log('session success');
            console.log(session.sessionid);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(session);
            return;
        }

    });

}


// Functions which will be available to external callers
exports.home = home;
exports.handlestatic = handlestatic;
exports.login = login;
exports.checksession = checksession;
