module.exports = (sequelize, Sequelize) => {
	const MedicineDrug = sequelize.define('medicine_drug', {
	  idMedicine: {
			type: Sequelize.INTEGER
	  },
	  idDrug: {
		  type: Sequelize.INTEGER
	  }
	});
	
	return MedicineDrug;
}