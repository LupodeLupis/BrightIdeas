var { getDB } = require('./db-connection');

// Get all profile
async function getAllProfile() {
    getDB().query("SELECT * FROM profile", (err, rows) => {
      if (!err) {
        console.log(rows);
        return rows;
      }
      else {
        console.log("error: " + err);
      }
    });
  }

console.log(getAllProfile());

// Get profile by the display name
async function getProfileByName(displayName) {
    getDB().query("SELECT * FROM profile WHERE profileDisplayName = ?",[displayName], (err, rows) => {
      if (!err) {
        console.log(rows);
        return rows;
      }
      else {
        console.log("error: " + err);
      }
    });
  }

console.log(getProfileByName("Martin Kelvin"));

module.exports = {
    getAllProfile,
    getProfileByName
}