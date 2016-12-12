import test from 'ava'
import request from 'supertest-as-promised'
import app from '../../src/application.js'

test('Testing API GET v1/drivers should fail without USER ID header', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/v1/drivers')

  t.is(res.status, 422)
  t.deepEqual(res.body.errors, ['USER ID: undefined is not valid'])
})

test('Testing API GET v1/drivers should fail with invalid USER ID header', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/v1/drivers')
    .set('USER_ID', '1a')

  t.is(res.status, 422)
  t.deepEqual(res.body.errors, ['USER ID: 1a is not valid'])
})

test('Testing API GET v1/drivers should fail without lat/long', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/v1/drivers')
    .set('USER_ID', '1')

  t.is(res.status, 400)
  t.deepEqual(res.body.errors, ['Latitude should be between +/- 90', 'Longitude should be between +/- 180'])
})

test('Testing API GET v1/drivers should fail without Latitude', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/v1/drivers?longitude=77.5946345')
    .set('USER_ID', '1')

  t.is(res.status, 400)
  t.deepEqual(res.body.errors, ['Latitude should be between +/- 90'])
})

test('Testing API GET v1/drivers should fail without Longitude', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/v1/drivers?latitude=77.5946345')
    .set('USER_ID', '1')

  t.is(res.status, 400)
  t.deepEqual(res.body.errors, ['Longitude should be between +/- 180'])
})

test('Testing API GET v1/drivers should success with Latitude, Longitude, and Radius', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/v1/drivers?longitude=77.5946345&latitude=77.5946345&radius=1')
    .set('USER_ID', '1')

  t.is(res.status, 200)
  t.deepEqual(res.body[0], {
    id: '1',
    distance: '0.0000',
    latitude: '77.59463578462600708',
    longitude: '77.59463435464449788'
  })
})

test('Testing API GET v1/drivers should success with Latitude, Longitude, Radius, and Limit', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/v1/drivers?longitude=77.5946345&latitude=77.5946345&radius=1&limit=1')
    .set('USER_ID', '1')

  t.is(res.status, 200)
  t.deepEqual(res.body[0], {
    id: '1',
    distance: '0.0000',
    latitude: '77.59463578462600708',
    longitude: '77.59463435464449788'
  })
})

test('Testing API GET v1/drivers should fail with invalid limit and radius', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/v1/drivers?longitude=77.5946345&latitude=77.5946341&limit=a&radius=b')
    .set('USER_ID', '1')

  t.is(res.status, 400)
  t.deepEqual(res.body.errors, ['Radius should be in number', 'Limit should be in number'])
})

test('Testing API GET v1/drivers should fail with negative limit and radius', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/v1/drivers?longitude=77.5946345&latitude=77.5946341&limit=-1&radius=-1')
    .set('USER_ID', '1')

  t.is(res.status, 400)
  t.deepEqual(res.body.errors, ['Radius should be minimum equal to zero', 'Limit should be more than zero'])
})

test('Testing API GET v1/drivers should fail with overflow limit and radius', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/v1/drivers?longitude=77.5946345&latitude=77.5946341&limit=9999999990&radius=9999999990')
    .set('USER_ID', '1')

  t.is(res.status, 400)
  t.deepEqual(res.body.errors, ['Radius is too big', 'Limit is too big'])
})
