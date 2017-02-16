var application_root = __dirname;
var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();

// Database

mongoose.connect('mongodb://localhost/unibookdb');

// Config

app.configure(function () {
  app.use(express.bodyParser());
//  app.use(express.methodOverride());
//  app.use(app.router);
//  app.use(express.static(path.join(application_root, "public")));
//  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
var Schema = mongoose.Schema;  

var User = new Schema({  
    username: { type: String, required:true },  
    password: { type: String, required:true},  
    repassword: { type: String, required:true }
});
var userModel = mongoose.model('User', User);


app.post('/api/signup', function (req, res){
  var user;
  console.log("POST: ");
  console.log(req.body);
  user = new userModel({
    username: req.body.user,
    password: req.body.password,
    repassword: req.body.repassword
  });
  user.save(function (err) {
    if (!err) {
        return console.log('created!');
    } else {
      return console.log(err);
    }
  });
  return res.send(user);
});

app.post('/login',
    passport.authenticate('local'),
    function(req, res){
        res.send('autenticazione avvenuta');
        res.redirect('/profilo/'+ req.user.username);
    });

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

// Launch server

app.listen(4242);
console.log('Listening on port 4242...');