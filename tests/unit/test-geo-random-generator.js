import test from 'ava'
import jakarta from '../fixture/jakarta-lat-long.js'
import {isLessThanEqualTo} from '../helper/test-operations.js'
import generateMapPoints from '../../lib/geo-random-generator'

test('Testing generate random map points within radius: generateMapPoints()', t => {
  t.plan(1)

  const amount = 10
  const radius = parseFloat(100)
  const generatedPoints = generateMapPoints(jakarta, radius, amount)

  t.is(generatedPoints.length, 10)

  generatedPoints.forEach(({distance}, index) => {
    isLessThanEqualTo(parseFloat(distance), radius)
  })
})
