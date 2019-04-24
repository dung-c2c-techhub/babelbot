const fetch = require('../../lib/fetch')
const qs = require('querystring')
const baseUrl = 'https://api.mitto.ch'

module.exports = ({ API_key }) => path => ({ text, from , to }) => {
    
    let strike = qs.stringify({ 
        key: API_key, 
        message: text,
        from,
        to
    })

    console.log('makeRequest', strike)

    return fetch(baseUrl + path, {
        body: strike,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}