var application_root = __dirname;
var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var passport = require('passport');
var fileUpload = require('express-fileupload');
var mv = require('mv');
lastPostId = 0;

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
    app.use(fileUpload());
//  app.use(express.methodOverride());
//  app.use(app.router);
//  app.use(express.static(path.join(application_root, "public")));
//  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
var Schema = mongoose.Schema;  

var User = new Schema({  
    username: { type: String, required:true, unique:true },  
    password: { type: String, required:true},  
    repassword: { type: String, required:true },
    nome: { type: String, required:true },
    cognome: { type: String, required:true },
    datanascita: { type: String, required:true },
    luogonascita: { type: String, required:true },
    email: { type: String, required:true },
    telefono: { type: Number, required:true }
});
var userModel = mongoose.model('User', User);
var Post = new Schema({
    body: {type: String},
    autore: {type: String},
    like: {type: Number},
    img: {type: String}
//    idimg: {type: Number}
});
var postModel = mongoose.model('Post', Post);
var Comment = new Schema({
    idcomm: {type: String, required:true},
    comm: {type: String, required:true}
});
var commentModel = mongoose.model('Comment', Comment);

var Image = new Schema({
   idpost: {type: Number},
   img: {type: String}
});
var imageModel = mongoose.model('Image', Image);

app.post('/api/signup', function (req, res){
  var user;
  console.log("POST: ");
  console.log(req.body);
  user = new userModel({
    username: req.body.user,
    password: req.body.password,
    repassword: req.body.repassword,
    nome: req.body.nome,
    cognome: req.body.cognome,
    datanascita: req.body.datanascita,
    luogonascita: req.body.luogonascita,
    email: req.body.email,
    telefono: req.body.telefono
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
  var image;
  console.log(req.body.img);
//  if(req.body.img){
//    postModel.find({}).limit(1).sort({$natural: -1}).exec(function(err, post){
//        if(!err){
//            lastPostId = post[0].idimg;
//            lastPostId++;
//            post = new postModel({
//            body: req.body.post,
//            autore: req.body.autore,
//            like: 0,
//            idimg: lastPostId || 0
//          });
//          image = new imageModel({
//             idpost: lastPostId,
//             img: req.body.img
//          });
//          post.save(function (err) {
//            if (!err) {
//                return console.log('created!');
//            } else {
//              return console.log(err);
//            }
//          });
//          image.save(function(err){
//              if(!err){
//        //          return res.send("image stored");
//              } else{
////                  return res.send(err);
//              }
//          });
//          return res.send(post);
//        }
//        else{
//            res.send(err);
//        }
//            });
//  } else{
    post = new postModel({
              body: req.body.post,
              autore: req.body.autore,
              like: 0,
              img: req.body.img || 0
            });
        post.save(function (err) {
          if (!err) {
              return console.log('created!');
          } else {
            return console.log(err);
          }
        });
        return res.send(post);
//  }
});

app.get('/api/posts', function (req, res) {
    postModel.find({}, function (err, docs) {
        if(!err){
            res.json(docs);
        }else{
            res.send(err);
        }
        
    });
});

app.post('/api/profilo', function (req, res){
    var username = req.body.user;
    userModel.find({username: username}, function(err, data){
        if(!err){
            res.send(data);
            return data;
        } else {
            return res.send(err);
        }
    });
});

app.post('/api/like', function (req, res) {
    var id = req.body.id;
    console.log(id);
    postModel.findById(id, function(err, post){
        if(!err){
            post.like++;
            post.save(function (err) {
                if (!err) {
                    return res.send(post.autore);
                } else {
                  return res.send(err);
                }
            });
            console.log(post.like);
        } else{
            console.log(err);;
        }
    });
});

app.post('/api/comment', function (req, res){
  var comment;
  comment = new commentModel({
    idcomm: req.body.idcomm,
    comm: req.body.comm
  });
  console.log(comment);
  comment.save(function (err) {
    if (!err) {
        return res.send('commento salvato');
    } else {
      return res.send(err);
    }
  });
});

app.post('/api/comments', function (req, res) {
    var idAdd = req.body.idAdd;
    commentModel.find({idcomm:idAdd}, function (err, docs) {
        if(!err){
            return res.json(docs);
        }else{
            return res.send(err);
        }
        
    });
});

app.post('/api/upload', function (req, res){
   var buf = Buffer.from(req.body.files, 'base64');
   console.log(buf);
    if(!buf){
       return res.send('Nessun file da caricare');
   } 
   var img = buf;
//   img.mv('/img/filename.jpg', function(err){
//      if(err){
//         return res.send(err); 
//      } 
//      res.send('file caricato');
//   });
});

// Launch server

app.listen(4242);
console.log('Listening on port 4242...');