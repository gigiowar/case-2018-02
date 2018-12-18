var mysql = require('mysql');
    port = process.env.PORT || 8080;

if (port === 8080) {

    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Gigio647633',
        database: 'medical_prescription',
        insecureAuth: true
    });
}

connection.connect();

module.exports = connection;