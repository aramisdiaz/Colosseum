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
    var contestantAttributeArray = Object.values(JSON.parse(JSON.stringify(data)))
    
    var hbsObject = { colosseum: data };
    res.render('index', hbsObject);
  });



});

router.get('/index', function (req, res) 
{
    colosseum.selectAllContestants(function(data) 
  {
    console.log(data)
    var hbsObject = { colosseum: data };
    res.render('index', hbsObject);
  });
  

});

router.get('/index', function (req, res) 
{
  colosseum.selectChamp(function(data) 
  {
    var hbsObject = { colosseum: data };
    res.render('index', hbsObject);
  });

});

router.post('/character/create', function (req, res) 
{
  colosseum.insertNewCharacter(req.body.character_name, function() 
  {
    res.redirect('/index');
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