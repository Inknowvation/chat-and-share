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


$(function(){
var sessionid=getCookie("sessionid");
  if (sessionid!="") {
     var posting = $.post( '/session' ,{sessionidvalue: sessionid} );
     posting.done(function( data ) {
     var content = data;
     });
     }
  else{
    window.location.replace("/");
     }
});



//function eraseCookie(name) {
//    createCookie(name,"",-1);
//}
