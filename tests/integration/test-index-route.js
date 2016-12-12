import test from 'ava'
import request from 'supertest-as-promised'
import app from '../../src/application.js'

test('Testing route GET index', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/')

  t.is(res.status, 200)
  t.deepEqual(res.body, {})
})
