const db = require('../config/db.config.js');
const Op = db.Op;
const User = db.users;
const UserMedicine = db.userMedicines;
const Medicine = db.medicines;
const Drug = db.drugs;
const MedicineIntegration = db.medicineIntegrations;

function teste(reqObj) {

	// let idUser = reqObj.idUser;
 //    var members = req.body.members;
 //    models.sequelize.transaction(function (t) {
 //        var promises = []
 //        for (var i = 0; i < members.length; i++) {
 //            var newPromise = models.User.create({'firstname':members[i], 'email':members[i], 'pending':true}, {transaction: t});
 //           promises.push(newPromise);
 //        };
 //        return Promise.all(promises).then(function(users) {
 //            var userPromises = [];
 //            for (var i = 0; i < users.length; i++) {
 //                userPromises.push(users[i].addInvitations([group], {transaction: t});
 //            }
 //            return Promise.all(userPromises);
 //        });
 //    }).then(function (result) {
 //        console.log("YAY");
 //    }).catch(function (err) {
 //        console.log("NO!!!");
 //        return next(err);
 //    });

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

	// teste(req.body);

	let idUser = req.body.idUser;
	let idMedicine = req.body.idMedicine;

	UserMedicine.findAll({raw: true, where: { idUser: idUser }})
	.then(data => {

		let arrMed = [];

		for(let i = 0;i < data.length; i++){
			let objMedOp = {}; 
			objMedOp.medicineId = data[i].idMedicine;	
			arrMed.push(objMedOp);
		}

		let arrDrugs = [];

		Drug.findAll({raw: true, where: { [Op.or]: arrMed}})
		.then(data => {

			for(let i = 0;i < data.length; i++){
				arrDrugs.push(data[i].id);	
			}

			console.log("arrDrugs", arrDrugs);
			
			let arrMedIntegrations = [];

			for(let j = 1;j < arrDrugs.length; j++){

				let i = j - 1;
				console.log('i',i);
				console.log('j',j);							

				MedicineIntegration.findAll({raw: true, where: { idDrug1: arrDrugs[i], idDrug2: arrDrugs[j] }})
				.then(data => {

					res.send(data);


				})

			}		


		});


	});

	// Save to MySQL database
	// UserMedicine.create({  
	//   idUser: req.body.idUser,
	//   idMedicine: req.body.idMedicine
	// }).then(userMedicine => {	

	// 	// console.log('teste2',userMedicine);

	// 	// Send created medicine to client
	// 	res.send(userMedicine);
	// res.send(true);
	// });
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
	User.findById(req.params.id).then(user => {
		res.send(user);
	})
};
 
// Update a User
exports.update = (req, res) => {
	const id = req.params.id;
	User.update( { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age }, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a user with id = " + id);
				   });
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	User.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a user with id = ' + id);
	});
};