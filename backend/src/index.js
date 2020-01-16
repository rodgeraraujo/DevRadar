const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

// create a .env file with your credentials
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-ionjp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)