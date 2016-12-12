const express = require('express')
const router = express.Router()

const {
  isValidLatitude,
  isValidLongitude,
  MAX_INTEGER_VALUE_INPUT
} = require('../../utils')

// Redis list set name
const LSET_NAME = 'geo:locations'

module.exports = (redis) => {
  // !!!! Please README !!!!
  // User check via headers
  // Rheza's NOTE:
  //  Since this is not stated in the question, how to validate the user
  //  This is to replace the authentication token to validate driver identity
  //  This should be less overhead because we just verifiying if it is valid integer or not
  //  Each time the request gets new ID, it will be treated as new user
  router.get('/', (req, res, next) => {
    const strUserID = req.headers.user_id
    const userID = parseInt(strUserID)
    if (isNaN(userID) || !isFinite(strUserID) || userID > MAX_INTEGER_VALUE_INPUT) {
      return res.status(422).json({'errors': [`USER ID: ${strUserID} is not valid`]})
    }

    return next()
  })

  // Lat/Long check
  router.get('/', (req, res, next) => {
    const errors = []
    let {latitude, longitude} = req.query

    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)

    if (!isValidLatitude(latitude)) {
      errors.push('Latitude should be between +/- 90')
    }

    if (!isValidLongitude(longitude)) {
      errors.push('Longitude should be between +/- 180')
    }

    if (errors.length) {
      return res.status(400).json({ errors })
    }

    return next()
  })

  // We make this a function instead of middleware, to set the default value for Radius and Limit if not found
  function validateRadiusAndLimit ({radius, limit}) {
    // Starting from this line and below lines are additional validations AND NOT required in the question
    // However, I have added them as part of checking
    const errors = []

    radius = radius || 500

    const intRadius = parseInt(radius, 10)
    if (isNaN(intRadius)) {
      errors.push('Radius should be in number')
    } else if (intRadius > MAX_INTEGER_VALUE_INPUT) {
      errors.push('Radius is too big')
    } else if (intRadius <= 0) {
      errors.push('Radius should be minimum equal to zero')
    }

    limit = limit || 10

    const intLimit = parseInt(limit, 10)
    if (isNaN(intLimit)) {
      errors.push('Limit should be in number')
    } else if (intLimit > MAX_INTEGER_VALUE_INPUT) {
      errors.push('Limit is too big')
    } else if (intLimit < 0) {
      errors.push('Limit should be more than zero')
    }

    return {radius, limit, errors}
  }

  function handleRedisError (res, err) {
    console.error(err)
    res.status(500).send('Something went wrong')
  }

  function getRadiusByMemberResponse (res, userID, radius, limit) {
    redis.georadiusbymemberAsync(LSET_NAME, userID, radius, 'm', 'WITHCOORD', 'WITHDIST', 'COUNT', limit)
      .then((replies) => {
        const driverLocationResponse = replies.map((reply) => {
          const [id, distance, [latitude, longitude]] = reply
          return { id, distance, latitude, longitude }
        })

        res.status(200).json(driverLocationResponse)
      })
      .catch((err) => { handleRedisError(res, err) })
  }

  router.get('/', (req, res) => {
    const userID = parseInt(req.headers.user_id)
    const {latitude, longitude} = req.query

    const {radius, limit, errors} = validateRadiusAndLimit(req.query)
    if (errors.length) {
      res.status(400).json({ errors })
      return
    }

    redis.geoaddAsync(LSET_NAME, longitude, latitude, userID)
      .then(() => { getRadiusByMemberResponse(res, userID, radius, limit) })
      .catch((err) => { handleRedisError(res, err) })
  })

  return router
}
