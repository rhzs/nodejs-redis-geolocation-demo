import test from 'ava'
import request from 'supertest-as-promised'
import app from '../../src/application.js'
import generateMapPoints from '../../lib/geo-random-generator'
import jakarta from '../fixture/jakarta-lat-long.js'

import redis from '../../src/config/initializer/redis.js'

let seed = []

test.before(t => {
  const amount = 50000
  const radius = parseFloat(1000) // in meter
  const generatedPoints = generateMapPoints(jakarta, radius, amount)

  seed = generatedPoints
})

test.before(async t => {
  await redis.flushallAsync()
})

test.before(async t => {
  await Promise.all(seed.map(async ({longitude, latitude}, index) => {
    await redis.geoaddAsync('geo:locations', longitude, latitude, index + 1)
  }))
})

test('Testing API GET v1/drivers should success with simultaneous request', async t => {
  const concurrencyLevel = 20

  const driversApiResponse = (userID, longitude, latitude, radius, limit) => {
    return request(app)
      .get(`/api/v1/drivers?longitude=${longitude}&latitude=${latitude}&radius=${radius}&limit=${limit}`)
      .set('USER_ID', userID)
  }

  // get nearest user
  for (let i = 0; i <= 50;) {
    const concurrentRequests = []
    for (let j = 0; j <= concurrencyLevel; j++, i++) {
      if (!seed[i]) {
        j += concurrencyLevel // force break this inner loop
      } else {
        const {latitude, longitude} = seed[i]
        concurrentRequests.push(await driversApiResponse(i, longitude, latitude, 500, 50))
      }
    }
    Promise.all(concurrentRequests)
      .catch(() => {
        t.is(1, 2)
      })
  }
})

// Clean up
test.after(async t => {
  await redis.flushallAsync()
})
