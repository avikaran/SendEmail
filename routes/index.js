var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Welcome to my mail server");
  console.log("trying to send a mail");
  res.render('index');
});

module.exports = router;
