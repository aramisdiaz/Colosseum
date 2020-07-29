// require the mysql connection export
var connection = require("./connection.js");

// create orm object with three methods for selecting all data, inserting new data,
// and updating data within database
var orm = {
	// select all method with params for callback function
	selectAll: function(callback) {
    // build query
		var queryString = "SELECT * FROM burgers";
		// log it
		console.log(queryString);
    // connect to mysql with that query, callback results if no error
		connection.query(queryString, function(err, result) {
			if (err) throw err;
			callback(result);
		});
	},
	// insert method with params for values to insert and callback
	// only insert method of this app is to add a new burger with defaul val of false
	// for devoured when user enters burger_name
	insertOne: function(newBurger, callback) {
		// build query
		var queryString = "INSERT INTO burgers (burger_name) VALUES (?)";
		// log it
		console.log(queryString);
		// connect to mysql with that query, callback results if no error
		connection.query(queryString, [newBurger], function(err, result) {
			if (err) throw err;
			callback(result);
		});
	},
	// update method with params for id to update and callback
	// only update of this app is to set devoured to true if button clicked
	updateOne: function(idToUpdate, callback) {
		// build query
		var queryString = "UPDATE burgers SET devoured = true WHERE id = ?";
		// log it
		console.log(queryString);
		// connect to mysql with that query, callback results if no error
		connection.query(queryString, [idToUpdate], function(err, result) {
			if (err) throw err;
			callback(result);	
		});
	}
};

// export the orm for use in the burger.js model
module.exports = orm;