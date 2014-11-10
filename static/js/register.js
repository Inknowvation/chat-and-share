$(document).ready(function() {
    $('#submituser').click(function() {
      event.preventDefault();
      var posting = $.post( '/createuser',    {  username: $("#username").val(), password: $("#password").val()} );
      posting.done(function( data ) {
      var content = data;
      window.location.replace("/succes");
      console.log('usercreated');
    });
  });
});
