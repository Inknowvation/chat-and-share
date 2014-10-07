$(document).ready(function() {

    $('#login').submit(function() {
console.log('my message');
      e.preventDefault();
        $.ajax({


					$.ajax({

						type: 'POST',
						data: JSON.stringify(data),
				        contentType: 'application/json',
                        url: 'http://localhost:8888/login',
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            success: function(data)
            {
            $('#contact_form').html("<div id='message'></div>");
            }
        });

    });

});
