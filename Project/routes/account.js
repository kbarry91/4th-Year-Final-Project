var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET user page. */
router.get('/',  function(req, res, next) {

    var status;
    
    if(req.cookies.username != null){
        status = "<a href=\"/account\">Account</a>";
    }
    else{
        res.redirect('/');
    }

    res.render('account', {
        title: req.cookies.username,
        loginStatus: status,
    });

});

/* Post user page. */
router.post('/', function(req, res, next) {
    res.clearCookie("username");
    res.redirect('/');
});

module.exports = router;