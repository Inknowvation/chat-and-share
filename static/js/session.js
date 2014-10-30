function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function checkCookie() {
 var sessionid=getCookie("sessionid");
 if (sessionid!="") {
     console.log('gotcookie');
 }else{
   console.log('didnotgetcookie');
     var posting = $.post( '/admin.html');
     posting.done(function( data ) {
     var content = data;

createCookie('sessionid',content,1);

   console.log(content);
   });
 }
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

$(function(){
  console.log('document');
  checkCookie() ;
});
