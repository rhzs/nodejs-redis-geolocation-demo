const express = require('express')
const router = express.Router()

module.exports = (redis) => {
  const apiRouterForV1 = router.use('/v1', require('./v1')(redis))
  router.use('/api', apiRouterForV1)

  return router
}
