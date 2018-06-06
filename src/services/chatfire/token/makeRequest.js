const fetch = require('../../../lib/fetch')
const qs = require('querystring')

module.exports = body => {
  return fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    body: qs.stringify(body),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
