var express = require('express');
var router = express.Router();

function sendMail(To, From, Subject, Message){

  var helper = require('sendgrid').mail;
  var fromEmail = new helper.Email(From);
  var toEmail = new helper.Email(To);
  var subject = Subject;
  var content = new helper.Content('text/plain', Message);
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
/* GET users listing. */
router.post('/', function(req, res, next) {
  //First Lets do validation.
  //Setting rules to validate using req.checkbody
  req.checkBody('to', 'To field can not be empty', 'a').notEmpty();
  req.checkBody('from', 'From field can not be empty').notEmpty();
  req.checkBody('subject', 'subject can not be empty').notEmpty();
  req.checkBody('message', 'message can not be empty').notEmpty();

  //Once rules are set, lets check for errors
  var errors = req.validationErrors() || [];
  console.log("errors", errors);

  if(errors && errors.length){
    //console.log(errors);
    res.render('index', {
      errors,
    });
  }else{
      var To = req.body.to;
      var From = req.body.from;
      var Message = req.body.message;
      var Subject = req.body.subject;
      sendMail(To, From, Subject, Message);
  }
  res.send('Mail Sent');
});

module.exports = router;
