const env = require('./env.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op

//Models/tables
db.users = require('../models/user.js')(sequelize, Sequelize);
db.medicines = require('../models/medicine.js')(sequelize, Sequelize);
db.drugs = require('../models/drug.js')(sequelize, Sequelize);
db.userMedicines = require('../models/userMedicine.js')(sequelize, Sequelize);
db.medicineDrugs = require('../models/medicineDrug.js')(sequelize, Sequelize);
db.medicineIntegrations = require('../models/medicineIntegration.js')(sequelize, Sequelize);


module.exports = db;