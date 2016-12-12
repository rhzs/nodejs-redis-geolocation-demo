import test from 'ava'
import {isValidLatitude, isValidLongitude} from '../../src/utils'

test('Testing latitude validation: isValidLatitude()', t => {
  t.plan(7)

  let lat1 = isValidLatitude('77.5946345')
  let lat2 = isValidLatitude(91.123456)
  let lat3 = isValidLatitude(-91.123456)
  let lat4 = isValidLatitude(0.1234567)
  let lat5 = isValidLatitude(-0.1234567)
  let lat6 = isValidLatitude(89.1234567)
  let lat7 = isValidLatitude(-89.1234567)

  t.is(false, lat1)
  t.is(false, lat2)
  t.is(false, lat3)
  t.is(true, lat4)
  t.is(true, lat5)
  t.is(true, lat6)
  t.is(true, lat7)
})

test('Testing longitude validation: isValidLongitude()', t => {
  t.plan(7)

  let long1 = isValidLongitude('77.5946345')
  let long2 = isValidLongitude(181.123456)
  let long3 = isValidLongitude(-181.123456)
  let long4 = isValidLongitude(0.1234567)
  let long5 = isValidLongitude(-0.1234567)
  let long6 = isValidLongitude(89.1234567)
  let long7 = isValidLongitude(-89.1234567)

  t.is(false, long1)
  t.is(false, long2)
  t.is(false, long3)
  t.is(true, long4)
  t.is(true, long5)
  t.is(true, long6)
  t.is(true, long7)
})

