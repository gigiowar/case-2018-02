module.exports = function(app) {
 
    const drugs = require('../controllers/drug.js');
 
    // Create a new Drug
    app.post('/api/drugs', drugs.create);
 
    // Retrieve all Drug
    app.get('/api/drugs', drugs.findAll);
 
    // Retrieve a single Drug by Id
    app.get('/api/drugs/:userId', drugs.findById);
 
    // Update a Drug with Id
    app.put('/api/drugs/:userId', drugs.update);
 
    // Delete a Drug with Id
    app.delete('/api/drugs/:userId', drugs.delete);
}