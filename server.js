// var http = require("http")
// var app = require("./config/express")()
// const bodyParser = require('body-parser')
// const { User } = require('./config/sequelize')

// require("./config/database.js");

// http.createServer(app).listen(app.get("port"),function(){
// 	console.log("Express Server on port" + app.get("port"));
// });

// const express = require('express')
// const bodyParser = require('body-parser')
// const { User } = require('./config/sequelize')

// const app = express()
// app.use(bodyParser.json())

// const port = 3000
// app.listen(port, () => {
//     console.log(`Running on http://localhost:${port}`)
// })

const express = require('express')
const bodyParser = require('body-parser')
const { User } = require('./config/sequelize')

const app = express()
app.use(bodyParser.json())

app.get('/api/users', (req, res) => {
    User.findAll().then(users => res.json(users))
})

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})