// require mysql npm package
require('dotenv').config()
var mysql = require("mysql");
var connection;

// if jaws db is present, connect to jaws db, otherwise connect to local mysql db
if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
		host: process.env.host, 
		user: process.env.user,
		password: process.env.password,
		database: process.env.database,
	});
};

// connect to database, throw error if error, otherwise log the connection id
connection.connect(function(err) {
	if (err) {
		console.error("error connecting to database: " + err.stack);
		return;
	}
	console.log("connected to database as id " + connection.threadId);
});

// export connection for use in orm
module.exports = connection;