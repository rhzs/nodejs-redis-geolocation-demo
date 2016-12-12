// Must be at the top as priority pass to load all environment variables
require('dotenv').config({silent: true})

const express = require('express')
const app = express()
const requestId = require('./middleware/request-id.js')
const logger = require('./middleware/request-logger.js')

// Synchronous config (like databases) initialization
require('./config')(app)
  .then((redis) => {
    app.use(requestId)
    app.use(logger)

    app.get('/', (req, res) => {
      res.send('Hello, I am Rheza.\nPlease access `api` routes to see the results')
    })

    // I pass redis here, to avoid global variable.
    // Instead, I encourage shared variable between modules/files
    const api = require('./api')(redis)
    app.use(api)
  })
  .catch((err) => {
    console.error(`Please check your app ${err}`)
  })

module.exports = app
