var { getDB } = require('./db-connection');


async function getAllUsers() {
    getDB().query("select * from user", (err, rows) => {
       if (!err) {
         console.log(rows);
       }
     });
 }