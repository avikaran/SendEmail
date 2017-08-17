function sendMail(){

  var helper = require('sendgrid').mail;
  var fromEmail = new helper.Email('asb150330@utdallas.edu');
  var toEmail = new helper.Email('avikaran23@gmail.com');
  var subject = 'Sending with SendGrid is Fun';
  var content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function (error, response) {
    if (error) {
      console.log('Error response received');
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });

};
