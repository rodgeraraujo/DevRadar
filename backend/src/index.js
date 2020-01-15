const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

// create a .env file with your credentials
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-ionjp.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3333)