var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser'); // body-parser to parse request body
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

mongoose.connect("mongodb://localhost/test");

var UserModel = require('./dao/user.dao').UserModel;
var server = express();

// serving static files from public folder
server.use(express.static("../public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
server.use(session({secret : "passportjs"}));

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

// Local Strategy
passport.use(new LocalStrategy({
	usernameField: "email",
	passReqToCallback :true
}, function(req, username, password, done){
	UserModel.findOne({_id: username, password: password}, function(err, user){
		if(err){
			return done(err);
		}
		if(!user){
			return done(null, false, req.flash("message", "Invalid credentials !"));
		}
		return done(null, user);
	});
}));

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	UserModel.findById(id, function(err, user){
		done(null, user)
	})
});

server.get("/authFailure", function(req, res){
	res.json({errorCode: 101, message: req.flash("message")[0]});
})

server.post("/login", passport.authenticate("local", {
	failureRedirect: "/authFailure",
	failureFlash : true
}), function(req, res){
	res.json({user: req.user});
});

server.get("/isLoggedIn", function(req, res){
	res.send(req.isAuthenticated()? {code: 1, user: req.user} : {code: 0});
});

server.put("/logout", function(req, res){
	req.logout();
	res.send(200);
});

server.post("/register", function(req, res){
	var newUser = new UserModel({_id: req.body.email, password: req.body.password});

	newUser.save(function(err, user){
		if(err){
			console.log(err);
			res.json({errorCode: 102, message: "Email already exists, Choose another !"});
			return;
		}
		req.login(user, function(err){
			if(err){
				return res.json(null)
			}
			res.json({user: req.user});
		});
		
	});
});

server.listen(process.env.PORT || 3001);
console.log("Server is up and running...");