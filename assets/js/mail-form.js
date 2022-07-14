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
  
  var myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");
  // myHeaders.append("Referer", "http://127.0.0.1:5500/?subject=Stefania+Avallone&from_address=crispogioele%40gmail.com&to_address=stefaniaavallone3%40gmail.com&body=sfd");
  myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36");
  myHeaders.append("Content-Type", "application/json");
  $.ajax({
      url: 'https://email-sender-protected.herokuapp.com/send',
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: {
          body: JSON.stringify({
            "from_address": fromAddress,
            "to_address": "stefaniaavallone3@gmail.com",
            "subject":subject,
            "body": body
          }),
      },
      success: function(msg) {
          $("#modalMail").text('Your email has been sent sucessfully');
          $("#modalMail").modal('show');
          $('#contact')[0].reset();
          table_data.ajax.reload(null, false);
          return false;
      },
      error: function(){
        $("#modalMail").text('There were problems with your email. Try again later please!');
        $("#modalMail").modal('show');
      }
    });
}
