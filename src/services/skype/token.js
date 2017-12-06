const fetch = require('../../lib/fetch')
const qs = require('querystring')

const CACHE = {}
const url = 'https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token'

function getCache(appId) {
  var { token, expireAt } = CACHE[appId] || {}
  return expireAt >= Date.now() && token
}

function setCache(appId, token, expiresIn) {
  CACHE[appId] = {
    token,
    expireAt: Date.now() + expiresIn,
  }
}

module.exports = ({ appId,  appPassword }) => {
  var cached = getCache(appId)
  if (cached) return Promise.resolve(cached)

  const querystring = {
    grant_type: 'client_credentials',
    client_id: appId,
    client_secret: appPassword,
    scope: 'https://graph.microsoft.com/.default',
  }

  return fetch(url, {
      body: qs.stringify(querystring),
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(({ access_token, expires_in }) => {
      setCache(appId, access_token, expires_in * 10)

      return access_token
    })
}
