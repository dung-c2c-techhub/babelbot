const fetch = require('../../lib/fetch')
const baseUrl = 'https://api.telegram.org/bot'

module.exports = ({ token }) => path => body => {
    return fetch(baseUrl + token + path, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}