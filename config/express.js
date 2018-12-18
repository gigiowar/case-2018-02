//Express config file
var express = require("express");
var bodyParser = require('body-parser'); 

module.exports = function(){

	var app = express();

	var load = require("express-load");

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	//Set express port
	app.set("port",8080);

	load("models",{cwd: "app"})
		.then("controllers")
		.then("routes")
		.into(app)

	return app;
};
