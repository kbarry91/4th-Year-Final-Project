var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {

    var status;
    
    if(req.cookies.username != null){

        res.redirect('/account');
    }
    else{
        status = "<a href=\"/login\">Login</a>";
    }

    res.render('login', {
        loginStatus: status,
    });
});

/* Post login page. */
router.post('/', validate, function(req, res, next) { 
    var name = req;

    console.log(name.body.username + "\n" + name.body.password)
});

// Used to validate user information
function validate(req, res) {

    // Sql command that will be user with the server
    var sql = "SELECT * FROM users WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "'";

    // Sql server conection settings
    var con = mysql.createConnection({
        multipleStatements: true,
        host: "localhost",
        user: "root",
        password: "",
        database: "website"
    });
    
    con.query(sql, function (err, result, fields) {
        console.log(result)
        if (result.length > 0) {
            // Redirect users if registering attempt is successful
            res.cookie('username', req.body.username).send(res.redirect('/'));
        }else{
            // Display fail message if user exsists
            res.send("<p>Failed</p>");
        }
    });
}

module.exports = router;