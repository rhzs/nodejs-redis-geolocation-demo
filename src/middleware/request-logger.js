const morgan = require('morgan')

morgan.token('id', ({id}) => id)

module.exports = morgan(':id :method :url :status :response-time ms - :res[content-length]')
