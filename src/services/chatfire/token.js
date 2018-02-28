const fetch = require('../../lib/fetch')
const qs = require('querystring')
const jwt = require('jsonwebtoken')

const CACHE = {}

function getCache(partnerUserId) {
  const token = CACHE[partnerUserId]
  if (!token) 
    return

  var { exp } = jwt.decode(token)
  if (exp && exp <= Date.now())
    return

  return token
}

function setCache(partnerUserId, token) {
  CACHE[partnerUserId] = token
}

module.exports = ({ token, authUrl, partnerUserId }) => {
  var cached = getCache(partnerUserId)
  if (cached) return Promise.resolve(cached)
  
  return fetch(authUrl + '?' + qs.stringify({ token }))
    .then(({ token }) => {
      setCache(partnerUserId, token)

      return token
    })
}
