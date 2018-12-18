//Remover essa linha quando houver o Sequelize
var db = require("../../config/database.js");

module.exports = function (app){

	var Medicamento = app.models.medicamento;

	var controller = {};

	controller.listaMedicamentos = function (req, res) {

        var pathname = req._parsedUrl.pathname.split('/');

        var section = pathname[1];

        var results = db.query('SELECT * from ??', [section], function (error, results, fields) {

            if (error) {

                var apiResult = {};
                
                apiResult.meta = {
                    table: section,
                    type: "collection",
                    total: 0
                }

                apiResult.data = [];
                
                res.status(500).json(apiResult);
                
            }
            
            var resultJson = JSON.stringify(results);
            resultJson = JSON.parse(resultJson);
            var apiResult = {};
            apiResult.data = resultJson;

            res.json(apiResult);
        });
    }

	var getInteracaoMedicamentosa = function(data, callback){

	      var sql = "SELECT * FROM interacao_medicamentosa WHERE (id_farmaco1 = 1 AND id_farmaco2 = 2)";

	      db.query(sql, function(err, results){
	            if (err){ 
	              throw err;
	            }

	            return callback(results);
	    });
	}

	var getFarmaco = function(data, callback){

	      var sql = "SELECT * FROM farmacos WHERE id_medicamento = "+ data +" ";

	      db.query(sql, function(err, results){
	            if (err){ 
	              throw err;
	            }

	            return callback(results);
	    });
	}

    controller.adicionaMedicamento = function (req,res){

    	var id_medicamento = req.body.id_medicamento

    	//TODO criar a estrutura no banco de dados
    	var userMedicamentos = {
    		"id": 1,
    		"medicamentos": [1]
    	}

    	userMedicamentos.medicamentos.forEach(function(medicamento){

			getFarmaco(id_medicamento, function(result){
				// Pequeno callback hell, vai ser evitado quando usarmos o sequelize
				result.forEach(function(re){
					getInteracaoMedicamentosa(result, function(result){
						res.json(result);
					});
				})
				
		 	}); 

    	});

	};

	return controller;

};