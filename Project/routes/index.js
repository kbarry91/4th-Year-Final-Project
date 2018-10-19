var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var status;
  var user;

  if(req.cookies.username != null){
    status = "<a href=\"/account\">Account</a>";
    user = req.cookies.username;
  }
  else{
    status = "<a href=\"/login\">Login</a>";
    user = "Guest";
  }

  res.render('index', { 
    title: 'Homepage',
    name: user,
    loginStatus: status,
  });
});

module.exports = router;