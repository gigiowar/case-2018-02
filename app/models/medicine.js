module.exports = (sequelize, Sequelize) => {
	const Medicine = sequelize.define('medicine', {
	  medname: {
		type: Sequelize.STRING
	  }
	});
	
	return Medicine;
}