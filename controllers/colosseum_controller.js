var express = require('express');
var router = express.Router();
var colosseum = require('../models/colosseum.js');



router.get('/', function (req, res) {
  res.redirect('/index');
});

router.get('/index', function (req, res) {
  colosseum.selectAllContestants(function (data) {
   
    var hbsObject = { colosseum: data };
    var contestants = Object.values(JSON.parse(JSON.stringify(data)))
    console.log(Object.values(JSON.parse(JSON.stringify(data))))
    res.render('index', hbsObject);
  });



});


router.post('/newChamp:id', function (req, res) {

  colosseum.insertNewCharacter(req, function () {
    var reqBody= JSON.parse(req.body);
    console.log(reqBody)
   
  });

});


module.exports = router;