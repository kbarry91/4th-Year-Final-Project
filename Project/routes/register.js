var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {

    var status;
    
    if(req.cookies.username != null){

        res.redirect('/account');
    }
    else{
        status = "<a href=\"/login\">Login</a>";
    }

    res.render('register', {
        loginStatus: status,
    });
});

/* Post register page. */
router.post('/', validate, function(req, res, next) { 
    var name = req;
});

// Used to validate user information
function validate(req, res) {

    // Sql command that will be user with the server
    var sql = "INSERT INTO users (username, password, signup_date) VALUES ('" + req.body.username + "', '" + req.body.password + "', curdate())";

    // Sql server conection settings
    var con = mysql.createConnection({
        multipleStatements: true,
        host: "localhost",
        user: "root",
        password: "",
        database: "website"
    });

    // Tries to use insert sql command using the connection to the sql server.
    // If and error is encountered it most likely mean the user already exsists
    con.query(sql, function (err, result, fields) {
        if (err) {
            // Display fail message if user exsists
            res.send("<p>Failed</p>");
        }else{
            // Redirect users if registering attempt is successful
            res.cookie('username', req.body.username).send(res.redirect('/'));
        }
    });
    
}

module.exports = router;