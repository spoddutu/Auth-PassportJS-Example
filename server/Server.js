var express = require('express');
var server = express();

// serving static files from public folder
server.use(express.static("../public"));

server.listen(process.env.PORT || 3001);
console.log("Server is up and running...");