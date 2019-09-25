const mysql = require('mysql');
const { mySqlConfig } = require('./mysql-config-cp')
var pool = mysql.createPool(mySqlConfig);

/*************************************************************************** 
TO use DB connection for queries

1. import/require this folder ex. - var { getDB } = require('./db-connection') 

2. Enter a query - getDB.query("select * from users")l

****************************************************************************/
pool.getConnection(function (err, connection) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Connected to DB");

    // // Test Connection
    // connection.query("select * from user", function (err, rows) {
    //   connection.release();
    //   if (!err) {
    //     console.log(rows);
    //   }
    // });
  }
});

let getDB = () => {
    return pool;
}

module.exports = {
    getDB: getDB
}
