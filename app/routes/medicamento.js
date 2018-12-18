module.exports = function (app){

	var controller = app.controllers.medicamento;

	app.route("/medicamentos")
		.get(controller.listaMedicamentos)
		.post(controller.adicionaMedicamento);

	// app.route("/medicamentos/:id")
	// 	.get(controller.obtemUser)
	// 	.delete(controller.removeUser);

};