// //******************FOR LOCAL DEV****************** */


// const express = require("express");
// const app = express();
// const path = require("path");
// const http = require("http");
// // const https = require("https");
// // const fs = require("fs");

// const HTTPS_PORT = process.env.PORT || 10034;

// // const key = fs.readFileSync('/root/cert/prj666-2021.key');
// // const cert = fs.readFileSync( '/root/cert/prj666-2021.crt' );
// // const ca = fs.readFileSync( '/root/cert/RapidSSL_RSA_CA_2018.crt' );

// // const options = {
// //     key: key,
// //     cert: cert,
// //     ca: ca
// //   };

// // setup the static folder 
// app.use(express.static("dist/bright-ideas")); 

// // handle "404" errors
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname + "/dist/bright-ideas/index.html"));
// });


// // Start the server
// http.createServer(app).listen(HTTPS_PORT, () => {
//     console.log("Server listening on port: " + HTTPS_PORT);
// });
