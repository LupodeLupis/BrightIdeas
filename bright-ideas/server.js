const express = require("express");
const app = express();
const path = require("path");

var { getDB } = require('./db-connection')
const HTTP_PORT = process.env.PORT || 8080;

// setup the static folder 
app.use(express.static("dist/bright-ideas")); 

// handle "404" errors
app.use((req, res) => {
    res.sendFile(path.join(__dirname + "/dist/bright-ideas/index.html"));
});

// Start DB connection
getDB;

// Start the server
app.listen(HTTP_PORT, function(){
    console.log("Server listening on port: " + HTTP_PORT);
});
