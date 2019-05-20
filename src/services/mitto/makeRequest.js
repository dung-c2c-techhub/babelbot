const fetch = require('../../lib/fetch')
const qs = require('querystring')
const baseUrl = 'https://api.mitto.ch'

module.exports = (config) => path => (event) => {

    console.log('event ---------',event )
    console.log('config ---------',config )
    const { API_key } = config
    const { text, from , to } = event
    let strike = { 
        "key": API_key, 
        "message": text,
        "from": from,
        "to": to
    }
console.log('-------strike---------',strike)
    return fetch(baseUrl + path, {
        method: 'POST',
        body: JSON.stringify(strike),
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache'
    })
}

