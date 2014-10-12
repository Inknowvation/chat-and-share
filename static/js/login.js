$(document).ready(function() {
    $('#submit').click(function() {
      event.preventDefault();


      var posting = $.post( '/login',    {  username: $("#username").val(), password: $("#password").val()} );

      posting.done(function( data ) {
    var content = data;
    console.log(content);
  });

    });
  });
