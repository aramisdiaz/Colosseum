// dependencies
var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
require('dotenv').config()

// define port and define app as express server
var PORT = process.env.PORT || 3380;
var app = express();

// use public directory to serve css/js/images
app.use(express.static("public"));
// body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));

// require handlebars, set up app to use handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require routes
var routes = require("./controllers/burgers_controller.js");

// use the routes
app.use(routes);

// start the server
app.listen(PORT, function() {
	console.log("app listening on port " + PORT);
});