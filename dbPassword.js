const mysql = require('mysql');

module.exports = function(){
    const db = mysql.createConnection({
        host     : 'localhost',
        user     : 'historyMap',
        password : 'admin',
        database : 'historyMap'
    });
    //console.log(dbPassword.dbPassword)
    //dbPassword.dbPassword do zmiany

    // Connect
    db.connect((err) => {
        if(err){
            console.error("START XAMPP !!!")
            throw err;
        }
    });

    return db
}

// exports.dbPassword = {
//     host     : 'localhost',
//     user     : 'historyMap',
//     password : 'admin',
//     database : 'historyMap'
// };
