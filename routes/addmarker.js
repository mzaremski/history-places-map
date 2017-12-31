var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var dbPassword = require('../dbPassword');
var db = dbPassword()


router.post('/', (req, res) => {
    var body = req.body;
    var placeContent = JSON.stringify(body.placeContent)

    let sql =`insert into markers values(
                NULL,
                "${ body.placeName }",
                "${ body.placeDesc }",
                ${db.escape(placeContent)},
                "${ body.placePictureURL }",
                "${ body.placeWikiURL }",
                ${ body.lat },
                ${ body.lng }
            )`;


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
