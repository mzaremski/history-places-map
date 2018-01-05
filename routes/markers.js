var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var dbPassword = require('../dbPassword');

var db = dbPassword()

/* GET users listing. */
router.get('/all', function(req, res, next) {
    let sql = `SELECT id, placeName, type, placePictureURL, lat, lng  FROM markers`;
    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
            //db.end()
        }else{
            res.json(rows)
            console.log("Successful query")
            //db.end()
        }
    })
});

router.get('/:id', function(req, res, next) {
    let sql = `SELECT * FROM markers WHERE id=${req.params.id}`;
    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
            //db.end()
        }else{
            res.json(rows)
            //db.end()
            console.log("Successful query")
        }
    })
});


module.exports = router;
