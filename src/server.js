const app = require('./application.js')
const logger = require('./utils/logger.js')
const port = app.get('port')

app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message)
  }

  logger.appStarted(port)
})
