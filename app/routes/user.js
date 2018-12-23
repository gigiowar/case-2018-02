module.exports = function(app) {
 
    const users = require('../controllers/user.js');
 
    // Create a new User
    app.post('/api/users', users.create);
 
    // Retrieve all Users
    app.get('/api/users', users.findAll);
 
    // Retrieve a single User by Id
    app.get('/api/users/:id', users.findById);
 
    // Update a User with Id
    app.put('/api/users/:id', users.update);
 
    // Delete a User with Id
    app.delete('/api/users/:id', users.delete);
}