var connection = require('../config/connection.js')

var orm =
{


	selectAllContestants: function (callback) {
		/*
		SELECT Customers.CustomerName, Orders.OrderID
		FROM characters
		FULL OUTER JOIN weapon ON characters.weapon_id=weapon.id
		FULL OUTER JOIN accessory ON characters.accessory_id=accessory.id
		ORDER BY characters.id;
		*/

		connection.query('SELECT * FROM characters INNER JOIN attributes USING (id);', function (err, result) {
			if (err) throw err;
			callback(result);
		});
	},

	insertNewCharacter: function (character_name, pic, attributes_id, weapon_id, accessory_id, callback) {
		connection.query('INSERT INTO attributes SET ?; INSERT INTO characters SET ?',
			[{

			},
			{
				character_name: character_name,
				pic: pic,
				attributes_id: attributes_id,
				weapon_id: weapon_id,
				accessory_id: accessory_id,
				champ: false,

			}], function (err, result) {
				if (err) throw err;
				callback(result);
			});

	},

	updateNewChamp: function (character_id, callback) {
		connection.query('UPDATE characters SET ? WHERE ?', [{ champ: true }, { id: character_id }],
			function (err, result) {
				if (err) throw err;
				callback(result);
			});
	},
	updateDethroned: function (character_id, callback) {
		connection.query('UPDATE characters SET ? WHERE ?', [{ champ: false }, { id: character_id }],
			function (err, result) {
				if (err) throw err;
				callback(result);
			});
	}
};

module.exports = orm;