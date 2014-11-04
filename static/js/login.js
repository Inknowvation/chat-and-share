function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    console.log('debug');
}

$(document).ready(function() {
    $('#submit').click(function() {
      event.preventDefault();
      var posting = $.post( '/login',    {  username: $("#username").val(), password: $("#password").val()} );
      posting.done(function( data ) {
      var content = data;
      console.log(content + 'returnedsessionlogin');
      createCookie('sessionid',data,1);
      console.log(content);
    });
  });
});
