var mysql = require('mysql');

var pool = mysql.createPool({
  host: "mymysql.senecacollege.ca",
  user: "user",
  password: "password",
  database: "database",
  connectionLimit: 10
});

pool.getConnection(function (err, connection) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Connected!");

    // Test Connection
    connection.query("select * from user", function (err, rows) {
      connection.release();
      if (!err) {
        console.log(rows);
      }
    });
  }
});
