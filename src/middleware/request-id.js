const uuid = require('uuid')

function assignId (req, res, next) {
  // We split the first sequence to shorten the id, this should be ok for demo purposes
  req.id = uuid.v4().split('-')[0]
  next()
}

module.exports = assignId
