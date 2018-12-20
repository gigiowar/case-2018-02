const express = require('express')
const bodyParser = require('body-parser')
const { User } = require('./config/sequelize')

const app = express()
app.use(bodyParser.json())

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})