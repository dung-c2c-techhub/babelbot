const fetch = require('../../lib/fetch')
const qs = require('querystring')
const jwt = require('jsonwebtoken')

const CACHE = {}

function getCache(partnerUserId) {
  const token = CACHE[partnerUserId]
  if (!token) 
    return

  var { exp } = jwt.decode(token, { complete: true })
  if (exp && exp <= Date.now())
    return

  return token
}

function setCache(partnerUserId, token) {
  CACHE[partnerUserId] = token
}

module.exports = ({ privateKey, authUrl, partnerUserId, partnerName }) => {
  var cached = getCache(partnerUserId)
  if (cached) return Promise.resolve(cached)

  var token = jwt.sign({ partnerUserId }, privateKey, { issuer: partnerName })
  
  return fetch(authUrl + '?' + qs.stringify({ token }))
    .then(({ token }) => {
      setCache(partnerUserId, token)

      return token
    })
}
