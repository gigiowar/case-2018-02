const env = {
  database: 'medical_prescription',
  username: 'root',
  password: 'Gigio647633',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};

module.exports = env;