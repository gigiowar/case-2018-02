const db = require('../config/db.config.js');
const User = db.users;
const UserMedicine = db.userMedicines;
const Medicine = db.medicines;
const Drug = db.drugs;

function getUserMedicines(idUser) {
  	UserMedicine.find({
	  	where: {
	    	idUser: idUser
	  	}
		}).then(user => {
  	return user.get();
	});
}

function getMedicineDrugs(idMedicine) {

	let drugList = {};

	Drug.findAll({
	  where: {
	    medicineId: idMedicine
	  }
	}).then(drugs => {

		drugList = drugs;

	});

	return drugList;

}

function verifyMedicineDrugs(reqObj ,resObj) {

	let idUser = reqObj.idUser;
	let idMedicine = reqObj.idMedicine;

	UserMedicine.findAll({
	  	where: {
	    	idUser: idUser
	  	}
		}).then(data => {

		r = data.toJSON;

		console.log('REREREREER', r)
	});

}	

// Post a User
exports.create = (req, res) => {	
	// Save to MySQL database
	User.create({  
	  firstname: req.body.firstname,
	  lastname: req.body.lastname,
	  age: req.body.age
	}).then(user => {		
		// Send created user to client
		res.send(user);
	});
};

// Add a Medicine
exports.addMedicine = (req, res) => {

	verifyMedicineDrugs(req.body, res);

	// Save to MySQL database
	UserMedicine.create({  
	  idUser: req.body.idUser,
	  idMedicine: req.body.idMedicine
	}).then(userMedicine => {	

		// console.log('teste2',userMedicine);

		// Send created medicine to client
		res.send(userMedicine);
	});
};
 
// FETCH all Users
exports.findAll = (req, res) => {
	User.findAll().then(users => {
	  // Send all users to Client
	  res.send(users);
	});
};

// Find a User by Id
exports.findById = (req, res) => {	
	User.findById(req.params.userId).then(user => {
		res.send(user);
	})
};
 
// Update a User
exports.update = (req, res) => {
	const id = req.params.userId;
	User.update( { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age }, 
					 { where: {id: req.params.userId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a user with id = " + id);
				   });
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	const id = req.params.userId;
	User.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a user with id = ' + id);
	});
};