module.exports = function(app) {
 
    const medicineIntegrations = require('../controllers/medicineIntegration.js');
 
    // Create a new User Medicines
    app.post('/api/medicineIntegrations', medicineIntegrations.create);
 
    // Retrieve all User Medicines
    app.get('/api/medicineIntegrations', medicineIntegrations.findAll);
 
    // Retrieve a single User Medicines by Id
    app.get('/api/medicineIntegrations/:id', medicineIntegrations.findById);
 
    // Update a User Medicines with Id
    app.put('/api/medicineIntegrations/:id', medicineIntegrations.update);
 
    // Delete a User Medicines with Id
    app.delete('/api/medicineIntegrations/:id', medicineIntegrations.delete);
}