const express = require("express");
const app = express();
const path = require("path");
const https = require("https");
const fs = require("fs");

const { getDB } = require('./db-connection')
const HTTP_PORT = process.env.PORT || 8080;
const HTTPS_PORT = 4433; 
const https_options = {
    key: fs.readFileSync(__dirname + "/" + SSL_KEY_FILE),
    cert: fs.readFileSync(__dirname + "/" + SSL_CRT_FILE)
};


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
