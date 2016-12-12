const Promise = require('bluebird')
const redis = require('./initializer/redis.js')

const config = (app) => {
  'use strict'

  return new Promise((resolve, reject) => {
    app.set('env', process.env.NODE_ENV || 'development')

    app.set('port', process.env.PORT || 3000)
    app.set('host', process.env.HOST || '0.0.0.0')

    resolve(redis)
  })
}

module.exports = config
