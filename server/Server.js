var server = require('express')();

server.get('/', function(req, res){
	res.send("Default GET request");
});

server.listen(process.env.PORT || 3001);
console.log("Server is up and running...");