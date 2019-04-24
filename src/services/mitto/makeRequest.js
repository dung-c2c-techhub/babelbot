const fetch = require('../../lib/fetch')
const qs = require('querystring')
const baseUrl = 'https://api.mitto.ch'

module.exports = ({ Username, API_key }) => path => body => {
    
    var body = qs.stringify({ key: API_key, message: text, from, to })
    console.log(body)
    
    return fetch(baseUrl + path, {
        body,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}