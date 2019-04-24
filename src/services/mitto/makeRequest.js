const fetch = require('../../lib/fetch')
const qs = require('querystring')
const baseUrl = 'https://api.mitto.ch'

module.exports = (event) => path => body => {
    console.log('makeRequest', event)
    var body = qs.stringify({ key: API_key, message: text, from, to })
    console.log('makeRequest', body)
    
    return fetch(baseUrl + path, {
        body,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}