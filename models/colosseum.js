var orm = require('../config/orm.js');

var colosseum = 
{

  selectAllAttributes: function(callback)
  {
    orm.selectAllAttributes(function(res)
    {
      callback(res);
    });
  },

  selectAllContestants: function(callback)
  {
    orm.selectAllContestants(function(res)
    {
      callback(res);
    });
  },

  
  insertNewCharacter: function(character_name, pic, attributes_id, weapon_id, accessory_id, callback)
  {
    orm.insertNewCharacter(character_name, pic, attributes_id, weapon_id, accessory_id, function(res)
    {
      callback(res);
    });
  },

  insertNewAttributes: function(attack, defense, vigor, agility, callback)
  {
    orm.insertNewAttributes(attack, defense, vigor, agility, function(res)
    {
      callback(res);
    });
  },

  selectCharacter: function(character_id, callback)
  {
    orm.selectCharacter(character_id, function(res)
    {
      callback(res);
    });
  },

  updateChamp: function(character_id, callback)
  {
    orm.updateChamp(character_id, function(res)
    {
      callback(res);
    });
  },

  updateDethroned: function(character_id, callback)
  {
    orm.updateDethroned(character_id, function(res)
    {
      callback(res);
    });
  }

};

module.exports = colosseum;