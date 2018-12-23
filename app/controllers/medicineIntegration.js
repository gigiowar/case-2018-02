const db = require('../config/db.config.js');
const MedicineIntegration = db.medicineIntegrations;

// Post a MedicineIntegration
exports.create = (req, res) => {	
	// Save to MySQL database
	MedicineIntegration.create({
		idDrug1: req.body.idDrug1,
		idDrug2: req.body.idDrug2,
		name: req.body.name,
		description: req.body.description
	}).then(medicineIntegration => {		
		// Send created medicineIntegration to client
		res.send(medicineIntegration);
	});
};
 
// FETCH all MedicineIntegrations
exports.findAll = (req, res) => {
	MedicineIntegration.findAll().then(medicineIntegrations => {
	  // Send all medicineIntegrations to Client
	  res.send(medicineIntegrations);
	});
};

// Find a MedicineIntegration by Id
exports.findById = (req, res) => {	
	MedicineIntegration.findById(req.params.id).then(medicineIntegration => {
		res.send(medicineIntegration);
	})
};
 
// Update a MedicineIntegration
exports.update = (req, res) => {
	const id = req.params.id;
	MedicineIntegration.update( { 
		idDrug1: req.body.idDrug1,
		idDrug2: req.body.idDrug2,
		name: req.body.name,
		description: req.body.description
	}, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a medicineIntegration with id = " + id);
				   });
};
 
// Delete a MedicineIntegration by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	MedicineIntegration.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a medicineIntegration with id = ' + id);
	});
};