var db = require("../../config/database.js");

function teste(){
	return 'testessss';
}

return {
	teste: teste
}

// module.exports = function (app){

// 	var model = {};

// 	model.teste = function (req, res) {

// 		var apiResult;

// 		console.log('modelo4');

// 		var results = db.query('SELECT * from medicamentos', function (error, results, fields) {

// 			if (error) {

// 				var apiResult = {};

// 				apiResult.meta = {
// 					table: section,
// 					type: "collection",
// 					total: 0
// 				}

// 				apiResult.data = [];

// 				res.status(500).json(apiResult);

// 			}

// 			var resultJson = JSON.stringify(results);
// 			resultJson = JSON.parse(resultJson);
// 			var apiResult = {};
// 			apiResult.data = resultJson;

// 			retorno = apiResult;
// 			// res.json(apiResult);

// 		});

// 	}

// 	return model;

// };