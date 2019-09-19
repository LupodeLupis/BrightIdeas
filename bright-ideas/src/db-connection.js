var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "yourdatabase",
  multipleStatements: true,
  connectionLimit: 10
});

con.connect(function(err) {
  if (err) {
    console.log(err);
  }
  else{
    console.log("Connected!");
  }
});