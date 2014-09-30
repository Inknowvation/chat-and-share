/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
            // handler needs to be put here still to do
            response.writeHead(200, {'Content-Type': extensionTypes[extension]});
            response.end(fs.readFileSync(staticpathname));
          }
          else {
            // handler to deal zith invalid pathname
            console.log('test');
            respondWithHTTPCode(response, 404);
          }

});
}



// Functions which will be available to external callers
exports.handlestatic = handlestatic;
