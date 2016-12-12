
// Generate a number of mappoints
function generateMapPoints (centerpoint, distance, amount) {
  var mappoints = []
  for (var i = 0; i < amount; i++) {
    var randomedGeo = randomGeo(centerpoint, distance)
    mappoints.push(randomedGeo)
  }
  return mappoints
}

// Create random lat/long coordinates in a specified radius around a center point
function randomGeo (center, radius) {
  var y0 = center.latitude
  var x0 = center.longitude
  var rd = radius / 111300 // about 111300 meters in one degree

  var u = Math.random()
  var v = Math.random()

  var w = rd * Math.sqrt(u)
  var t = 2 * Math.PI * v
  var x = w * Math.cos(t)
  var y = w * Math.sin(t)

  // Adjust the x-coordinate for the shrinking of the east-west distances
  var xp = x / Math.cos(y0)

  var newlat = y + y0
  var newlon = xp + x0

  return {
    'latitude': newlat.toFixed(5),
    'longitude': newlon.toFixed(5),
    'distance': distance(center.latitude, center.longitude, newlat, newlon).toFixed(2)
  }
}

// Calc the distance between 2 coordinates as the crow flies
function distance (lat1, lon1, lat2, lon2) {
  var R = 6371000
  var a = 0.5 - Math.cos((lat2 - lat1) * Math.PI / 180) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos((lon2 - lon1) * Math.PI / 180)) / 2
  return R * 2 * Math.asin(Math.sqrt(a))
}

module.exports = generateMapPoints
