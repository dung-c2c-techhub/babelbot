const fetch = require('../../lib/fetch')
const qs = require('querystring')
const baseUrl = 'https://api.mitto.ch'

module.exports = ({ API_key }) => path => ({ text, from , to }) => {
    
    let strike = { 
        "key": API_key, 
        "message": text,
        "from": from,
        "to": to
    }

    console.log('makeRequest', strike)
    console.log('stringify', JSON.stringify(strike),)
    console.log('path',path)
    console.log('urk', baseUrl + path)
    return fetch(baseUrl + path, {
        method: 'POST',
        body: JSON.stringify(strike),
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache'
    })
}

