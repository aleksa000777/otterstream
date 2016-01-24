var express = require('express');
var AWS     = require('aws-sdk');
var crypto  = require('crypto');
var mime    = require('mime');

// ===========aleksa ===============
var accessKeyId = process.env.ACCESSKEYID;
var secretAccessKey = process.env.SECRETACCESSKEY

// set configu=ration by our zone and set key to access
AWS.config.region = 'us-east-1';
AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

// get access to my amazon bucket to store images
var s3 = new AWS.S3();
const S3_BASE_URL = 'https://s3.amazonaws.com/otterstream/'
var router = express.Router();

var Otter = require('../../models/otter');


router.get('/', function(req, res){
  Otter.find({}, function(err, otters) {
    res.json({ Otter: otters });
  });
});

router.get('/profile', function(req, res){
  console.log(req);
  Otter.findOne({ id: req.user._id }, function(err, otter) {
    res.json({ Otter: otter });
  });
});

router.post('/', function(req, res){
  if (!req.body.img) {
    //if image not upload give random avatar
    var imageRandom = 'http://api.adorable.io/avatar/'+req.body.name+req.body.lastname
  }
  // return res.status(400).send("Image not part of upload");
  //make magic staff to write in amazon bucket
  //get out the first part of name when it's encode in base 64 format
  var image = req.body.img;
  var meta = image.split(";")[0];
  var mimeT = meta.replace('data:','');
  image = image.replace(/^data:image\/png;base64,/, "");
  image = image.replace(/^data:image\/jpeg;base64,/, "");
  image = image.replace(/^data:image\/jpg;base64,/, "");

  var newFile = new Buffer(image, 'base64');
  var fileSize = newFile.length;
  var fileName = req.body.name;
  var ext = "."+mime.extension(mimeT);

//create random name to store images
  crypto.randomBytes(10, function(err,buf){
    var randFilename = buf.toString('hex');
    var finalFilename = randFilename + ext;

//params of bucket in amazon
    var params = {
      Bucket: "otterstream",
      Key: finalFilename,
      Body: newFile,
      ACL: "public-read"
    }
    s3.upload(params, function(err, data) {
      console.log("      err",err);
      if (err) return res.status(400).send("Could not save image");


      var otter = new Otter({
        name: req.body.name,
        lastname: req.body.lastname,
        bday: req.body.bday,
        zodiac: req.body.zodiac,
        bloodtype: req.body.bloodtype,
        placeOfBirth: req.body.placeOfBirth,
        currentCity: req.body.currentCity,
        favoriteBook: req.body.favoriteBook,
        favoriteSong: req.body.favoriteSong,
        favoriteMovie: req.body.favoriteMovie,
        favoriteFood: req.body.favoriteFood,
        favoriteTvShow: req.body.favoriteTvShow,
        gender: req.body.gender,
        gitHub: req.body.gitHub,
        linkedIn: req.body.linkedIn,
        website: req.body.website,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        tumblr: req.body.tumblr,
        languages: req.body.languages,
        coding: req.body.coding,
        group: req.body.group,
        graduate: req.body.graduate,
        bio: req.body.bio,
        img: imageRandom || S3_BASE_URL + finalFilename
      });
      otter.id = req.user._id;
      otter.save(function(err, dbOtter){
        console.log(dbOtter + "saved");
        console.log(err);
        if(err) return res.status(400).send("Could not save record");

        res.json(dbOtter);
      });
    });
  });
});


router.post('/projects', function(req, res){
  var projectData = req.body.projectData || {};
  Otter.findOne({ id: req.user._id }, function(err, dbOtter){
    var project = dbOtter.projects.push(projectData);
    dbOtter.save(function(err){
      res.json(projectData);
    });
  });
});

router.post('/blogs', function(req, res){
  var blogData = req.body.blogData || {};
  Otter.findOne({ id: req.user._id }, function(err, dbOtter){
    var blog = dbOtter.blogs.push(blogData);
    dbOtter.save(function(err){
      res.json(blogData);
    });
  });
});

//======aleksa staff ends===========

module.exports = router;
