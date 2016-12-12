const express = require('express')
const router = express.Router()

module.exports = (redis) => {
  router.use('/drivers', require('./drivers')(redis))

  return router
}
