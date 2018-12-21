module.exports = function(app) {
 
    const medicines = require('../controllers/medicine.js');
 
    // Create a new Medicine
    app.post('/api/medicines', medicines.create);

    // Create a new Medicine
    app.post('/api/users/addDrug', medicines.addDrug);      
 
    // Retrieve all Medicine
    app.get('/api/medicines', medicines.findAll);
 
    // Retrieve a single Medicine by Id
    app.get('/api/medicines/:userId', medicines.findById);
 
    // Update a Medicine with Id
    app.put('/api/medicines/:userId', medicines.update);
 
    // Delete a Medicine with Id
    app.delete('/api/medicines/:userId', medicines.delete);
}