const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

// DEVS Endpoint
routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

// SEARCH Endpoint
routes.get('/search', SearchController.index)

module.exports = routes