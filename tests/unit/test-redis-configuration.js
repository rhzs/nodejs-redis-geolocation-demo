import test from 'ava'
import redis from '../../src/config/initializer/redis.js'

test('Testing redis configuration: redis', t => {
  t.plan(1)

  t.is(redis.address, '127.0.0.1:6379')
})
