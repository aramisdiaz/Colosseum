var express = require('express');
var router = express.Router();
var colosseum = require('../models/colosseum.js');



router.get('/', function (req, res) {
  res.redirect('/index');
});

router.get('/index', function (req, res) {
  colosseum.selectAllContestants(function (data) {
   
    //var hbsObject = Object.values(JSON.parse(JSON.stringify(data)))
    var hbsObject = { colosseum: data };
    var contestants = Object.values(JSON.parse(JSON.stringify(data)))
    console.log(Object.values(JSON.parse(JSON.stringify(data))))
    res.render('index', hbsObject);
  });



});


router.get('/characterCreate', function (req, res) {
  colosseum.selectAllAttributes(function (data) {
    

    var contestantArray = Object.values(JSON.parse(JSON.stringify(data)))
    console.log(contestantArray)
    var hbsObject = { colosseum: data };
    res.render('characterCreate', hbsObject, contestantArray);
  });



});


router.get('/battle', function (req, res) {
  colosseum.selectAllContestants(function (data) {
    console.log(data)
    var hbsObject = { colosseum: data };
    res.render('battle', hbsObject);
  });

});

router.get('/finalBattle', function (req, res) {
  colosseum.selectChamp(function (data) {
    var hbsObject = { colosseum: data };
    res.render('battle', hbsObject);
  });

});

router.post('/characterCreateSubmit', function (req, res) {

  colosseum.insertNewCharacter(req, function () {
    var reqBody= JSON.parse(req.body);
    console.log(reqBody)
   
  });

  /*
  colosseum.insertNewAttributes(attack, defense, vigor, agility)
  colosseum.insertNewCharacter(req.body, function() 
  {
    console.log(req.body)
    res.redirect('/battle');
  });
  */
});


router.get('/character/select/:id', function (req, res) {
  colosseum.selectCharacter(function (data) {
    var hbsObject = { colosseum: data };
    res.render('index', hbsObject);
  });
});

router.post('/character/newchamp/:id', function (req, res) {
  colosseum.updateNewChamp(req.params.id, function () {
    res.redirect('/index');
  });
});
router.post('/character/oldchamp/:id', function (req, res) {
  colosseum.updateDethroned(req.params.id, function () {
    res.redirect('/index');
  });
});

module.exports = router;