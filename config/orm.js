var connection = require('../config/connection.js')

var orm =
{

	selectAllAttributes: function (callback) {
		connection.query('SELECT * FROM attributes', function (err, result) {
			if (err) throw err;
			callback(result);
		});
	},

	selectAllContestants: function (callback) {
		connection.query('SELECT * FROM characters', function (err, result) {
			if (err) throw err;
			callback(result);
		});
	},

	insertNewCharacter: function (character_name, pic, attributes_id, weapon_id, accessory_id, callback) {
		connection.query('INSERT INTO characters SET ?',
			{
				character_name: character_name,
				pic: pic,
				attributes_id: attributes_id,
				weapon_id: weapon_id,
				accessory_id: accessory_id,
				champ: false,
				
			}, function (err, result) {
			if (err) throw err;
			callback(result);
		});

	},

	updateNewChamp: function (character_ID, callback) {
		connection.query('UPDATE characters SET ? WHERE ?', [{ champ: true }, { id: character_ID }],
			function (err, result) {
				if (err) throw err;
				callback(result);
			});
	},
	updateDethroned: function (character_ID, callback) {
		connection.query('UPDATE characters SET ? WHERE ?', [{ champ: false }, { id: character_ID }],
			function (err, result) {
				if (err) throw err;
				callback(result);
			});
	}
};

module.exports = orm;