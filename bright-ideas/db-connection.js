const mysql = require('mysql');
const { mySqlConfig } = require('./mysql-config-cp')

var pool = mysql.createPool(mySqlConfig);

pool.getConnection(function (err, connection) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Connected!");

    // Test Connection
    // connection.query("select * from user", function (err, rows) {
    //   connection.release();
    //   if (!err) {
    //     console.log(rows);
    //   }
    // });
  }
});
