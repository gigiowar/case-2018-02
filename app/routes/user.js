module.exports = function (app){

	var controller = app.controllers.user;

	app.route("/users")
		.get(controller.listaUsers)
		.post(controller.salvaUser);

	app.route("/users/:id")
		.get(controller.obtemUser)
		.delete(controller.removeUser);

};