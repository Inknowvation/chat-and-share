/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var qs = require('querystring')
 var mongoose = require('mongoose'),
    User = require('/Users/mathieuvandenmooter/atom/chat-and-share/data/models/user_model.js');




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

function login(postdata){


console.log(postdata);
var post = qs.parse(postdata);
console.log(post);
console.log(post['user[name]']);
console.log(post['user[password]']);




// create a user a new user
var SaveUser = new User({
    username: post['user[name]'],
    password: post['user[password]']
});

// save user to database
SaveUser.save(function(err) {
    if (err) throw err;

// fetch user and test password verification
User.findOne({ username: post['user[name]'] }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword(post['user[password]'], function(err, isMatch) {
        if (err) throw err;
        console.log(post['user[password]'], isMatch);
    });

    // test a failing password
    user.comparePassword(post['user[password]'], function(err, isMatch) {
        if (err) throw err;
        console.log(post['user[password]'], isMatch);
    });
});

});

}



// Functions which will be available to external callers
exports.home = home;
exports.handlestatic = handlestatic;
exports.login = login;
