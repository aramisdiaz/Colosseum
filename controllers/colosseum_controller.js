// require express npm package and burger.js model
var express = require("express");
var burger = require("../models/burger.js");

// set up express router
var router = express.Router();

// get route for burgers/main page
router.get("/", function(req, res) {
	// using select all burger model to call mysql for getting all info
	burger.selectAll(function(burgerInfo) {
		// sends the callback info to index handlebars in an object with property burgers
		res.render("index", {burgers: burgerInfo});
	});
});

// post route for new burgers
router.post("/burgers/new", function(req, res) {
	// insert burger function from model with req body as burger name and call back 
	// the data to log and redirect back home
	burger.insertOne(req.body.burger_name, function(data) {
		console.log(data);
		res.redirect("/");
	});
});

// put route for updated burger
router.put("/burgers/:id", function(req, res) {
	// update with req params id and call back with data based on model update method
	burger.updateOne(req.params.id, function(data) {
		// log data
		console.log(data);
		// send back success status
		res.sendStatus(200);
	});
});

// export the router
module.exports = router;