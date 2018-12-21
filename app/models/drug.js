module.exports = (sequelize, Sequelize) => {
	const Drug = sequelize.define('drug', {
	  drugname: {
		type: Sequelize.STRING
	  },
	  medicineId: {
		  type: Sequelize.INTEGER
	  }	  
	});
	
	return Drug;
}