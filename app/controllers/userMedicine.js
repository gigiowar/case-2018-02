const db = require('../config/db.config.js');
const Op = db.Op;
const UserMedicine = db.userMedicines;
const Medicine = db.medicines;
const Drug = db.drugs;
const MedicineIntegration = db.medicineIntegrations;

exports.create = (req, res) => {	
	// teste(req.body);

	let idUser = req.body.idUser;
	let idMedicine = req.body.idMedicine;

	UserMedicine.findAll({raw: true, where: { idUser: idUser }})
	.then(data => {

		const obj = {};
		obj.idMedicine = idMedicine;
		data.push(obj);

		let response = false;
		let arrMed = [];

		for(let i = 0;i < data.length; i++){
			let objMedOp = {}; 
			objMedOp.medicineId = data[i].idMedicine;	
			arrMed.push(objMedOp);
		}

		// console.log('arrMed', arrMed);

		Drug.findAll({raw: true, where: { [Op.or]: arrMed}})
		.then(drugs => {

			let arrDrugs = [];
			let integrations = [];

			for(let i = 0;i < drugs.length; i++){	
				arrDrugs.push(drugs[i].id);
			}

			// console.log('arrDrugs', arrDrugs);

			for(let l = 0;l < arrDrugs.length; l++){

			   	let findIntegrations = function (relatedWarnings, arrDrugs, i = 1, l) 
			   	{        
			        const drug = arrDrugs[i];

			        // console.log('drug', drug);

			        if(!drug)
			            return Promise.resolve(relatedWarnings);

			        // console.log('arrDrugs[l]', arrDrugs[l]);
			        // console.log('arrDrugs[i]', arrDrugs[i]);			        

			        // return MedicineIntegration.findAll({raw: true, where: { idDrug1: arrDrugs[l], idDrug2: arrDrugs[i] }})
    				return MedicineIntegration.findAll({raw: true, 	
					where: {
						[Op.or]: [
						{[Op.and] : [
						  {idDrug1: arrDrugs[l]},
						  {idDrug2: arrDrugs[i]}
						]},
						{[Op.and] : [
						  {idDrug1: arrDrugs[i]},
						  {idDrug2: arrDrugs[l]}
						]}
						]
					}})
			        .then(function(newWarning){

			        	// console.log('newWarning', newWarning)

			            relatedWarnings.push(...newWarning);

			            if(i + 1 === arrDrugs.length){
			            	i = 1;
			            	l++;
			            }
			            if(l + 1 === arrDrugs.length){
			            	i = arrDrugs.length;
			            }
			            return findIntegrations(relatedWarnings, arrDrugs, ++i, l);
			        });    
			   	};

			   	return findIntegrations(integrations, arrDrugs, 1, l).then((relatedWarnings) => 
			   	{		  
			   	 	if(integrations.length > 0){
			   	 		res.send(integrations);	
			   	 	} else {
						// Save to MySQL database
						UserMedicine.create({  
						  idUser: idUser,
						  idMedicine: idMedicine
						}).then(userMedicine => {		
							// Send created drug to client
							res.send(false);
						});			   	 		
			   	 	}
		
			   		return integrations;

			   	});
			}



		});

	});
}	
 
// FETCH all UserMedicines
exports.findAll = (req, res) => {
	UserMedicine.findAll().then(userMedicines => {
	  // Send all userMedicines to Client
	  res.send(userMedicines);
	});
};

// Find a UserMedicine by Id
exports.findById = (req, res) => {	
	UserMedicine.findById(req.params.id).then(userMedicine => {
		res.send(userMedicine);
	})
};
 
// Update a UserMedicine
exports.update = (req, res) => {
	const id = req.params.id;
	UserMedicine.update( { idUser: req.body.idUser, idMedicine: req.body.idMedicine }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a userMedicine with id = " + id);
				   });
};
 
// Delete a UserMedicine by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	UserMedicine.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a userMedicine with id = ' + id);
	});
};