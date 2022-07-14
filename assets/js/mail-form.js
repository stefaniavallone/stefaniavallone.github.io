$('#form-submit').click(function() {
  $('#contact').validate({
            highlight: function(input) {
                $(input).parents('#form-line').addClass('form-error');
            },
            unhighlight: function(input) {
                $(input).parents('#form-line').removeClass('form-success');
            },
            errorPlacement: function(error, element) {
                $(element).parents('#form-line').append(error);
            },
            submitHandler: function(form) {
                //Will execute only when the form passed validation.
                OnSubmit(form);
            }
        });
});


function OnSubmit(form) {
  subject = "Email from: " + $('#name').val();
  fromAddress = $('#from_address').val();
  toAddress = "stefaniaavallone3@gmail.com";
  body =  $('#body-message').val();
  var raw = JSON.stringify({
    "from_address": fromAddress,
    "to_address": "stefaniaavallone3@gmail.com",
    "subject":subject,
    "body": body
  });
  var myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");
  // myHeaders.append("Referer", "http://127.0.0.1:5500/?subject=Stefania+Avallone&from_address=crispogioele%40gmail.com&to_address=stefaniaavallone3%40gmail.com&body=sfd");
  myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36");
  myHeaders.append("Content-Type", "application/json");
  $.ajax({
      url: 'https://email-sender-protected.herokuapp.com/send',
      type: 'POST',
      data: {
          body: raw
      },
      success: function(msg) {
          alert('Email Sent');
          emptyInput();
          return false;
      },
      error: function(){
        console.log("Email error")
      }
    });
}

function emptyInput(){
  $('#name').val("");
  $('#from_address').val("");
  $('#body-message').val("");
}