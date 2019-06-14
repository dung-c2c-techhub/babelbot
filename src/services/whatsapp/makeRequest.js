const fetch = require('../../lib/fetch')
const qs = require('querystring')

const baseUrl = 'https://api.twilio.com'

module.exports = ({ accountSid, authToken }) => path => body => {
    const token = Buffer.from(`${accountSid}:${authToken}`).toString('base64')
    const url = baseUrl + '/2010-04-01/Accounts/' + accountSid
    console.log('body->>', body);
    return fetch(url + path, {
        body: qs.stringify(body),
        method: 'POST',
        headers: {
            Authorization: `Basic ${token}`,
            'Content-Type': 'text/xml',
        },
    })
}