var { getDB } = require('./db-connection');

// Get all idea information
async function getAllIdea() {
    getDB().query("SELECT * FROM idea", (err, rows) => {
      if (!err) {
        console.log(rows);
        return rows;
      }
      else {
        console.log("error: " + err);
      }
    });
  }

console.log(getAllIdea());

/*
// Get ideas by idea name column with PARAM: ideaName
async function getIdeaByName(ideaName) {
  getDB().query("SELECT * FROM idea WHERE name = ?", [ideaName], (err, rows) => {
    if (!err) {
      console.log(rows);
      return rows;
    }
    else
      console.log("error: " + err);
  })
}*/

// Get all idea information by id
async function getIdeaByID(id) {
    getDB().query("SELECT * FROM idea WHERE ideaID = ?", [id], (err, rows) => {
      if (!err) {
        console.log(rows);
        return rows;
      }
      else {
        console.log("error: " + err);
      }
    });
}

//console.log(getIdeaByID(31));

module.exports = {
  getAllIdea,
  //getIdeaByName
  getIdeaByID
}