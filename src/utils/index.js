const DEG2RAD = Math.PI / 180

const MAX_LAT = Math.PI / 2 // 90 degrees
const MIN_LAT = -MAX_LAT // -90 degrees
const MAX_LON = Math.PI // 180 degrees
const MIN_LON = -MAX_LON // -180 degrees

function isNumber (value) {
  return toString.call(value) === '[object Number]' && value === +value
}

function isValidLatitude (latitude) {
  if (!isNumber(latitude)) {
    return false
  }

  latitude *= DEG2RAD

  if (latitude < MIN_LAT || latitude > MAX_LAT) {
    return false
  }

  return true
}

function isValidLongitude (longitude) {
  if (!isNumber(longitude)) {
    return false
  }

  longitude *= DEG2RAD

  if (longitude < MIN_LON || longitude > MAX_LON) {
    return false
  }

  return true
}

module.exports = {
  isNumber,
  isValidLatitude,
  isValidLongitude,
  MAX_INTEGER_VALUE_INPUT: 999999999
}
