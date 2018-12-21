module.exports = (sequelize, Sequelize) => {
	const UserMedicine = sequelize.define('user_medicine', {
	  idUser: {
			type: Sequelize.INTEGER
	  },
	  idMedicine: {
		  type: Sequelize.INTEGER
	  }
	});
	
	return UserMedicine;
}