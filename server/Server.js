var express = require('express');
var bodyParser = require('body-parser'); // body-parser to parse request body
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/test");

var UserModel = require('./dao/user.dao').UserModel;
var server = express();

// serving static files from public folder
server.use(express.static("../public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

server.post("/login", function(req, res){
	UserModel.find({_id: req.body.email, password: req.body.password}, function(err, user){
		if(err){
			res.json({errorCode: 101, message: "Invalid credentials !"});
			return;
		}
		res.json(user);
	});
});

server.post("/register", function(req, res){
	console.log(req.body);
	var newUser = new UserModel({_id: req.body.email, password: req.body.password});

	newUser.save(function(err, user){
		if(err){
			console.log(err);
			res.json({errorCode: 102, message: "Email already exists, Choose another !"});
			return;
		}
		res.json(user);
	});
});

server.listen(process.env.PORT || 3001);
console.log("Server is up and running...");