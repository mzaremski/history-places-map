var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var dbPassword = require('../dbPassword');
var db = dbPassword()

/* GET users listing. */
router.post('/', function(req, res, next) {
    var body = req.body;

    var markerTypeCondition = ""

    body.type.forEach((i)=>{
         markerTypeCondition += (markerTypeCondition === "") ? ` type="${i}" ` : `OR type="${i}"`
    })

    let sql =  `SELECT id, placeName, type, placePictureURL, lat, lng
                FROM markers
                WHERE ${ markerTypeCondition !== "" ? "(" + markerTypeCondition + ")" : "" }
                ${ markerTypeCondition !== "" ? "AND" : "" }
                placeName LIKE "%${body.placeName}%"`;


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


module.exports = router;
