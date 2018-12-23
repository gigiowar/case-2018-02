const db = require('../config/db.config.js');
const Medicine = db.medicines;

// Post a Medicine
exports.create = (req, res) => {

	console.log(req.body)

	// Save to MySQL database
	Medicine.create({  
	  medname: req.body.medname
	}).then(medicine => {		
		// Send created medicine to client
		res.send(medicine);
	});
};

// Add a Medicine
exports.addDrug = (req, res) => {	

	console.log(req.body)

	// Save to MySQL database
	MedicineDrug.create({  
	  idUser: req.body.idUser,
	  idMedicine: req.body.idMedicine
	}).then(medicineDrug => {		
		// Send created medicine to client
		res.send(medicineDrug);
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
	Medicine.findById(req.params.id).then(medicine => {
		res.send(medicine);
	})
};
 
// Update a Medicine
exports.update = (req, res) => {
	const id = req.params.id;
	Medicine.update( { medname: req.body.medname }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a medicine with id = " + id);
				   });
};
 
// Delete a Medicine by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Medicine.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a medicine with id = ' + id);
	});
};