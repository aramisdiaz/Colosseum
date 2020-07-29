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

  insertNewCharacter: function(character_name, callback)
  {
    orm.insertNewCharacter(character_name, function(res)
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