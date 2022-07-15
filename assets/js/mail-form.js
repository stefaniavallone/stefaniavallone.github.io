function sendMail() {
  subject = "Email from: " + $('#name').val();
  fromAddress = $('#from_address').val();
  toAddress = "stefaniaavallone3@gmail.com";
  body =  $('#body-message').val();

  if (fromAddress != "" && fromAddress.includes("@") && subject != "" && body != "" ){
    $(".spinner-border").show();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Referer", "http://127.0.0.1:5500/?subject=Stefania+Avallone&from_address=crispogioele%40gmail.com&to_address=stefaniaavallone3%40gmail.com&body=sfd");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36");
    myHeaders.append("Content-Type", "application/json");
    
  var raw = JSON.stringify({
      "from_address": fromAddress,
      "to_address": "stefaniaavallone3@gmail.com",
      "subject":subject,
      "body": body
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    
    fetch("https://email-sender-protected.herokuapp.com/send", requestOptions)
        .then(response => response.text())
        .then(data => modal("Your email has been sent successfully"))
        .catch(error => {
          modal("There was a problem sending your email. Try later, please!")
      })
    }
}
function modal(text, img){
  $(".spinner-border").hide();
  $("#modalMail .modal-title").html(text);
  $('#modalMail').modal('show');
  setTimeout(function () {
        $('#modalMail').modal('hide');
      }, 3000);
  $('#contact')[0].reset();
}