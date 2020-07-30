var express = require('express');
var router = express.Router();
var colosseum = require('../models/colosseum.js');

router.get('/', function (req, res) 
{
  res.redirect('/index');
});

router.get('/index', function (req, res) 
{
  colosseum.selectAllAttributes(function(data) 
  {
    console.log(data)
    //var hbsObject = Object.values(JSON.parse(JSON.stringify(data)))
    var hbsObject = { colosseum: data };
    res.render('index', hbsObject);
  });



});


router.get('/characterCreate', function (req, res) 
{
  colosseum.selectAllAttributes(function(data) 
  {
    console.log(data)
    //var hbsObject = Object.values(JSON.parse(JSON.stringify(data)))
    var hbsObject = { colosseum: data };
    res.render('characterCreate', hbsObject);
  });



});

router.get('/characterSelect', function (req, res) 
{
    colosseum.selectAllContestants(function(data) 
  {
    console.log(data)
    var hbsObject = { colosseum: data };
    res.render('characterSelect', hbsObject);
  });
  

});

router.get('/battle', function (req, res) 
{
  colosseum.selectAllContestants(function(data) 
  {
    console.log(data)
    var hbsObject = { colosseum: data };
    res.render('battle', hbsObject);
  });

});

router.get('/finalBattle', function (req, res) 
{
  colosseum.selectChamp(function(data) 
  {
    var hbsObject = { colosseum: data };
    res.render('battle', hbsObject);
  });

});

router.post('/characterCreateSubmit', function (req, res) 
{
  console.log(req.params)

  
  /*
  colosseum.insertNewAttributes(attack, defense, vigor, agility)
  colosseum.insertNewCharacter(req.body.character_name, req.body.pic, req.body.attributes_id, req.body.weapon_id, req.body.accessory_id, function() 
  {
    console.log(req.body)
    res.redirect('/battle');
  });*/
});


router.get('/character/select/:id', function (req, res) 
{
  colosseum.selectCharacter(function(data)
  {
    var hbsObject = { colosseum: data };
    res.render('index', hbsObject);
  });
});

router.post('/character/newchamp/:id', function (req, res) 
{
  colosseum.updateNewChamp(req.params.id, function() 
  {
    res.redirect('/index');
  });
});
router.post('/character/oldchamp/:id', function (req, res) 
{
  colosseum.updateDethroned(req.params.id, function() 
  {
    res.redirect('/index');
  });
});

module.exports = router;