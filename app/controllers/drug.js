const db = require('../config/db.config.js');
const Drug = db.drugs;

// Post a Drug
exports.create = (req, res) => {	
	// Save to MySQL database
	Drug.create({  
	  drugname: req.body.drugname,
	  medicineid: req.body.medicineid
	}).then(drug => {		
		// Send created drug to client
		res.send(drug);
	});
};
 
// FETCH all Drugs
exports.findAll = (req, res) => {
	Drug.findAll().then(drugs => {
	  // Send all drugs to Client
	  res.send(drugs);
	});
};

// Find a Drug by Id
exports.findById = (req, res) => {	
	Drug.findById(req.params.drugId).then(drug => {
		res.send(drug);
	})
};
 
// Update a Drug
exports.update = (req, res) => {
	const id = req.params.drugId;
	Drug.update( { drugname: req.body.drugname, medicineid: req.body.medicineid }, 
					 { where: {id: req.params.drugId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a drug with id = " + id);
				   });
};
 
// Delete a Drug by Id
exports.delete = (req, res) => {
	const id = req.params.drugId;
	Drug.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a drug with id = ' + id);
	});
};