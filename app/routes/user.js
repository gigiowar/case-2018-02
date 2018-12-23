module.exports = function(app) {
 
    const users = require('../controllers/user.js');
 
    // Create a new User
    app.post('/api/users', users.create);

    // Create a new Medicine
    app.post('/api/users/addMedicine', users.addMedicine);
 
    // Retrieve all User
    app.get('/api/users', users.findAll);
 
    // Retrieve a single User by Id
    app.get('/api/users/:id', users.findById);
 
    // Update a User with Id
    app.put('/api/users/:id', users.update);
 
    // Delete a User with Id
    app.delete('/api/users/:id', users.delete);
}