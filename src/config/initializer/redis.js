const redis = require('redis')

// Promisify all redis functions
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

// TODO: Add other redis options, not required in the question,
// but basically we can more options as documented in
// https://github.com/NodeRedis/node_redis#rediscreateclient
const client = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || '6379'
})

client.on('error', (err) => {
  console.error(`Couldn't connect to redis ${err}`)
})

module.exports = client
