var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var dbPassword = require('../dbPassword');

var db = dbPassword()


router.post('/', (req, res) => {
    let sql ='insert into markers values(NULL,"' + req.body.placeName +'","' + req.body.placeDesc + '","' + req.body.placeContent + '","' + req.body.placePictureURL + '","' + req.body.placeWikiURL + '",' + req.body.lat + ',' + req.body.lng + ')';
    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
            res.send({isError: true, message: error.sqlMessage});
        }else{
            //res.json(rows)
            console.log("Successful query")
            res.send({isError: false, rows})
        }
    })
});


module.exports = router;
