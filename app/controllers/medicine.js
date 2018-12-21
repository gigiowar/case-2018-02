const db = require('../config/db.config.js');
const Medicine = db.medicines;

// Post a Medicine
exports.create = (req, res) => {	
	// Save to MySQL database
	Medicine.create({  
	  medname: req.body.medname
	}).then(medicine => {		
		// Send created medicine to client
		res.send(medicine);
	});
};
 
// FETCH all Medicines
exports.findAll = (req, res) => {
	Medicine.findAll().then(medicines => {
	  // Send all medicines to Client
	  res.send(medicines);
	});
};

// Find a Medicine by Id
exports.findById = (req, res) => {	
	Medicine.findById(req.params.medicineId).then(medicine => {
		res.send(medicine);
	})
};
 
// Update a Medicine
exports.update = (req, res) => {
	const id = req.params.medicineId;
	Medicine.update( { medname: req.body.medname }, 
					 { where: {id: req.params.medicineId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a medicine with id = " + id);
				   });
};
 
// Delete a Medicine by Id
exports.delete = (req, res) => {
	const id = req.params.medicineId;
	Medicine.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a medicine with id = ' + id);
	});
};