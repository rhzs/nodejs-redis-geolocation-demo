const assert = require('assert')

function isLessThanEqualTo (a, b) {
  const val = a <= b
  assert.ok(val)
}

module.exports = {
  isLessThanEqualTo
}
