const fetch = require('../../lib/fetch')
const qs = require('querystring')
const baseUrl = 'https://api.mitto.ch'

module.exports = ({ pageAccessToken }) => path => body => {
    var querystring = '?' + qs.stringify({ access_token: pageAccessToken })

    return fetch(baseUrl + path + querystring, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}