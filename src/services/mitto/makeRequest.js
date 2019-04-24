const fetch = require('../../lib/fetch')
const qs = require('querystring')
const baseUrl = 'https://api.mitto.ch'

module.exports = ({ API_key }) => path => ({ text, from , to }) => {
    
    let strike = { 
        key: API_key, 
        message: text,
        from: parseInt(from),
        to:parseInt(to)
    }
    console.log('makeRequest', strike)
    console.log('path',path)
    console.log('urk', baseUrl + path)
    return fetch(baseUrl + path, {
        body: strike,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}