var { getDB } = require('./db-connection');

// Get all user information
async function getAllUsers() {
  getDB().query("SELECT * FROM user", (err, rows) => {
    if (!err) {
      console.log(rows);
      return rows;
    }
    else {
      console.log("error: " + err);
    }
  });
}

// Get all users by emailAddress column with PARAM: email
async function getUserByEmail(email) {
  getDB().query("SELECT * FROM user WHERE emailAddress = ?", [email], (err, rows) => {
    if (!err) {
      console.log(rows);
      return rows;
    }
    else
      console.log("error: " + err);
  })
}

module.exports = {
  getAllUsers,
  getAllUsers
}