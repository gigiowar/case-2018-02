module.exports = function(app) {
 
    const drugs = require('../controllers/drug.js');
 
    // Create a new Medicine
    app.post('/api/drugs', drugs.create);
 
    // Retrieve all Medicine
    app.get('/api/drugs', drugs.findAll);
 
    // Retrieve a single Medicine by Id
    app.get('/api/drugs/:userId', drugs.findById);
 
    // Update a Medicine with Id
    app.put('/api/drugs/:userId', drugs.update);
 
    // Delete a Medicine with Id
    app.delete('/api/drugs/:userId', drugs.delete);
}