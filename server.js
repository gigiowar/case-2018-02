var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

db.sequelize.sync().then(() => {
  console.log('Sync force : false');
});

require('./app/routes/user.js')(app);
require('./app/routes/medicine.js')(app);
require('./app/routes/drug.js')(app);
require('./app/routes/userMedicine.js')(app);
require('./app/routes/medicineIntegration.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})