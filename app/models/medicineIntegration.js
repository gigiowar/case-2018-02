module.exports = (sequelize, Sequelize) => {
	const MedicineIntegration = sequelize.define('medicine_integration', {
	  idDrug1: {
		type: Sequelize.INTEGER
	  },
	  idDrug2: {
		type: Sequelize.INTEGER
	  },
	  name : {
	  	type: Sequelize.STRING 
	  },
	  description : {
	  	type: Sequelize.TEXT
	  }	  
	});
	
	return MedicineIntegration;
}