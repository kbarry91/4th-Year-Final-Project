var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET user page. */
router.get('/:userID',  function(req, res, next) {

    var returnRes;

    validate(req, res, function(result) {
        
        returnRes = result;

        res.render('user', {
            title: returnRes[0].username
        });

    });
    
});

/* Post user page. */
router.post('/', function(req, res, next) {
    
});

// Used to validate user information
function validate(req, res, callback) {

    // Sql command that will be user with the server
    var sql = "SELECT * FROM users WHERE user_id = '" + req.params.userID + "'";
     
    // Sql server conection settings
    var con = mysql.createConnection({
        multipleStatements: true,
        host: "localhost",
        user: "root",
        password: "",
        database: "website"
    });
    
    con.query(sql, function (err, result, fields) {

        if (result.length > 0) {
            callback(result);
        }else{
            // Display fail message if user exsists
            res.send("<p>Failed</p>");
        }
        
    });
}

module.exports = router;