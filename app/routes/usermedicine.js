module.exports = function(app) {
 
    const userMedicines = require('../controllers/userMedicine.js');
 
    // Create a new User Medicines
    app.post('/api/userMedicines', userMedicines.create);
 
    // Retrieve all User Medicines
    app.get('/api/userMedicines', userMedicines.findAll);
 
    // Retrieve a single User Medicines by Id
    app.get('/api/userMedicines/:id', userMedicines.findById);
 
    // Update a User Medicines with Id
    app.put('/api/userMedicines/:id', userMedicines.update);
 
    // Delete a User Medicines with Id
    app.delete('/api/userMedicines/:id', userMedicines.delete);
}