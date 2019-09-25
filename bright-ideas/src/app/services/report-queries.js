var { getDB } = require('./db-connection');

// Need todo name

// Get all todo information
async function getAllReport() {
    getDB().query("SELECT * FROM report", (err, rows) => {
      if (!err) {
        console.log(rows);
        return rows;
      }
      else {
        console.log("error: " + err);
      }
    });
}

console.log(getAllReport());

//Get report by reportID
async function getReportByReportID(id) {
    getDB().query("SELECT * FROM report WHERE reportID = ?",[id], (err, rows) => {
      if (!err) {
        console.log(rows);
        return rows;
      }
      else {
        console.log("error: " + err);
      }
    });
}

console.log(getReportByReportID(1));

//get report by flaggedIdea ID
async function getReportByFlaggedIdea(id) {
    getDB().query("SELECT * FROM report WHERE flaggedIdea = ?",[id], (err, rows) => {
      if (!err) {
        console.log(rows);
        return rows;
      }
      else {
        console.log("error: " + err);
      }
    });
}

console.log(getReportByFlaggedIdea(1));

//get report by flaggedUser ID
async function getReportByFlaggedUser(id) {
    getDB().query("SELECT * FROM report WHERE flaggedUser = ?",[id], (err, rows) => {
      if (!err) {
        console.log(rows);
        return rows;
      }
      else {
        console.log("error: " + err);
      }
    });
}

console.log(getReportByFlaggedUser(31));

module.exports = {
    getAllReport,
    getReportByReportID,
    getReportByFlaggedIdea,
    getReportByFlaggedUser
}

