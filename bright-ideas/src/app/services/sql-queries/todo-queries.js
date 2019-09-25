var { getDB } = require('./db-connection');

// Need todo name

// Get all todo information
async function getAllToDo() {
    getDB().query("SELECT * FROM todo", (err, rows) => {
      if (!err) {
        console.log(rows);
        return rows;
      }
      else {
        console.log("error: " + err);
      }
    });
  }

console.log(getAllToDo());

// Get all todo by name
// async function getToDoByName(name) {
//     getDB().query("SELECT * FROM todo WHERE name = ?",[name], (err, rows) => {
//       if (!err) {
//         console.log(rows);
//         return rows;
//       }
//       else {
//         console.log("error: " + err);
//       }
//     });
//   }

// console.log(getToDoByName(name));

//

//Get todo by id
async function getToDoByID(id) {
    getDB().query("SELECT * FROM todo WHERE toDoID = ?",[id], (err, rows) => {
      if (!err) {
        console.log(rows);
        return rows;
      }
      else {
        console.log("error: " + err);
      }
    });
  }

console.log(getToDoByID(5));

module.exports = {
    getAllToDo,
    //getToDoByName,
    getToDoByID
}

