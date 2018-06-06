const fetch = require('../../lib/fetch')
const baseUrl = 'https://chatapi.viber.com/pa'

module.exports = ({ apiKey }) => path => body => {
  return fetch(baseUrl + apiKey + path, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Viber-Auth-Token': apiKey
    }
  })
}
