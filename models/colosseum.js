// require orm
var orm = require("../config/orm.js");

// code which calls orm functions but specific to the burgers
var burger = {
	// call the select all method
	selectAll: function(cb) {
		orm.selectAll(function(results) {
			cb(results);
		});
	},
	// call the insert method
	insertOne: function(name, cb) {
		orm.insertOne(name, cb);
	},
	// call the update method
	updateOne: function(id, cb) {
		orm.updateOne(id, cb);
	}
};

// export for use in the controller file
module.exports = burger;