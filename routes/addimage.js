var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var dbPassword = require('../dbPassword');
var db = dbPassword()


router.post('/', (req, res) => {
    var body = req.body;

    let sql =`insert into images values(
                "${ body.id }",
                ${ body.datetime },
                "${ body.link }",
                "${body.tags}",
                "${ body.deletehash }"
            )`;


    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
            res.send({isError: true, message: error.sqlMessage});
        }else{
            console.log("Successful query")
            res.send({isError: false, rows})
        }
    })
});


module.exports = router;
