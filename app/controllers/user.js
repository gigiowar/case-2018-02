module.exports = function (app){

	var User = app.models.user;

	var controller = {};

	controller.teste = function (req, res) {

		User.findAll().then(users => res.json(users))
	
	}

    return controller;

};