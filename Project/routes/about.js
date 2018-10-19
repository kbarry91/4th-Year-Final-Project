var express = require('express');
var router = express.Router();

var vd = require('../videodata.json');

/* GET about page. */
router.get('/', function(req, res, next) {

    var status;

    if(req.cookies.username != null){
        status = "<a href=\"/account\">Account</a>";
        user = req.cookies.username;
    }
    else{
        status = "<a href=\"/login\">Login</a>";
        user = "Guest";
    }

    res.render('about', {
        title: 'About',
        name: 'login',
        videodata: vd,
        loginStatus: status,
    });
});

/* Post about page. */
router.post('/', function(req, res, next) {
    var name = req;

    console.log(name.body.name_field);
    res.redirect('/about')
});

module.exports = router;