var express = require("express");
var bodyParser = require('body-parser');


var PORT = process.env.PORT || 3000;
var app = express();
var path = require('path');
require('dotenv').config()
app.use(express.static("public"));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());



var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var router = require("./controllers/colosseum_controller.js");
app.use('/', router);
app.listen(PORT, function () {
	console.log("app listening on port " + PORT);
});

