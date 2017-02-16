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
  app.use(express.session({
    cookieName: 'session',
    secret: 'loredicola',
    duration: 30 * 60 * 1000,
    sctiveDuration: 50 * 60 * 1000,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
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
var Post = new Schema({
    body: {type: String, required:true}
});
var postModel = mongoose.model('Post', Post);

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

app.post('/api/login', function (req, res, next) {
   var username = req.body.user;
   var password = req.body.password;

   userModel.findOne({username: username, password: password}, function(err, user) {
      if(err) return next(err);
      if(!user) return res.send('Not logged in!');
      req.session.user = username;
      return res.send('Logged In!');
   });
});
app.post('/api/newpost', function (req, res){
  var post;
  console.log("POST: ");
  console.log(req.body);
  post = new postModel({
    body: req.body.post
  });
  post.save(function (err) {
    if (!err) {
        return console.log('created!');
    } else {
      return console.log(err);
    }
  });
  return res.send(post);
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

// Launch server

app.listen(4242);
console.log('Listening on port 4242...');