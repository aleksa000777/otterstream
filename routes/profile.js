var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  if(req.cookies.token){
    res.render('profile');
  } else {
    res.render('index');
  }
});


// ====aleksa staff start=====
router.get('/chat', function(req, res){
  if(req.cookies.token){
      console.log(req.cookies.token===req.user.token);
    res.render('chat');
  } else {
    res.render('index');
  }
});
// =======aleksa staff ends=======

module.exports = router;
