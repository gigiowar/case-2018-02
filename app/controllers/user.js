module.exports = function (app){

	var User = app.models.user;

	var controller = {};

	controller.listaUsers = function(req,res){
		var promise = User.find().exec()
			.then(
				function(users){
					res.json(users);
				},
				function(erro){
					console.error(erro);
					res.status(500).json(erro);
				}
			);
	};

	controller.obtemUser = function(req,res){
		var _id = req.params.id;
		User.findById(_id).exec()
		.then(
			function(user){
				if(!user) throw new Error("User não encontrado");
			},
			function(erro){
				console.log(erro);
				res.status(404).json(erro);
			}
		);
	};

	controller.removeUser = function(req,res){
		var _id = req.params.id;
		User.remove({"_id" : _id}).exec()
		.then(
			function(){
				res.status(204).end();
			},
			function(erro){
				return console.error(erro);
			}
		);
	};

	controller.salvaUser = function (req,res){
		var _id = req.body._id;
		var dados = { 
			"nome" : req.body.nome, 
			"email" : req.body.email
		};		
		if(_id){
			User.findByIdAndUpdate(_id, dados).exec()
			.then(
				function(user){
					res.json(user);
				},
				function(erro){
					console.error(erro);
					res.status(500).json(erro);
				}
			);
		}
		else{
			User.create(dados)
			.then(
				function(user){
					res.status(201).json(user);
				},
				function(erro){
					console.log(erro);
					res.status(500).json(erro);
				}
			)
		}
	};

	return controller;

};